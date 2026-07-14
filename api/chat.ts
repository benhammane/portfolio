/**
 * Fonction serverless Vercel (déployée automatiquement depuis /api).
 * Ne fonctionne PAS avec `npm run dev` (Vite) — il faut `vercel dev` en local,
 * ou tester directement sur le déploiement Vercel une fois OPENROUTER_API_KEY configurée.
 */

// Contexte factuel injecté dans le prompt système pour éviter que le modèle invente des infos.
const PROFILE_CONTEXT = `
Profil : Amine Benhammane, étudiant en Master 1 Informatique (MIAGE), recherche une alternance en développement.
Stack : React, TypeScript, Tailwind CSS, Node.js, Laravel, Python, MySQL, Figma, Git.
Projets clés : plateforme e-commerce (Laravel), système d'enchères en temps réel (Node.js + WebSocket/socket.io),
Bubbleti (système de commande pour salon de bubble tea), site de partage de recettes, plusieurs jeux (Java, App Inventor 2).
Activité freelance : fondateur de WebLocal, agence de création de sites web (https://adamine.vercel.app).
Centres d'intérêt : voyages, sport, musique, montage vidéo.
Contact : formulaire sur la page (section Contact), email visible dans le portfolio, GitHub et LinkedIn liés en pied de page.
`.trim();

const SYSTEM_PROMPT = `Tu es l'assistant IA du portfolio d'Amine Benhammane. Tu réponds aux visiteurs (recruteurs, clients potentiels) de façon professionnelle, concise et chaleureuse, en français par défaut (bascule en anglais si on te parle anglais).

Règles :
- Appuie-toi UNIQUEMENT sur les informations ci-dessous. Si une question sort de ce périmètre (vie privée, sujets hors portfolio), réponds poliment que tu n'as pas cette information et invite à utiliser le formulaire de contact.
- Ne prétends jamais être Amine lui-même : tu es son assistant.
- Reste bref (3-5 phrases maximum sauf si on te demande un développement).
- Si on te demande comment contacter Amine, oriente vers la section Contact du portfolio.

Informations disponibles :
${PROFILE_CONTEXT}`;

interface ChatRequestBody {
  message?: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENROUTER_API_KEY manquante côté serveur (variable d'environnement Vercel)." });
  }

  try {
    const { message, history = [] }: ChatRequestBody = req.body ?? {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message manquant' });
    }
    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message trop long (max 1000 caractères)' });
    }

    // Historique limité aux 10 derniers échanges pour rester léger.
    const trimmedHistory = history.slice(-10).filter((m) => m?.role && m?.content);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct', // modèle gratuit sur OpenRouter
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...trimmedHistory,
          { role: 'user', content: message },
        ],
        max_tokens: 400,
        temperature: 0.6,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter error:', data);
      return res.status(502).json({ error: 'Erreur du fournisseur IA (OpenRouter)' });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ error: 'Réponse vide du modèle' });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(500).json({ error: 'Erreur serveur inattendue' });
  }
}
