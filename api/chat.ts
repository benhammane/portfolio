import OpenAI from "openai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1) Vérif clé
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return res.status(500).json({ error: "OPENAI_API_KEY manquante" });
    }

    // 2) Vérif message
    const { message } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message manquant" });
    }

    // 3) Client OpenAI (créé ici pour éviter certains soucis)
    const client = new OpenAI({ apiKey: key });

    console.log("Calling OpenAI…", { length: message.length });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es le chatbot du portfolio d’un étudiant en M1 MIAGE passionné par le développement. Réponds de façon pro, courte et utile.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(500).json({ error: "Réponse vide du modèle" });
    }

    return res.status(200).json({ reply });
  } catch (err: any) {
    // Erreur OpenAI lisible
    console.error("API ERROR:", err?.status, err?.message, err);

    return res.status(500).json({
      error:
        err?.message ||
        "Erreur serveur (voir logs vercel dev)",
      status: err?.status || 500,
    });
  }
}