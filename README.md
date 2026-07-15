# Portfolio — Amine Benhammane

Portfolio personnel d'Amine Benhammane, développeur full-stack (M2 MIAGE, Université de Lille) et fondateur de l'agence [WebLocal](https://adamine.vercel.app).

**Production** : https://benhammaneamine.vercel.app

## Stack technique

- **React 18** + **TypeScript**
- **Vite** + **vite-react-ssg** (génération statique — build vers `docs/`)
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **Framer Motion** pour les animations
- **React Three Fiber** / **Spline** pour le robot 3D interactif (chargé en lazy, désactivé si `prefers-reduced-motion` ou mobile)
- **EmailJS** pour le formulaire de contact
- **Google Analytics 4** (désactivé en dev)
- Assistant IA (chatbot) branché sur l'API OpenRouter via une fonction serverless Vercel (`api/chat.ts`)

## Fonctionnalités

- Site bilingue FR/EN (`src/lib/LocaleProvider.tsx`)
- Thème clair/sombre avec persistance et anti-FOUC
- Blog intégré avec génération de pages statiques par article (SEO) et JSON-LD
- Section projets, expériences, parcours et une section dédiée à l'agence WebLocal

## Développement local

Prérequis : Node.js + npm.

```sh
git clone <url-du-repo>
cd portfolio
npm install
npm run dev
```

## Scripts

| Commande              | Description                                      |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`           | Serveur de développement (Vite)                   |
| `npm run build`         | Build statique de production (sort dans `docs/`)  |
| `npm run preview`       | Prévisualise le build de production                |
| `npm run lint`          | Lint ESLint                                        |

## Variables d'environnement

Voir `.env.example` pour la liste complète (EmailJS, Google Analytics, OpenRouter pour l'assistant IA).
