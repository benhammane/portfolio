export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string };

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readMinutes: number;
  tags: string[];
  gradient: string; // classes tailwind pour la couverture
  content: Block[];
}

export const posts: Post[] = [
  {
    slug: 'jeu-video-java-lecons',
    title: "J'ai développé un jeu vidéo en Java : 5 leçons de dev",
    description:
      "Retour d'expérience sur la conception d'un shoot-em-up en Java : architecture, boucle de jeu, gestion des collisions et ce que ça m'a appris en tant que développeur.",
    date: '2026-06-12',
    readMinutes: 6,
    tags: ['Java', 'Game Dev', "Retour d'expérience"],
    gradient: 'from-brand/30 via-brand-2/20 to-brand-3/30',
    content: [
      { type: 'p', text: "Développer un jeu vidéo est l'un des meilleurs exercices pour progresser en programmation. Sur un shoot-em-up (shmup) réalisé en Java, j'ai touché à presque tous les fondamentaux du développement logiciel. Voici les 5 leçons que j'en retiens." },
      { type: 'h', text: '1. La boucle de jeu structure tout' },
      { type: 'p', text: "Un jeu tourne autour d'une boucle : lire les entrées, mettre à jour l'état, dessiner. Séparer clairement ces trois étapes rend le code lisible et évite les bugs de synchronisation. Cette rigueur m'a resservi ensuite sur des applications web temps réel." },
      { type: 'h', text: '2. Penser en entités et en composants' },
      { type: 'p', text: "Joueur, ennemis, projectiles : tout devient une entité avec une position, une vitesse et un comportement. Cette approche m'a naturellement mené vers des architectures propres et réutilisables." },
      { type: 'h', text: '3. Les collisions apprennent la rigueur mathématique' },
      { type: 'list', items: ["Détection par rectangles englobants (AABB) pour la performance", "Gestion des cas limites (bords de l'écran, entités qui se chevauchent)", "Optimisation quand le nombre d'objets explose"] },
      { type: 'h', text: '4. La performance se pense tôt' },
      { type: 'p', text: "Avec des centaines de projectiles à l'écran, chaque milliseconde compte. J'ai appris à profiler, à éviter les allocations inutiles et à mesurer avant d'optimiser — un réflexe précieux sur tout projet." },
      { type: 'h', text: '5. Finir un projet, ça compte' },
      { type: 'quote', text: "Un projet terminé, même imparfait, vaut dix idées jamais livrées." },
      { type: 'p', text: "Livrer un jeu jouable, du menu à l'écran de game over, m'a appris à cadrer un périmètre et à aller au bout. C'est exactement l'état d'esprit que j'applique aujourd'hui aux projets clients." },
    ],
  },
  {
    slug: 'react-tailwind-projets-clients',
    title: 'React + Tailwind : le combo pour livrer vite et bien',
    description:
      "Pourquoi j'utilise React et Tailwind CSS pour construire les sites et applications de mes clients chez WebLocal : rapidité, cohérence visuelle et maintenabilité.",
    date: '2026-06-24',
    readMinutes: 5,
    tags: ['React', 'Tailwind CSS', 'Freelance'],
    gradient: 'from-brand-2/30 via-brand/20 to-brand-3/30',
    content: [
      { type: 'p', text: "Quand je conçois un site ou une application pour un client via WebLocal, mon objectif est simple : livrer un produit rapide, moderne et facile à faire évoluer. Pour ça, React + Tailwind CSS est devenu mon combo par défaut. Voici pourquoi." },
      { type: 'h', text: 'React : penser en composants' },
      { type: 'p', text: "Découper une interface en composants réutilisables accélère énormément le développement. Une carte, un bouton, un formulaire : je les construis une fois, je les réutilise partout, et le client obtient une interface cohérente sur tout le site." },
      { type: 'h', text: 'Tailwind : styliser sans quitter le HTML' },
      { type: 'list', items: ['Un design system cohérent via les tokens (couleurs, espacements, typographie)', 'Zéro fichier CSS à maintenir en parallèle', 'Un rendu responsive rapide à mettre en place', 'Des animations et effets modernes sans effort'] },
      { type: 'h', text: 'La vraie force : la vitesse de livraison' },
      { type: 'p', text: "Combinés, React et Tailwind me permettent de passer d'une maquette à un produit en ligne en un temps record — sans sacrifier la qualité ni la maintenabilité. C'est décisif quand un client a besoin d'être visible vite." },
      { type: 'quote', text: "Un bon outil n'est pas celui qui impressionne, mais celui qui vous fait livrer sereinement." },
      { type: 'p', text: "Ajoutez à cela TypeScript pour la fiabilité et Vercel pour un déploiement instantané, et vous obtenez une stack qui rend les clients — et le développeur — heureux." },
    ],
  },
  {
    slug: 'portfolio-anime-framer-motion',
    title: 'Créer un portfolio moderne et animé avec Framer Motion',
    description:
      "Les principes d'animation qui font passer un portfolio de « correct » à « waouh » : reveals au scroll, micro-interactions, transitions fluides à 60 FPS avec Framer Motion.",
    date: '2026-06-28',
    readMinutes: 7,
    tags: ['Framer Motion', 'UI/UX', 'React'],
    gradient: 'from-brand-3/30 via-brand-2/20 to-brand/30',
    content: [
      { type: 'p', text: "Un portfolio, c'est votre première impression. Les animations, bien dosées, font toute la différence entre un site oubliable et un site mémorable. Voici comment j'aborde l'animation avec Framer Motion." },
      { type: 'h', text: 'Les reveals au scroll' },
      { type: 'p', text: "Faire apparaître le contenu progressivement quand il entre dans l'écran crée un sentiment de fluidité et guide le regard. Avec `whileInView`, quelques lignes suffisent pour un fondu + glissement élégant." },
      { type: 'h', text: 'Les micro-interactions' },
      { type: 'list', items: ['Un léger agrandissement au survol des cartes', 'Un effet magnétique sur les boutons', 'Un retour visuel au clic (scale down)', 'Un curseur ou des éléments qui réagissent à la souris'] },
      { type: 'h', text: 'La règle d\'or : la sobriété' },
      { type: 'p', text: "Une animation réussie se remarque à peine — elle sert le contenu, elle ne le vole pas. Des durées courtes, des courbes d'accélération naturelles (easeOut) et de la cohérence entre les sections : c'est ce qui donne un rendu « premium »." },
      { type: 'h', text: 'La performance avant tout' },
      { type: 'p', text: "Animer `transform` et `opacity` plutôt que la mise en page garantit du 60 FPS. Et respecter `prefers-reduced-motion` rend le site accessible à tous. Une belle animation qui rame gâche l'effet recherché." },
      { type: 'quote', text: "Le mouvement doit raconter une histoire, pas distraire de celle-ci." },
      { type: 'p', text: "C'est exactement l'approche que j'ai suivie pour ce portfolio : chaque section a sa propre respiration, sans jamais nuire à la lisibilité ni à la vitesse." },
    ],
  },
];

export const getPost = (slug?: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string, locale = 'fr') =>
  new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
