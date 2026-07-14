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
  // ─── Article 1 ───────────────────────────────────────────────────────────────
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

  // ─── Article 2 ───────────────────────────────────────────────────────────────
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

  // ─── Article 3 ───────────────────────────────────────────────────────────────
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
      { type: 'h', text: "La règle d'or : la sobriété" },
      { type: 'p', text: "Une animation réussie se remarque à peine — elle sert le contenu, elle ne le vole pas. Des durées courtes, des courbes d'accélération naturelles (easeOut) et de la cohérence entre les sections : c'est ce qui donne un rendu « premium »." },
      { type: 'h', text: 'La performance avant tout' },
      { type: 'p', text: "Animer `transform` et `opacity` plutôt que la mise en page garantit du 60 FPS. Et respecter `prefers-reduced-motion` rend le site accessible à tous. Une belle animation qui rame gâche l'effet recherché." },
      { type: 'quote', text: "Le mouvement doit raconter une histoire, pas distraire de celle-ci." },
      { type: 'p', text: "C'est exactement l'approche que j'ai suivie pour ce portfolio : chaque section a sa propre respiration, sans jamais nuire à la lisibilité ni à la vitesse." },
    ],
  },

  // ─── Article 4 ───────────────────────────────────────────────────────────────
  {
    slug: 'websocket-encheres-temps-reel',
    title: "WebSocket et enchères en temps réel : ce que j'ai appris",
    description:
      "Comment j'ai construit une plateforme d'enchères multijoueur avec socket.io et Node.js : synchronisation en temps réel, gestion des conflits et leçons techniques.",
    date: '2026-06-30',
    readMinutes: 7,
    tags: ['Node.js', 'WebSocket', 'Architecture'],
    gradient: 'from-brand/20 via-brand-3/25 to-brand-2/20',
    content: [
      { type: 'p', text: "Quand j'ai décidé de créer une plateforme d'enchères en ligne, j'ai vite réalisé que le traditionnel cycle requête/réponse HTTP ne suffirait pas. Quand un utilisateur enchérit, tous les autres participants doivent le voir instantanément — sans recharger la page. C'est là qu'entre en jeu WebSocket." },
      { type: 'h', text: 'Pourquoi WebSocket plutôt que HTTP classique ?' },
      { type: 'p', text: "HTTP fonctionne en sens unique : le client demande, le serveur répond. Pour du temps réel, il faudrait poller le serveur toutes les secondes — une horreur en termes de performance. WebSocket ouvre un canal bidirectionnel persistant : le serveur peut envoyer des données au client à tout moment, sans attendre une requête." },
      { type: 'h', text: 'Architecture mise en place avec socket.io' },
      { type: 'list', items: [
        "Un serveur Node.js qui centralise l'état des enchères",
        "Des rooms socket.io isolant chaque session d'enchère",
        "Des événements typés : bid:new, bid:reject, auction:end",
        "Un état synchronisé côté serveur pour éviter les conflits entre offres simultanées",
      ]},
      { type: 'h', text: 'Le vrai défi : les conflits' },
      { type: 'p', text: "Deux utilisateurs peuvent envoyer une offre au même milliseconde. Sans gestion côté serveur, les deux verraient leur offre acceptée. J'ai résolu ça avec un verrou applicatif simple : le serveur traite les offres en séquence et rejette celle arrivée en second si elle est inférieure ou égale à l'offre déjà enregistrée." },
      { type: 'quote', text: "Le temps réel, c'est facile à la démo. Robuste sous charge, c'est un autre métier." },
      { type: 'h', text: "Ce que ce projet m'a apporté" },
      { type: 'p', text: "Au-delà de la technique, ce projet m'a appris à penser en termes d'état partagé et de cohérence. Des notions que je retrouve aujourd'hui en travaillant sur des applications React avec un état global — la parallèle avec Redux ou Zustand est frappante." },
    ],
  },

  // ─── Article 5 ───────────────────────────────────────────────────────────────
  {
    slug: 'typescript-pourquoi-adopter',
    title: "TypeScript : pourquoi j'ai arrêté de coder en JavaScript pur",
    description:
      "Retour d'expérience sur le passage à TypeScript : moins de bugs en production, une meilleure documentation vivante du code et une vraie sérénité pour les refactors.",
    date: '2026-07-01',
    readMinutes: 6,
    tags: ['TypeScript', 'JavaScript', 'Bonnes pratiques'],
    gradient: 'from-brand-2/25 via-brand/15 to-brand-3/25',
    content: [
      { type: 'p', text: "Pendant longtemps, TypeScript me semblait une surcouche inutile. \"Le JavaScript fonctionne, pourquoi rajouter de la complexité ?\" Puis j'ai eu mon premier vrai bug de production causé par un `undefined` non anticipé. Depuis, je ne touche plus à un projet sans TypeScript." },
      { type: 'h', text: "Ce que TypeScript change concrètement" },
      { type: 'list', items: [
        "Les erreurs sont signalées dans l'éditeur, pas chez l'utilisateur",
        "L'autocomplétion devient précise : plus besoin d'aller lire la doc à chaque appel",
        "Refactorer un nom de propriété sur 30 fichiers se fait en un raccourci clavier",
        "Les interfaces servent de documentation vivante : elles ne peuvent pas mentir",
      ]},
      { type: 'h', text: "Le coût d'entrée est réel, mais vite amorti" },
      { type: 'p', text: "Typer tous les props React, les réponses d'API, les états — ça prend du temps au début. Mais dès le premier refactor ou la première revue de code en équipe, le bénéfice est évident. Le temps gagné à déboguer compense largement le temps investi à typer." },
      { type: 'h', text: "Mes bonnes pratiques après plusieurs projets" },
      { type: 'list', items: [
        "Activer strict: true dès le départ — le laxisme initial coûte cher plus tard",
        "Préférer les types utilitaires natifs (Partial, Pick, Omit) avant de créer les siens",
        "Ne jamais abuser de `any` — c'est l'équivalent de capituler",
        "Typer les réponses d'API avec des interfaces dédiées, jamais implicitement",
      ]},
      { type: 'quote', text: "TypeScript ne ralentit pas, il révèle les endroits où tu allais trop vite." },
      { type: 'p', text: "Aujourd'hui, tous mes projets — ce portfolio, les sites WebLocal, les apps full-stack — démarrent avec TypeScript. C'est devenu une seconde nature, et je ne comprends plus comment je faisais sans." },
    ],
  },

  // ─── Article 6 ───────────────────────────────────────────────────────────────
  {
    slug: 'lancer-micro-agence-web-20-ans',
    title: "Lancer sa micro-agence web à 20 ans : les vraies leçons",
    description:
      "Comment j'ai créé WebLocal en parallèle de mes études en MIAGE : trouver ses premiers clients, fixer ses prix, gérer son temps et ce que j'aurais fait différemment.",
    date: '2026-07-01',
    readMinutes: 8,
    tags: ['Freelance', 'Entrepreneuriat', 'WebLocal'],
    gradient: 'from-amber-400/20 via-brand/15 to-brand-2/20',
    content: [
      { type: 'p', text: "WebLocal est née d'un constat simple : autour de moi, des commerçants et artisans avaient besoin d'une présence en ligne professionnelle mais ne savaient pas à qui s'adresser — ou se faisaient facturer des sommes disproportionnées pour un résultat médiocre. J'ai décidé de combler ce manque." },
      { type: 'h', text: "Trouver ses premiers clients sans réseau établi" },
      { type: 'p', text: "Le premier client est toujours le plus difficile. Sans portfolio client et sans recommandations, j'ai misé sur la proximité : démarchage direct auprès de commerces locaux, proposition d'un audit gratuit de leur présence en ligne, et un premier projet à prix réduit pour construire une référence concrète." },
      { type: 'h', text: "Fixer ses prix : l'erreur classique du débutant" },
      { type: 'p', text: "J'ai commencé en sous-facturant, comme beaucoup. Puis j'ai compris que le prix bas n'attire pas les bons clients — il attire ceux qui ne respectent ni le travail ni les délais. Augmenter mes tarifs a paradoxalement amélioré la qualité des relations clients." },
      { type: 'h', text: "Ce que les études m'ont apporté dans l'entrepreneuriat" },
      { type: 'list', items: [
        "La rigueur de l'analyse et la modélisation (UML, Merise) pour cadrer les projets",
        "La gestion de projet et les méthodes agiles pour structurer les sprints",
        "La culture technique pour ne jamais vendre ce que je ne peux pas livrer",
        "Un réseau d'étudiants qui sont devenus mes premiers testeurs et prescripteurs",
      ]},
      { type: 'h', text: "Gérer son temps entre études et projets clients" },
      { type: 'p', text: "La clé : des plages horaires fixes et non négociables pour chaque activité. Les clients savent dès le départ que je suis étudiant — et que ça garantit justement que je suis à la pointe de ce que l'industrie fait. C'est un atout, pas un défaut." },
      { type: 'quote', text: "L'alternance que je cherche aujourd'hui est la suite logique : appliquer en entreprise ce que j'ai appris seul, et rapporter de l'entreprise ce que les cours ne m'ont pas encore appris." },
      { type: 'h', text: "Ce que j'aurais fait différemment" },
      { type: 'list', items: [
        "Spécialiser l'offre plus tôt plutôt que de tout proposer dès le début",
        "Créer mon portfolio bien avant d'en avoir besoin",
        "Documenter chaque projet pour construire des études de cas réutilisables",
        "Facturer les modifications hors périmètre dès le premier projet — sans culpabilité",
      ]},
    ],
  },

  // ─── Article 7 ───────────────────────────────────────────────────────────────
  {
    slug: 'optimiser-performance-react',
    title: "5 techniques pour optimiser les performances d'une app React",
    description:
      "Chargement lent, rendus inutiles, bundles trop lourds : les problèmes de performance React les plus fréquents et comment les résoudre concrètement.",
    date: '2026-07-01',
    readMinutes: 7,
    tags: ['React', 'Performance', 'Optimisation'],
    gradient: 'from-brand-3/20 via-brand/20 to-brand-2/20',
    content: [
      { type: 'p', text: "Une application React peut devenir lente de mille façons différentes. Après plusieurs projets — dont ce portfolio et des applications clients — j'ai identifié les coupables récurrents et les techniques qui font vraiment la différence." },
      { type: 'h', text: '1. Lazy loading et code splitting' },
      { type: 'p', text: "Par défaut, Vite et Webpack regroupent tout le code dans un seul bundle. Résultat : l'utilisateur télécharge du code pour des pages qu'il ne visitera peut-être jamais. `React.lazy()` + `Suspense` permet de charger chaque route à la demande — le gain sur le Time To Interactive peut être spectaculaire." },
      { type: 'h', text: '2. Éviter les rendus inutiles avec memo et useCallback' },
      { type: 'list', items: [
        "React.memo() sur les composants purs qui reçoivent les mêmes props",
        "useCallback() pour les fonctions passées en props à des composants mémoïsés",
        "useMemo() pour les calculs coûteux qui ne doivent pas se répéter à chaque rendu",
        "Mais attention : mémoïser a un coût — ne l'appliquer que là où le problème est mesuré",
      ]},
      { type: 'h', text: '3. Optimiser les images' },
      { type: 'p', text: "Les images sont souvent le premier goulot d'étranglement. Format WebP ou AVIF, attribut `loading=\"lazy\"`, dimensionnement correct selon le viewport, et si possible un CDN avec transformation à la volée : chacune de ces étapes peut diviser le poids de la page par deux." },
      { type: 'h', text: '4. Virtualiser les longues listes' },
      { type: 'p', text: "Rendre 500 éléments DOM en même temps est inutile : l'utilisateur n'en voit qu'une dizaine. Des librairies comme TanStack Virtual ne rendent que les éléments visibles dans la fenêtre, réduisant drastiquement la charge du DOM." },
      { type: 'h', text: "5. Mesurer avant d'optimiser" },
      { type: 'quote', text: "Optimiser sans mesurer, c'est naviguer à l'aveugle. L'outil de profiler de React DevTools est ton meilleur ami." },
      { type: 'p', text: "Le Profiler de React DevTools identifie les composants qui rerendent trop souvent. Lighthouse et WebPageTest donnent une vue d'ensemble. Sans ces données, on risque de passer du temps sur des détails qui ne changent rien à l'expérience utilisateur réelle." },
    ],
  },

  // ─── Article 8 ───────────────────────────────────────────────────────────────
  {
    slug: 'combien-coute-site-web-2025',
    title: 'Combien coûte un site web professionnel en 2025 ?',
    description:
      "Site vitrine, e-commerce, application web : fourchettes de prix réelles, ce qui justifie le tarif et comment ne pas se faire arnaquer lors de la création de votre site.",
    date: '2026-07-02',
    readMinutes: 6,
    tags: ['Freelance', 'Site web', 'Prix'],
    gradient: 'from-amber-400/25 via-brand/15 to-brand-2/20',
    content: [
      { type: 'p', text: "C'est la question que me posent le plus souvent les entrepreneurs et commerçants qui me contactent via WebLocal : combien va me coûter mon site web ? La réponse honnête, c'est que ça dépend. Mais voici des fourchettes réelles et les critères qui les expliquent." },
      { type: 'h', text: 'Les grandes catégories et leurs prix en 2025' },
      { type: 'list', items: [
        "Site vitrine sur mesure (5 à 10 pages) : entre 800 € et 3 000 € selon la complexité",
        "Site e-commerce (catalogue, panier, paiement) : entre 2 000 € et 6 000 €",
        "Application web sur mesure (espace client, dashboard, logiciel métier) : à partir de 5 000 €",
        "Refonte d'un site existant : généralement 50 à 70 % du prix d'un site neuf",
      ]},
      { type: 'h', text: "Pourquoi ces écarts de prix ?" },
      { type: 'p', text: "Un site facturé 300 € est souvent un template modifié à la va-vite, hébergé sur une plateforme qui prend une commission mensuelle et impossible à faire évoluer. Un site sur mesure intègre une phase de conception, un design unique, du code propre et maintenable, et un référencement pensé dès le départ." },
      { type: 'h', text: "Ce qui est inclus dans un bon devis" },
      { type: 'list', items: [
        "Analyse de vos besoins et de votre secteur",
        "Design adapté à votre identité visuelle",
        "Intégration responsive (mobile, tablette, desktop)",
        "Optimisation SEO de base (balises, vitesse, sitemap)",
        "Formation à la mise à jour du contenu",
        "Période de garantie et support post-livraison",
      ]},
      { type: 'quote', text: "Un site web, ce n'est pas une dépense — c'est un commercial disponible 24h/24. Le ROI se mesure en clients gagnés, pas en euros économisés à la commande." },
      { type: 'h', text: "Comment choisir son prestataire ?" },
      { type: 'p', text: "Demandez toujours à voir des réalisations récentes, à parler à d'anciens clients et à obtenir la propriété complète du site à la livraison. Un bon développeur vous explique ses choix techniques, il ne vous noie pas sous le jargon pour justifier une facture." },
    ],
  },

  // ─── Article 9 ───────────────────────────────────────────────────────────────
  {
    slug: 'site-vitrine-vs-ecommerce',
    title: 'Site vitrine ou e-commerce : lequel choisir pour votre entreprise ?',
    description:
      "Vous hésitez entre un site de présentation et une boutique en ligne ? Voici les critères décisifs pour faire le bon choix selon votre activité et votre budget.",
    date: '2026-07-02',
    readMinutes: 5,
    tags: ['E-commerce', 'Site vitrine', 'Conseils'],
    gradient: 'from-brand-2/20 via-amber-400/15 to-brand/20',
    content: [
      { type: 'p', text: "Quand un client me contacte pour créer son site, la première question que je lui pose n'est pas technique : est-ce que vous voulez vendre directement en ligne, ou simplement vous faire connaître et générer des contacts ? La réponse détermine tout." },
      { type: 'h', text: 'Le site vitrine : votre carte de visite numérique' },
      { type: 'p', text: "Un site vitrine présente votre activité, vos services, vos valeurs et vos coordonnées. Son objectif : convaincre le visiteur de vous appeler, vous écrire ou venir vous voir. C'est le bon choix pour les artisans, prestataires de services, restaurants, professions libérales et PME locales." },
      { type: 'h', text: "Le site e-commerce : votre boutique ouverte 24h/24" },
      { type: 'p', text: "Un e-commerce permet à vos clients de commander et payer directement en ligne. Il implique une gestion de catalogue, un système de paiement sécurisé, la gestion des stocks et des expéditions. C'est indispensable si vous vendez des produits physiques ou numériques à distance." },
      { type: 'h', text: "Les critères pour choisir" },
      { type: 'list', items: [
        "Vous vendez des produits physiques ou numériques en ligne → e-commerce",
        "Vous proposez des services et cherchez des leads → vitrine",
        "Budget limité pour démarrer → vitrine (évolutive vers e-commerce)",
        "Vous avez déjà un point de vente physique et voulez le compléter → les deux sont envisageables",
      ]},
      { type: 'h', text: "Le piège à éviter" },
      { type: 'p', text: "Beaucoup de clients veulent un e-commerce parce que ça semble plus professionnel. Mais gérer les commandes, les retours, les fiches produits et le service client représente un investissement en temps réel. Un site vitrine bien fait avec un formulaire de contact convertit souvent mieux qu'un e-commerce bâclé." },
      { type: 'quote', text: "Le meilleur site web est celui que vous arriverez réellement à maintenir et à faire vivre dans la durée." },
    ],
  },

  // ─── Article 10 ───────────────────────────────────────────────────────────────
  {
    slug: 'pourquoi-site-web-perd-clients',
    title: 'Pourquoi votre site web vous fait perdre des clients sans que vous le sachiez',
    description:
      "Chargement lent, design vieillissant, pas de version mobile : les 6 erreurs qui font fuir vos visiteurs avant même qu'ils lisent votre offre.",
    date: '2026-07-02',
    readMinutes: 5,
    tags: ['Site web', 'UX', 'Conversion'],
    gradient: 'from-red-400/15 via-brand/15 to-brand-3/20',
    content: [
      { type: 'p', text: "La majorité des clients qui quittent un site ne vous contactent jamais pour vous dire pourquoi. Ils partent simplement — et vont chez un concurrent. Après avoir analysé de nombreux sites lors de diagnostics gratuits chez WebLocal, voici les 6 raisons les plus fréquentes." },
      { type: 'h', text: "1. Le site charge en plus de 3 secondes" },
      { type: 'p', text: "53 % des visites mobiles sont abandonnées si la page prend plus de 3 secondes à charger. Un site lent envoie aussi un signal négatif à Google, ce qui nuit au référencement. Images non optimisées, hébergement bas de gamme, code non minifié : les causes sont souvent simples à corriger." },
      { type: 'h', text: "2. Le design date de plus de 5 ans" },
      { type: 'p', text: "Le design de votre site communique votre sérieux avant même que le visiteur lise une ligne. Un site vieillissant crée une méfiance inconsciente. Dans des secteurs concurrentiels, cela suffit à perdre une vente." },
      { type: 'h', text: "3. Il n'est pas adapté au mobile" },
      { type: 'p', text: "En 2025, plus de 60 % du trafic web mondial vient des smartphones. Un site non responsive repousse la majorité de vos visiteurs potentiels et est pénalisé par Google dans ses résultats de recherche." },
      { type: 'h', text: "Les autres erreurs fréquentes" },
      { type: 'list', items: [
        "Aucun appel à l'action clair : le visiteur ne sait pas quoi faire ensuite",
        "Pas de preuve sociale (avis, témoignages, références clients)",
        "Formulaire de contact cassé ou difficile à trouver",
      ]},
      { type: 'quote', text: "Votre site web travaille pour vous à chaque instant — ou contre vous. Il n'y a pas de entre-deux." },
      { type: 'p', text: "Un audit rapide de votre site (gratuit chez WebLocal) permet d'identifier les points bloquants en moins d'une heure et d'établir un plan d'action concret." },
    ],
  },

  // ─── Article 11 ───────────────────────────────────────────────────────────────
  {
    slug: 'refonte-site-web-5-signes',
    title: "Refonte de site web : 5 signes qu'il est temps de changer",
    description:
      "Design vieilli, mauvais référencement, site non mobile : comment savoir si votre site a besoin d'une refonte complète et par où commencer.",
    date: '2026-07-02',
    readMinutes: 5,
    tags: ['Refonte', 'Site web', 'Conseils'],
    gradient: 'from-brand-3/20 via-brand/15 to-amber-400/15',
    content: [
      { type: 'p', text: "Un site web a une durée de vie. Techniquement, il peut fonctionner indéfiniment. Mais à partir d'un certain point, le maintenir coûte plus cher — en opportunités perdues — que de le refaire. Voici les 5 signaux qui indiquent que la refonte est nécessaire." },
      { type: 'h', text: "1. Vous avez honte de donner votre URL" },
      { type: 'p', text: "Si vous hésitez avant de mentionner votre site lors d'un rendez-vous client, c'est le signe le plus clair. Votre site doit être un atout commercial, pas une excuse à formuler." },
      { type: 'h', text: "2. Il n'est pas responsive" },
      { type: 'p', text: "Un site créé avant 2018 n'a souvent pas été pensé pour mobile. Google pénalise ces sites dans ses résultats depuis le déploiement du mobile-first indexing. C'est une refonte non négociable." },
      { type: 'h', text: "3. Vous ne pouvez pas le mettre à jour vous-même" },
      { type: 'p', text: "Si chaque modification de texte ou d'image nécessite de contacter votre développeur initial et de payer une prestation, votre site est devenu une prison. Un site moderne doit vous donner l'autonomie sur le contenu." },
      { type: 'h', text: "4. Vos indicateurs de performance se dégradent" },
      { type: 'list', items: [
        "Taux de rebond en hausse (les gens repartent immédiatement)",
        "Temps passé sur le site en baisse",
        "Moins de demandes de contact qu'avant",
        "Positionnement Google qui glisse vers le bas",
      ]},
      { type: 'h', text: "5. Votre offre a évolué mais pas votre site" },
      { type: 'p', text: "Vous avez changé de positionnement, ajouté des services, changé de cible — mais votre site raconte encore l'ancienne histoire. Cette incohérence crée de la confusion et nuit à votre crédibilité." },
      { type: 'quote', text: "Une refonte est un investissement, pas une dépense. Le bon moment pour la faire, c'est avant de perdre des clients à cause de votre site actuel." },
    ],
  },

  // ─── Article 12 ───────────────────────────────────────────────────────────────
  {
    slug: 'seo-bases-developpeur-web',
    title: 'SEO technique : les bases indispensables pour tout développeur web',
    description:
      "Core Web Vitals, balises meta, données structurées, sitemap : les fondamentaux du référencement technique que chaque développeur front-end doit maîtriser en 2025.",
    date: '2026-07-02',
    readMinutes: 7,
    tags: ['SEO', 'Performance', 'Développement web'],
    gradient: 'from-brand/20 via-brand-2/20 to-brand-3/20',
    content: [
      { type: 'p', text: "Le SEO est souvent perçu comme une discipline à part, réservée aux spécialistes marketing. Pourtant, la majorité des facteurs de référencement sont d'ordre technique et dépendent directement du développeur. Voici les bases que j'applique systématiquement sur tous mes projets." },
      { type: 'h', text: "Core Web Vitals : les métriques que Google mesure" },
      { type: 'list', items: [
        "LCP (Largest Contentful Paint) : l'élément principal doit s'afficher en moins de 2,5 s",
        "FID / INP (interaction) : réponse aux clics en moins de 200 ms",
        "CLS (Cumulative Layout Shift) : pas de décalages visuels inattendus lors du chargement",
      ]},
      { type: 'h', text: "Les balises meta incontournables" },
      { type: 'p', text: "Chaque page doit avoir un title unique et descriptif (50-60 caractères), une meta description engageante (150-160 caractères) et une balise canonical pour éviter le contenu dupliqué. Pour les réseaux sociaux, les balises Open Graph assurent un aperçu soigné lors du partage." },
      { type: 'h', text: "Les données structurées (JSON-LD)" },
      { type: 'p', text: "Les données structurées permettent à Google de comprendre le contenu de votre page et d'afficher des rich snippets dans les résultats. Pour un portfolio ou un blog, le schema Person et le schema BlogPosting sont les plus utiles." },
      { type: 'h', text: "Sitemap, robots.txt et performance" },
      { type: 'list', items: [
        "Un sitemap.xml à jour facilite l'indexation de toutes vos pages",
        "Le robots.txt contrôle ce que les moteurs de recherche peuvent explorer",
        "Les images compressées et les scripts différés améliorent le score Lighthouse",
        "Le rendu côté serveur (SSR/SSG) garantit que le contenu est indexable sans JavaScript",
      ]},
      { type: 'quote', text: "Un site bien développé est naturellement bien référencé. Le SEO technique, ce n'est pas une couche qu'on ajoute après — c'est une discipline qu'on intègre dès le début." },
    ],
  },

  // ─── Article 13 ───────────────────────────────────────────────────────────────
  {
    slug: 'nextjs-vs-vite-quand-choisir',
    title: 'Next.js vs Vite en 2025 : mon retour après plusieurs projets',
    description:
      "SSR, SSG, SPA : quand utiliser Next.js et quand préférer Vite + React ? Comparaison pragmatique basée sur des projets réels, pas sur des benchmarks théoriques.",
    date: '2026-07-02',
    readMinutes: 6,
    tags: ['Next.js', 'Vite', 'React'],
    gradient: 'from-brand-2/25 via-brand-3/15 to-brand/20',
    content: [
      { type: 'p', text: "Depuis que je travaille sur des projets React, j'ai utilisé Next.js sur certains et Vite sur d'autres — dont ce portfolio. Le choix entre les deux n'est pas une question de préférence : c'est une question de besoins. Voici ma grille de lecture." },
      { type: 'h', text: "Vite : la vitesse de développement avant tout" },
      { type: 'p', text: "Vite est un outil de build ultra-rapide. Le démarrage du serveur de dev est quasi instantané, le hot module replacement est fluide, et la configuration est minimaliste. C'est l'outil idéal pour les SPA, les outils internes, les dashboards et les portfolios." },
      { type: 'h', text: "Next.js : le framework complet pour la production" },
      { type: 'p', text: "Next.js apporte le SSR (rendu serveur à la demande), le SSG (génération statique), les API Routes, l'optimisation automatique des images et un système de routing basé sur les fichiers. C'est le choix naturel pour les sites publics qui ont besoin de SEO et de performance." },
      { type: 'h', text: "Ma règle de décision" },
      { type: 'list', items: [
        "SEO critique + contenu dynamique → Next.js avec SSR",
        "Blog ou site marketing → Next.js avec SSG (ou Vite + vite-react-ssg comme ce portfolio)",
        "Application métier / dashboard / outil interne → Vite",
        "Prototype rapide ou POC → Vite sans hésiter",
      ]},
      { type: 'h', text: "Le piège du sur-engineering" },
      { type: 'p', text: "J'ai vu des développeurs mettre Next.js sur des projets qui n'avaient aucun besoin de SSR, ajoutant une complexité inutile. Et inversement, des sites publics critiques construits en SPA pure, invisibles pour Google. L'outil doit servir le projet, pas impressionner." },
      { type: 'quote', text: "Le meilleur framework est celui que vous maîtrisez et qui répond aux vrais besoins du projet. Pas celui qui est en tendance sur Twitter cette semaine." },
    ],
  },

  // ─── Article 14 ───────────────────────────────────────────────────────────────
  {
    slug: 'git-conventions-equipe',
    title: 'Git en équipe : les conventions que j\'applique sur tous mes projets',
    description:
      "Nommage des branches, messages de commit, pull requests, Git flow : les bonnes pratiques concrètes pour un historique Git propre et une collaboration sans friction.",
    date: '2026-07-02',
    readMinutes: 6,
    tags: ['Git', 'Bonnes pratiques', 'Travail en équipe'],
    gradient: 'from-brand-3/20 via-brand/20 to-brand-2/15',
    content: [
      { type: 'p', text: "Un dépôt Git mal géré, c'est des conflits non résolus, des commits inutiles et un historique illisible. Que ce soit en solo ou en équipe, avoir des conventions claires dès le départ fait gagner un temps considérable. Voici celles que j'applique systématiquement." },
      { type: 'h', text: "Nommage des branches" },
      { type: 'list', items: [
        "feature/nom-de-la-fonctionnalite — pour les nouvelles fonctionnalités",
        "fix/description-du-bug — pour les corrections",
        "chore/mise-a-jour-dependances — pour la maintenance",
        "release/v1.2.0 — pour les versions",
      ]},
      { type: 'h', text: "Messages de commit (Conventional Commits)" },
      { type: 'p', text: "Le standard Conventional Commits impose un format : type(scope): description. Par exemple : feat(auth): ajouter la connexion Google ou fix(form): corriger la validation du champ email. Ce format permet de générer automatiquement un changelog et de comprendre l'historique en un coup d'oeil." },
      { type: 'h', text: "Les pull requests qui facilitent la revue" },
      { type: 'list', items: [
        "Un titre qui décrit le changement, pas la tâche (\"Ajouter le tri par date\" et non \"Feature #42\")",
        "Une description avec le contexte, les screenshots si UI, et les points à tester",
        "Des commits atomiques : une PR = un changement logique cohérent",
        "Des PR petites : plus facile à relire, plus rapide à merger",
      ]},
      { type: 'h', text: ".gitignore et secrets" },
      { type: 'p', text: "Ne jamais commiter un fichier .env. Utiliser .env.example pour documenter les variables attendues. C'est une règle non négociable — les secrets exposés sur GitHub sont une faille de sécurité réelle avec des conséquences concrètes." },
      { type: 'quote', text: "Un bon historique Git, c'est une documentation qui ne ment jamais. Chaque commit raconte une décision prise à un instant précis." },
    ],
  },

  // ─── Article 15 ───────────────────────────────────────────────────────────────
  {
    slug: 'deployer-react-vercel-guide',
    title: 'Déployer une application React sur Vercel : guide complet 2025',
    description:
      "De zéro à un site en ligne en moins de 10 minutes : configuration Vercel, variables d'environnement, domaine personnalisé et déploiement continu avec GitHub.",
    date: '2026-07-02',
    readMinutes: 5,
    tags: ['Vercel', 'Déploiement', 'React'],
    gradient: 'from-brand/15 via-brand-3/20 to-brand-2/20',
    content: [
      { type: 'p', text: "Vercel est devenu la référence pour déployer des applications React. En quelques clics, votre application est en ligne, servie depuis un CDN mondial, avec HTTPS automatique et des déploiements à chaque push. Voici comment je le configure sur tous mes projets." },
      { type: 'h', text: "Étape 1 : connecter votre dépôt GitHub" },
      { type: 'p', text: "Créez un compte sur vercel.com, cliquez sur \"Add New Project\" et autorisez l'accès à votre dépôt GitHub. Vercel détecte automatiquement le framework (Vite, Next.js, Create React App) et préconfigure les commandes de build." },
      { type: 'h', text: "Étape 2 : configurer les variables d'environnement" },
      { type: 'p', text: "Dans Settings > Environment Variables, ajoutez toutes vos variables sensibles (clés API, identifiants EmailJS, Measurement ID GA4). Elles sont injectées au build et ne sont jamais exposées dans le code source." },
      { type: 'h', text: "Étape 3 : ajouter votre domaine personnalisé" },
      { type: 'p', text: "Dans Settings > Domains, entrez votre domaine. Vercel vous donne les enregistrements DNS à ajouter chez votre registrar (OVH, Gandi, Namecheap). Le certificat HTTPS est généré automatiquement en quelques minutes." },
      { type: 'h', text: "Le déploiement continu : le vrai gain" },
      { type: 'list', items: [
        "Chaque push sur main déclenche un build et un déploiement automatique",
        "Chaque pull request génère une preview URL unique pour tester avant de merger",
        "Les rollbacks se font en un clic si un déploiement pose problème",
        "Les logs de build sont accessibles en temps réel depuis le dashboard",
      ]},
      { type: 'quote', text: "Vercel ne remplace pas une bonne architecture — il l'amplifie. Un site mal construit restera lent même sur le meilleur CDN." },
    ],
  },

  // ─── Article 16 ───────────────────────────────────────────────────────────────
  {
    slug: 'api-rest-nodejs-bonnes-pratiques',
    title: 'Construire une API REST propre avec Node.js : les bonnes pratiques',
    description:
      "Structure de projet, gestion des erreurs, validation des données, authentification JWT : les patterns que j'applique pour des APIs Node.js maintenables et robustes.",
    date: '2026-07-02',
    readMinutes: 8,
    tags: ['Node.js', 'API REST', 'Back-end'],
    gradient: 'from-brand-2/20 via-brand/20 to-brand-3/20',
    content: [
      { type: 'p', text: "Construire une API qui fonctionne est facile. Construire une API propre, maintenable et robuste est une discipline. Après plusieurs projets back-end — dont la plateforme d'enchères et le système Bubbleti — voici les patterns qui ont prouvé leur valeur." },
      { type: 'h', text: "Structure de projet claire dès le départ" },
      { type: 'list', items: [
        "routes/ — définition des endpoints et connexion aux contrôleurs",
        "controllers/ — logique métier de chaque endpoint",
        "middlewares/ — authentification, validation, gestion des erreurs",
        "models/ — interaction avec la base de données",
        "utils/ — fonctions réutilisables (formatage, crypto, envoi de mail)",
      ]},
      { type: 'h', text: "Validation systématique des entrées" },
      { type: 'p', text: "Ne jamais faire confiance aux données qui arrivent dans une requête. Que ce soit avec Zod, Joi ou express-validator, chaque endpoint doit valider le body, les params et les query strings avant d'exécuter la moindre logique métier. C'est la première ligne de défense contre les bugs et les failles." },
      { type: 'h', text: "Gestion centralisée des erreurs" },
      { type: 'p', text: "Un middleware de gestion des erreurs global évite la duplication de try/catch partout. On y définit les codes HTTP appropriés (400 pour une mauvaise requête, 401 pour une authentification manquante, 404 pour une ressource inexistante, 500 pour les erreurs serveur) et on s'assure de ne jamais exposer de stack trace en production." },
      { type: 'h', text: "Authentification avec JWT" },
      { type: 'list', items: [
        "Stocker le token dans un cookie httpOnly (pas dans localStorage)",
        "Définir une durée de vie courte (15 min) avec un refresh token",
        "Ne jamais stocker d'informations sensibles dans le payload JWT",
        "Révoquer les tokens côté serveur pour les déconnexions critiques",
      ]},
      { type: 'quote', text: "Une API propre, c'est du code que vos collègues — ou vous dans 6 mois — comprennent sans avoir à vous appeler." },
    ],
  },

  // ─── Article 17 ───────────────────────────────────────────────────────────────
  {
    slug: 'accessibilite-web-guide-developpeur',
    title: "Accessibilité web : le guide pratique pour les développeurs",
    description:
      "Contraste, navigation clavier, attributs ARIA, textes alternatifs : les bonnes pratiques d'accessibilité qui améliorent l'UX pour tous et boostent votre SEO.",
    date: '2026-07-02',
    readMinutes: 6,
    tags: ['Accessibilité', 'UX', 'Bonnes pratiques'],
    gradient: 'from-brand/20 via-brand-2/15 to-brand-3/20',
    content: [
      { type: 'p', text: "L'accessibilité web est souvent perçue comme une contrainte réservée aux grands groupes soumis à des obligations légales. En réalité, c'est une discipline qui améliore l'expérience de tous les utilisateurs — et qui a un impact direct sur le référencement. Voici les bases concrètes." },
      { type: 'h', text: "Le contraste des couleurs" },
      { type: 'p', text: "Un ratio de contraste minimum de 4,5:1 entre le texte et son fond est requis par les WCAG (Web Content Accessibility Guidelines). Des outils comme WebAIM Contrast Checker permettent de vérifier ça en quelques secondes. C'est l'une des erreurs les plus fréquentes et les plus faciles à corriger." },
      { type: 'h', text: "La navigation au clavier" },
      { type: 'p', text: "Un utilisateur ne doit pas avoir besoin d'une souris pour naviguer sur votre site. Tous les éléments interactifs (liens, boutons, formulaires) doivent être accessibles via Tab, et leur état focus doit être visible. Sur ce portfolio, chaque bouton respecte cette règle — c'est non négociable." },
      { type: 'h', text: "Les textes alternatifs pour les images" },
      { type: 'list', items: [
        "Chaque image porteuse de sens doit avoir un attribut alt descriptif",
        "Les images décoratives doivent avoir un alt vide (alt=\"\") pour être ignorées par les lecteurs d'écran",
        "Les icônes SVG interactives doivent avoir un aria-label",
        "Les graphiques complexes doivent avoir une description textuelle",
      ]},
      { type: 'h', text: "Les attributs ARIA avec modération" },
      { type: 'p', text: "ARIA (Accessible Rich Internet Applications) permet d'enrichir la sémantique des éléments HTML. Mais la règle d'or est : utiliser d'abord le bon élément HTML natif. Un bouton avec aria-role=\"button\" sur un div est toujours moins bien qu'un vrai button." },
      { type: 'quote', text: "Développer un site accessible, c'est s'assurer qu'il fonctionne pour le maximum de personnes dans le maximum de contextes. C'est de l'empathie appliquée au code." },
      { type: 'p', text: "En bonus : les sites accessibles sont mieux indexés par Google, car les robots de crawl fonctionnent de manière similaire aux lecteurs d'écran. Accessibilité et SEO se renforcent mutuellement." },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Vague SEO — 25 articles supplémentaires (acquisition clients + technique)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    slug: 'creer-site-web-restaurant',
    title: "Comment créer un site web pour un restaurant en 2025",
    description:
      "Menu en ligne, réservations, avis, référencement local : le guide complet pour un site de restaurant qui remplit vraiment la salle.",
    date: '2026-07-03',
    readMinutes: 7,
    tags: ['Restaurant', 'Site web', 'Local'],
    gradient: 'from-amber-400/25 via-brand/15 to-brand-2/20',
    content: [
      { type: 'p', text: "Un restaurant sans site web laisse partir des clients chaque jour. Avant de réserver ou de se déplacer, les gens cherchent le menu, les horaires et les avis. Voici comment construire un site qui transforme ces recherches en couverts." },
      { type: 'h', text: "Les éléments indispensables" },
      { type: 'list', items: [
        "Le menu à jour, lisible sur mobile (pas un PDF illisible)",
        "Les horaires et l'adresse avec un lien Google Maps",
        "Un bouton de réservation ou un numéro cliquable",
        "De vraies photos des plats et de la salle",
        "Les avis clients bien visibles",
      ]},
      { type: 'h', text: "Le mobile avant tout" },
      { type: 'p', text: "La majorité des recherches de restaurant se font sur smartphone, souvent juste avant de choisir où manger. Un site lent ou mal adapté au mobile fait fuir le client vers le concurrent d'à côté." },
      { type: 'h', text: "Le référencement local, votre meilleur allié" },
      { type: 'p', text: "Couplé à une fiche Google Business Profile bien remplie, un site optimisé pour les recherches locales (\"restaurant + ville\") vous fait apparaître au bon moment. C'est souvent plus rentable que la publicité payante." },
      { type: 'quote', text: "Le meilleur plat du monde ne remplit pas une salle si personne ne vous trouve en ligne." },
      { type: 'p', text: "Chez WebLocal, je conçois des sites de restaurants pensés pour convertir : menu interactif, réservation intégrée, galerie et SEO local. Le tout livré rapidement et facile à mettre à jour." },
    ],
  },

  {
    slug: 'site-web-artisan-guide',
    title: "Artisan : pourquoi un site web va changer votre activité",
    description:
      "Plombier, électricien, menuisier : comment un site web simple mais bien fait vous apporte des clients qualifiés et vous démarque de la concurrence.",
    date: '2026-07-03',
    readMinutes: 6,
    tags: ['Artisan', 'Site web', 'Conseils'],
    gradient: 'from-brand/20 via-amber-400/15 to-brand-2/20',
    content: [
      { type: 'p', text: "Beaucoup d'artisans pensent que le bouche-à-oreille suffit. Il est précieux, mais il a une limite : il ne travaille pas quand vous dormez. Un site web, si." },
      { type: 'h', text: "Ce qu'un client cherche avant de vous appeler" },
      { type: 'list', items: [
        "Vos réalisations en photo (la preuve de votre savoir-faire)",
        "Votre zone d'intervention",
        "Vos coordonnées, faciles à trouver",
        "Des avis rassurants",
        "Une idée de vos tarifs ou une demande de devis simple",
      ]},
      { type: 'h', text: "Se démarquer d'un concurrent sans site" },
      { type: 'p', text: "Entre deux artisans, le client choisit souvent celui qui inspire le plus confiance. Un site propre avec des photos de chantiers réels et quelques avis fait pencher la balance immédiatement." },
      { type: 'h', text: "Un site simple suffit" },
      { type: 'p', text: "Pas besoin d'un site complexe : une page d'accueil claire, une galerie, une page contact et un bon référencement local suffisent à générer des demandes de devis régulières." },
      { type: 'quote', text: "Votre travail est déjà excellent. Votre site doit simplement le montrer au bon moment aux bonnes personnes." },
    ],
  },

  {
    slug: 'referencement-local-google-business',
    title: "Référencement local : dominer les recherches de votre ville",
    description:
      "Google Business Profile, avis, mots-clés locaux : la méthode pour apparaître en premier quand un client cherche un commerce comme le vôtre près de chez lui.",
    date: '2026-07-04',
    readMinutes: 7,
    tags: ['SEO local', 'Google', 'Commerce'],
    gradient: 'from-brand-2/25 via-brand/15 to-brand-3/20',
    content: [
      { type: 'p', text: "Quand quelqu'un cherche \"coiffeur près de moi\" ou \"pizzeria + ville\", Google affiche d'abord une carte avec trois commerces. Y figurer, c'est capter le client au moment exact où il décide. Voici comment y arriver." },
      { type: 'h', text: "Google Business Profile : la base" },
      { type: 'p', text: "C'est gratuit et c'est le levier n°1 du référencement local. Remplissez tout : catégorie précise, horaires, photos, description, services. Un profil complet est bien mieux classé qu'un profil vide." },
      { type: 'h', text: "Les avis, moteur du classement local" },
      { type: 'list', items: [
        "Demandez systématiquement un avis aux clients satisfaits",
        "Répondez à tous les avis, positifs comme négatifs",
        "La régularité compte plus qu'un pic ponctuel",
      ]},
      { type: 'h', text: "Un site cohérent avec votre fiche" },
      { type: 'p', text: "Votre nom, adresse et téléphone doivent être identiques partout (site, fiche Google, annuaires). Cette cohérence, appelée NAP, renforce la confiance de Google dans votre commerce." },
      { type: 'quote', text: "Le référencement local, c'est être trouvé par les gens qui peuvent réellement pousser votre porte." },
    ],
  },

  {
    slug: 'obtenir-avis-google-clients',
    title: "Comment obtenir plus d'avis Google (sans harceler vos clients)",
    description:
      "Les avis sont l'or de la réputation en ligne. Voici des méthodes simples et éthiques pour en récolter davantage et booster votre visibilité.",
    date: '2026-07-04',
    readMinutes: 5,
    tags: ['Avis', 'Réputation', 'Local'],
    gradient: 'from-amber-400/20 via-brand-2/15 to-brand/20',
    content: [
      { type: 'p', text: "Les avis Google influencent à la fois votre classement et la décision du client. Pourtant, la plupart des commerces n'en demandent jamais. Voici comment en obtenir naturellement." },
      { type: 'h', text: "Demander au bon moment" },
      { type: 'p', text: "Le meilleur moment, c'est juste après une expérience réussie : à la fin d'un repas, après une prestation terminée, à la livraison. Le client est satisfait et disponible." },
      { type: 'h', text: "Rendre l'action ultra simple" },
      { type: 'list', items: [
        "Un QR code sur la table ou le comptoir menant directement au formulaire d'avis",
        "Un lien court envoyé par SMS ou email",
        "Une carte de visite avec le lien",
      ]},
      { type: 'h', text: "Répondre à chaque avis" },
      { type: 'p', text: "Répondre montre que vous êtes attentif et professionnel. Face à un avis négatif, une réponse posée et constructive vaut mieux que dix avis positifs sans réponse." },
      { type: 'quote', text: "Un avis, ce n'est pas juste une étoile : c'est un client qui recommande votre commerce à des inconnus, 24h/24." },
    ],
  },

  {
    slug: 'site-web-ou-reseaux-sociaux-commerce',
    title: "Site web ou réseaux sociaux : où investir pour votre commerce ?",
    description:
      "Faut-il un site quand on a déjà Instagram ou Facebook ? La réponse honnête, et pourquoi les deux ne jouent pas le même rôle.",
    date: '2026-07-05',
    readMinutes: 6,
    tags: ['Stratégie', 'Réseaux sociaux', 'Site web'],
    gradient: 'from-brand-3/20 via-brand/15 to-brand-2/20',
    content: [
      { type: 'p', text: "\"J'ai déjà une page Facebook, pourquoi un site web ?\" C'est une question légitime que me posent souvent les commerçants. La vraie réponse : ce sont deux outils complémentaires, pas concurrents." },
      { type: 'h', text: "Les réseaux sociaux : la conversation" },
      { type: 'p', text: "Ils sont parfaits pour animer une communauté, montrer votre quotidien et rester présent dans l'esprit des gens. Mais vous ne possédez pas la plateforme : un changement d'algorithme et votre portée s'effondre." },
      { type: 'h', text: "Le site web : votre bien propre" },
      { type: 'list', items: [
        "Vous en êtes propriétaire, personne ne peut le fermer",
        "Il apparaît sur Google quand on cherche vos services",
        "Il inspire plus de sérieux qu'une simple page sociale",
        "Il centralise tout : menu, réservation, contact, avis",
      ]},
      { type: 'h', text: "La bonne stratégie" },
      { type: 'p', text: "Les réseaux attirent l'attention, le site convertit. Utilisez les réseaux pour créer du lien, et renvoyez toujours vers votre site pour l'action concrète (réserver, commander, contacter)." },
      { type: 'quote', text: "Construire son activité uniquement sur les réseaux sociaux, c'est bâtir sur un terrain qui ne vous appartient pas." },
    ],
  },

  {
    slug: 'tarif-maintenance-site-web',
    title: "Maintenance de site web : à quoi ça sert et combien ça coûte",
    description:
      "Mises à jour, sécurité, sauvegardes : pourquoi un site n'est jamais \"fini\" et ce que couvre réellement un contrat de maintenance.",
    date: '2026-07-05',
    readMinutes: 5,
    tags: ['Maintenance', 'Site web', 'Prix'],
    gradient: 'from-brand/20 via-brand-3/15 to-brand-2/20',
    content: [
      { type: 'p', text: "Un site web n'est pas une plaquette qu'on imprime une fois. C'est un outil vivant qui a besoin d'entretien pour rester rapide, sécurisé et à jour. Voici ce que couvre vraiment la maintenance." },
      { type: 'h', text: "Ce qu'inclut un bon contrat" },
      { type: 'list', items: [
        "Mises à jour techniques et de sécurité",
        "Sauvegardes régulières pour ne rien perdre",
        "Corrections de bugs et petits ajustements",
        "Surveillance de la disponibilité du site",
        "Mises à jour de contenu selon la formule",
      ]},
      { type: 'h', text: "Pourquoi c'est important" },
      { type: 'p', text: "Un site non maintenu devient vulnérable aux piratages, ralentit, et peut afficher des erreurs qui font fuir les visiteurs. La maintenance, c'est une assurance contre les mauvaises surprises." },
      { type: 'h', text: "Les ordres de prix" },
      { type: 'p', text: "Selon la complexité et le niveau de service, un forfait de maintenance va généralement de quelques dizaines à quelques centaines d'euros par mois. C'est un investissement modeste comparé au coût d'un site cassé au mauvais moment." },
      { type: 'quote', text: "Un site sans maintenance, c'est une voiture qu'on ne révise jamais : ça roule, jusqu'au jour où ça casse." },
    ],
  },

  {
    slug: 'nom-de-domaine-hebergement-guide',
    title: "Nom de domaine et hébergement : le guide simple pour débuter",
    description:
      "Deux notions qui font peur et qui sont pourtant simples. Comment choisir un bon nom de domaine et un hébergement fiable, sans se faire avoir.",
    date: '2026-07-06',
    readMinutes: 6,
    tags: ['Nom de domaine', 'Hébergement', 'Débutant'],
    gradient: 'from-brand-2/20 via-brand/15 to-brand-3/20',
    content: [
      { type: 'p', text: "Avant de mettre un site en ligne, deux briques sont nécessaires : le nom de domaine (votre adresse) et l'hébergement (l'endroit où vivent vos fichiers). Démystifions tout ça." },
      { type: 'h', text: "Le nom de domaine" },
      { type: 'p', text: "C'est votre adresse sur internet, comme votre-commerce.fr. Choisissez-le court, facile à retenir et à épeler. Privilégiez le .fr pour une activité locale française, et vérifiez sa disponibilité avant tout." },
      { type: 'h', text: "L'hébergement" },
      { type: 'list', items: [
        "C'est le \"terrain\" où sont stockés les fichiers de votre site",
        "Un bon hébergeur garantit vitesse et disponibilité",
        "Certaines solutions modernes (comme Vercel) hébergent gratuitement les sites bien construits",
        "Fuyez les offres trop lentes ou aux frais cachés",
      ]},
      { type: 'h', text: "Un piège à éviter" },
      { type: 'p', text: "Gardez toujours la propriété de votre nom de domaine à votre nom. Certains prestataires l'enregistrent au leur, et vous prennent en otage le jour où vous voulez partir. C'est non négociable." },
      { type: 'quote', text: "Posséder son nom de domaine, c'est posséder son adresse. Ne le laissez jamais entre les mains d'un tiers." },
    ],
  },

  {
    slug: 'vitesse-site-web-conversion',
    title: "Pourquoi la vitesse de votre site vous fait gagner (ou perdre) des clients",
    description:
      "Une seconde de chargement en trop peut faire chuter vos conversions. Comprendre le lien entre performance et chiffre d'affaires.",
    date: '2026-07-06',
    readMinutes: 6,
    tags: ['Performance', 'Conversion', 'UX'],
    gradient: 'from-brand-3/20 via-brand-2/15 to-brand/20',
    content: [
      { type: 'p', text: "La vitesse n'est pas un détail technique réservé aux développeurs. C'est un facteur direct de chiffre d'affaires. Chaque seconde d'attente coûte des visiteurs, et donc des clients." },
      { type: 'h', text: "Les chiffres qui font mal" },
      { type: 'p', text: "Plus de la moitié des visiteurs mobiles quittent une page qui met plus de 3 secondes à charger. Et Google pénalise les sites lents dans son classement. Un site lent perd donc sur les deux tableaux : trafic et conversions." },
      { type: 'h', text: "Les causes fréquentes de lenteur" },
      { type: 'list', items: [
        "Des images trop lourdes non optimisées",
        "Un hébergement bas de gamme",
        "Trop de scripts et de plugins inutiles",
        "L'absence de mise en cache",
      ]},
      { type: 'h', text: "Ce que ça change concrètement" },
      { type: 'p', text: "Un site rapide améliore l'expérience, réduit le taux de rebond et augmente les conversions. Sur mon propre portfolio, optimiser les images et le chargement des polices a fait bondir le score de performance mobile." },
      { type: 'quote', text: "La vitesse, c'est de la politesse envers vos visiteurs. Et la politesse, en ligne, se convertit en ventes." },
    ],
  },

  {
    slug: 'checklist-avant-lancer-site',
    title: "La checklist complète avant de mettre votre site en ligne",
    description:
      "SEO, mobile, vitesse, sécurité, mentions légales : les 10 points à vérifier absolument avant le lancement de votre site.",
    date: '2026-07-07',
    readMinutes: 6,
    tags: ['Checklist', 'Lancement', 'Site web'],
    gradient: 'from-brand/20 via-brand-2/15 to-brand-3/20',
    content: [
      { type: 'p', text: "Mettre un site en ligne, c'est excitant. Mais un lancement bâclé peut coûter cher en crédibilité. Voici la checklist que je parcours avant chaque mise en production." },
      { type: 'h', text: "Technique et performance" },
      { type: 'list', items: [
        "Le site s'affiche parfaitement sur mobile, tablette et desktop",
        "Les pages chargent en moins de 3 secondes",
        "Toutes les images sont optimisées",
        "Le certificat HTTPS est actif (le petit cadenas)",
      ]},
      { type: 'h', text: "Contenu et SEO" },
      { type: 'list', items: [
        "Chaque page a un titre et une description uniques",
        "Aucun texte de remplissage \"Lorem ipsum\" oublié",
        "Les liens fonctionnent tous, sans erreur 404",
        "Un sitemap est généré et soumis à Google",
      ]},
      { type: 'h', text: "Légal et confiance" },
      { type: 'p', text: "N'oubliez pas les mentions légales, la politique de confidentialité et la gestion des cookies. Elles sont obligatoires et rassurent le visiteur sur votre sérieux." },
      { type: 'quote', text: "Un bon lancement ne se voit pas. Un mauvais lancement, tout le monde le remarque." },
    ],
  },

  {
    slug: 'react-hooks-guide-debutant',
    title: "Comprendre les hooks React quand on débute",
    description:
      "useState, useEffect, useRef : à quoi servent les hooks React, quand les utiliser et les pièges classiques du débutant.",
    date: '2026-07-07',
    readMinutes: 7,
    tags: ['React', 'Hooks', 'Débutant'],
    gradient: 'from-brand-2/25 via-brand/15 to-brand-3/20',
    content: [
      { type: 'p', text: "Les hooks ont révolutionné React en permettant de gérer l'état et les effets dans des composants fonctions. Mais pour un débutant, ils peuvent sembler magiques. Décortiquons les plus importants." },
      { type: 'h', text: "useState : la mémoire du composant" },
      { type: 'p', text: "useState permet à un composant de se souvenir d'une valeur entre les rendus : un compteur, un texte saisi, l'état d'une modale. Quand la valeur change, React redessine automatiquement le composant." },
      { type: 'h', text: "useEffect : réagir aux changements" },
      { type: 'p', text: "useEffect exécute du code en réponse à un événement : au montage du composant, ou quand une valeur change. Idéal pour appeler une API ou s'abonner à un événement. Attention à bien gérer le tableau de dépendances." },
      { type: 'h', text: "useRef : garder une référence" },
      { type: 'list', items: [
        "Accéder à un élément du DOM (un input à focus, par exemple)",
        "Stocker une valeur qui ne doit pas déclencher de rendu",
        "Garder une donnée persistante entre les rendus",
      ]},
      { type: 'quote', text: "Les hooks ne sont pas magiques : ce sont juste des fonctions qui donnent de la mémoire et des réactions à vos composants." },
      { type: 'p', text: "Le meilleur moyen de les maîtriser reste la pratique. Construisez de petits projets, et ces concepts deviendront vite une seconde nature." },
    ],
  },

  {
    slug: 'useeffect-erreurs-courantes',
    title: "useEffect : les 5 erreurs qui piègent tous les débutants",
    description:
      "Boucles infinies, dépendances manquantes, nettoyage oublié : les erreurs classiques avec useEffect et comment les éviter.",
    date: '2026-07-08',
    readMinutes: 6,
    tags: ['React', 'useEffect', 'Debug'],
    gradient: 'from-brand-3/20 via-brand/20 to-brand-2/15',
    content: [
      { type: 'p', text: "useEffect est à la fois l'un des hooks les plus puissants et les plus mal utilisés de React. Voici les erreurs que je vois le plus souvent, et comment les corriger." },
      { type: 'h', text: "1. La boucle infinie" },
      { type: 'p', text: "Mettre à jour un état dans un useEffect sans tableau de dépendances (ou avec une dépendance mal gérée) crée une boucle infinie : l'effet met à jour l'état, ce qui relance l'effet, à l'infini." },
      { type: 'h', text: "2. Les dépendances manquantes" },
      { type: 'p', text: "Oublier une variable dans le tableau de dépendances mène à des bugs subtils où l'effet utilise une valeur périmée. L'outil ESLint de React signale ces oublis : écoutez-le." },
      { type: 'h', text: "3. Oublier le nettoyage" },
      { type: 'list', items: [
        "Un abonnement non désabonné continue de tourner après le démontage",
        "Un timer non nettoyé provoque des fuites mémoire",
        "Retournez toujours une fonction de nettoyage quand c'est nécessaire",
      ]},
      { type: 'h', text: "4. Trop en faire dans un seul effet" },
      { type: 'p', text: "Un useEffect qui gère cinq choses différentes est illisible. Séparez-les : un effet par responsabilité rend le code plus clair et plus facile à déboguer." },
      { type: 'quote', text: "useEffect n'est pas fait pour tout. Souvent, le meilleur useEffect est celui qu'on n'écrit pas." },
    ],
  },

  {
    slug: 'css-flexbox-vs-grid',
    title: "Flexbox ou Grid : lequel utiliser et quand ?",
    description:
      "Les deux systèmes de mise en page CSS modernes expliqués simplement, avec une règle claire pour choisir le bon selon la situation.",
    date: '2026-07-08',
    readMinutes: 6,
    tags: ['CSS', 'Layout', 'Front-end'],
    gradient: 'from-brand/20 via-brand-2/20 to-brand-3/15',
    content: [
      { type: 'p', text: "Flexbox et Grid ont rendu la mise en page CSS enfin agréable. Mais beaucoup de développeurs hésitent entre les deux. La bonne nouvelle : la règle pour choisir est simple." },
      { type: 'h', text: "Flexbox : une dimension" },
      { type: 'p', text: "Flexbox excelle pour aligner des éléments sur une seule ligne ou une seule colonne : une barre de navigation, une rangée de boutons, une liste verticale. Il gère magnifiquement l'espace disponible." },
      { type: 'h', text: "Grid : deux dimensions" },
      { type: 'p', text: "Grid est fait pour les mises en page en lignes ET colonnes simultanément : une galerie, un tableau de bord, la structure globale d'une page. Il offre un contrôle précis sur les deux axes." },
      { type: 'h', text: "La règle simple" },
      { type: 'list', items: [
        "Alignement sur un seul axe → Flexbox",
        "Grille en lignes et colonnes → Grid",
        "Les deux se combinent très bien ensemble",
      ]},
      { type: 'quote', text: "Flexbox pour aligner, Grid pour structurer. Une fois cette règle intégrée, la mise en page devient un jeu." },
    ],
  },

  {
    slug: 'tailwind-vs-css-classique',
    title: "Tailwind CSS vs CSS classique : le match honnête",
    description:
      "Tailwind divise la communauté. Avantages, inconvénients et mon retour après plusieurs projets pour savoir s'il est fait pour vous.",
    date: '2026-07-09',
    readMinutes: 6,
    tags: ['Tailwind CSS', 'CSS', 'Front-end'],
    gradient: 'from-brand-2/25 via-brand-3/15 to-brand/20',
    content: [
      { type: 'p', text: "Tailwind CSS suscite des débats passionnés : révolution pour les uns, horreur pour les autres. Après l'avoir utilisé sur de nombreux projets, dont ce portfolio, voici mon avis équilibré." },
      { type: 'h', text: "Ce que Tailwind apporte" },
      { type: 'list', items: [
        "Un développement très rapide, sans quitter le HTML",
        "Un design cohérent grâce aux tokens (couleurs, espacements)",
        "Aucun fichier CSS à maintenir en parallèle",
        "Un rendu responsive rapide à mettre en place",
      ]},
      { type: 'h', text: "Les critiques légitimes" },
      { type: 'p', text: "Le HTML devient verbeux, avec de longues listes de classes. La courbe d'apprentissage existe, et sans discipline (composants réutilisables), on peut se retrouver avec de la duplication." },
      { type: 'h', text: "Mon verdict" },
      { type: 'p', text: "Pour un projet avec des composants réutilisables (React, Vue), Tailwind est un accélérateur formidable. Pour un petit site statique très custom, le CSS classique reste tout à fait valable. L'outil doit servir le projet." },
      { type: 'quote', text: "Tailwind ne remplace pas la connaissance du CSS : il la récompense." },
    ],
  },

  {
    slug: 'javascript-async-await-guide',
    title: "async / await en JavaScript enfin expliqué clairement",
    description:
      "Promesses, async, await : comprendre le code asynchrone en JavaScript une bonne fois pour toutes, avec des exemples concrets.",
    date: '2026-07-09',
    readMinutes: 7,
    tags: ['JavaScript', 'Async', 'Débutant'],
    gradient: 'from-brand/20 via-brand-3/20 to-brand-2/15',
    content: [
      { type: 'p', text: "Le code asynchrone est partout en JavaScript : appels API, lecture de fichiers, timers. async/await a rendu tout cela beaucoup plus lisible. Voici comment ça marche vraiment." },
      { type: 'h', text: "Le problème que ça résout" },
      { type: 'p', text: "Certaines opérations prennent du temps (récupérer des données d'un serveur, par exemple). JavaScript ne veut pas bloquer tout le programme en attendant. Les promesses représentent ce \"résultat qui arrivera plus tard\"." },
      { type: 'h', text: "async et await" },
      { type: 'p', text: "Le mot-clé async devant une fonction indique qu'elle retourne une promesse. await, à l'intérieur, met en pause l'exécution jusqu'à ce que la promesse soit résolue, sans bloquer le reste de l'application. Le code se lit alors de haut en bas, comme du code synchrone." },
      { type: 'h', text: "Ne pas oublier la gestion d'erreur" },
      { type: 'list', items: [
        "Entourez vos await d'un bloc try/catch",
        "Une requête peut toujours échouer (réseau, serveur)",
        "Gérer l'erreur évite les plantages silencieux",
      ]},
      { type: 'quote', text: "async/await, c'est écrire du code asynchrone qui se lit comme une histoire, du début à la fin." },
    ],
  },

  {
    slug: 'api-rest-vs-graphql',
    title: "REST ou GraphQL : quelle API choisir pour votre projet ?",
    description:
      "Deux approches pour construire une API, deux philosophies. Comparaison claire pour choisir la bonne selon votre contexte.",
    date: '2026-07-10',
    readMinutes: 7,
    tags: ['API', 'GraphQL', 'Architecture'],
    gradient: 'from-brand-3/20 via-brand/20 to-brand-2/15',
    content: [
      { type: 'p', text: "REST est le standard historique des API. GraphQL, plus récent, propose une autre philosophie. Les deux fonctionnent très bien : tout dépend de vos besoins." },
      { type: 'h', text: "REST : simple et éprouvé" },
      { type: 'p', text: "REST organise les données en ressources accessibles par des URL. Simple à comprendre, largement supporté, parfait pour la plupart des projets. Son défaut : on récupère parfois trop ou pas assez de données." },
      { type: 'h', text: "GraphQL : le client demande exactement ce qu'il veut" },
      { type: 'list', items: [
        "Une seule requête pour récupérer précisément les champs voulus",
        "Fini le sur-chargement ou le sous-chargement de données",
        "Idéal quand les besoins des clients sont variés (mobile, web)",
      ]},
      { type: 'h', text: "Comment choisir" },
      { type: 'p', text: "Pour un projet simple à moyen, REST fait parfaitement le travail et demande moins de mise en place. GraphQL brille sur les applications complexes avec de nombreux clients aux besoins différents. Ne choisissez pas GraphQL juste parce que c'est à la mode." },
      { type: 'quote', text: "La meilleure API n'est pas la plus tendance, c'est celle qui correspond aux besoins réels de votre projet." },
    ],
  },

  {
    slug: 'authentification-jwt-guide',
    title: "L'authentification par JWT expliquée simplement",
    description:
      "Comment fonctionne l'authentification moderne par token JWT, ses avantages, et les erreurs de sécurité à ne pas commettre.",
    date: '2026-07-10',
    readMinutes: 7,
    tags: ['Sécurité', 'JWT', 'Back-end'],
    gradient: 'from-brand/20 via-brand-2/20 to-brand-3/15',
    content: [
      { type: 'p', text: "L'authentification est au cœur de toute application avec des comptes utilisateurs. Le JWT (JSON Web Token) est devenu un standard. Voici comment il fonctionne, sans jargon inutile." },
      { type: 'h', text: "Le principe" },
      { type: 'p', text: "Quand l'utilisateur se connecte, le serveur lui remet un jeton signé (le JWT). À chaque requête suivante, le client présente ce jeton, et le serveur vérifie sa signature pour savoir qui parle, sans avoir à interroger la base à chaque fois." },
      { type: 'h', text: "Les avantages" },
      { type: 'list', items: [
        "Le serveur n'a pas besoin de stocker les sessions",
        "Idéal pour les API et les architectures distribuées",
        "Le jeton contient les informations utiles (sans données sensibles)",
      ]},
      { type: 'h', text: "Les pièges de sécurité" },
      { type: 'p', text: "Ne stockez jamais d'informations sensibles dans le jeton (il est lisible). Préférez un cookie httpOnly au localStorage pour limiter les attaques. Et donnez une durée de vie courte au jeton, avec un système de rafraîchissement." },
      { type: 'quote', text: "Un système d'authentification mal conçu, c'est une porte d'entrée grande ouverte. La sécurité se pense dès le premier jour." },
    ],
  },

  {
    slug: 'docker-debutant-guide',
    title: "Docker pour les débutants : à quoi ça sert vraiment",
    description:
      "Conteneurs, images, \"ça marche sur ma machine\" : comprendre Docker et pourquoi il a changé la façon de développer et déployer.",
    date: '2026-07-11',
    readMinutes: 6,
    tags: ['Docker', 'DevOps', 'Débutant'],
    gradient: 'from-brand-2/20 via-brand-3/15 to-brand/20',
    content: [
      { type: 'p', text: "\"Ça marche sur ma machine\" est la phrase la plus frustrante du développement. Docker a été créé précisément pour tuer ce problème. Voici l'idée, simplement." },
      { type: 'h', text: "Le concept du conteneur" },
      { type: 'p', text: "Un conteneur Docker embarque votre application avec tout ce dont elle a besoin pour tourner : le code, les dépendances, la configuration. Résultat : elle fonctionne de manière identique partout, sur votre PC comme sur le serveur." },
      { type: 'h', text: "Images et conteneurs" },
      { type: 'list', items: [
        "L'image est le \"plan\" figé de votre application",
        "Le conteneur est une instance qui tourne à partir de cette image",
        "On peut lancer plusieurs conteneurs identiques à partir d'une image",
      ]},
      { type: 'h', text: "Pourquoi c'est puissant" },
      { type: 'p', text: "Docker élimine les différences d'environnement, facilite le travail en équipe et simplifie le déploiement. Un nouvel arrivant peut lancer tout le projet en une commande, sans passer une journée à configurer sa machine." },
      { type: 'quote', text: "Docker transforme \"ça marche sur ma machine\" en \"ça marche partout, tout le temps\"." },
    ],
  },

  {
    slug: 'tests-automatises-frontend',
    title: "Les tests automatisés en front-end : par où commencer",
    description:
      "Pourquoi tester son code front-end, quels types de tests écrire en priorité, et comment démarrer sans se noyer.",
    date: '2026-07-11',
    readMinutes: 6,
    tags: ['Tests', 'Front-end', 'Qualité'],
    gradient: 'from-brand-3/20 via-brand-2/15 to-brand/20',
    content: [
      { type: 'p', text: "Beaucoup de développeurs repoussent les tests, les jugeant trop longs à écrire. Pourtant, quelques tests bien placés font gagner un temps considérable en évitant les régressions. Voici par où commencer." },
      { type: 'h', text: "Pourquoi tester" },
      { type: 'p', text: "Un test automatisé vérifie qu'une fonctionnalité marche, encore et encore, sans effort manuel. Quand vous modifiez le code, les tests vous alertent immédiatement si vous cassez quelque chose ailleurs." },
      { type: 'h', text: "Par quoi commencer" },
      { type: 'list', items: [
        "Les tests unitaires sur vos fonctions utilitaires (calculs, formatage)",
        "Les tests de composants sur vos éléments d'interface clés",
        "Les parcours critiques (connexion, paiement) en priorité",
      ]},
      { type: 'h', text: "Ne pas viser 100%" },
      { type: 'p', text: "Chercher à tout tester est contre-productif. Concentrez-vous sur ce qui casserait le plus votre application si ça tombait en panne. Mieux vaut 30% de couverture bien pensée que 90% de tests inutiles." },
      { type: 'quote', text: "Un bon test, ce n'est pas une contrainte : c'est un filet de sécurité qui vous laisse coder l'esprit tranquille." },
    ],
  },

  {
    slug: 'clean-code-principes',
    title: "Clean code : 6 principes pour un code qu'on relit sans souffrir",
    description:
      "Nommage, fonctions courtes, cohérence : les principes simples qui séparent un code jetable d'un code durable et maintenable.",
    date: '2026-07-12',
    readMinutes: 7,
    tags: ['Clean Code', 'Bonnes pratiques', 'Qualité'],
    gradient: 'from-brand/20 via-brand-2/20 to-brand-3/15',
    content: [
      { type: 'p', text: "Le code est lu bien plus souvent qu'il n'est écrit. Un code propre, c'est un code que vous — ou un collègue — comprenez dans six mois sans jurer. Voici les principes que j'applique." },
      { type: 'h', text: "1. Des noms qui parlent" },
      { type: 'p', text: "Une variable nommée nombreUtilisateursActifs vaut mille commentaires. Fuyez les x, tmp, data anonymes. Le bon nom rend le code auto-documenté." },
      { type: 'h', text: "2. Des fonctions courtes et focalisées" },
      { type: 'list', items: [
        "Une fonction fait une seule chose, et la fait bien",
        "Si elle dépasse l'écran, elle en fait probablement trop",
        "Un nom de fonction clair décrit exactement son action",
      ]},
      { type: 'h', text: "3. La cohérence avant tout" },
      { type: 'p', text: "Peu importe la convention choisie, tenez-vous-y dans tout le projet. Un code cohérent est prévisible, et la prévisibilité réduit la charge mentale du lecteur." },
      { type: 'h', text: "Éviter les commentaires inutiles" },
      { type: 'p', text: "Un bon code se passe de commentaires évidents. Réservez les commentaires pour expliquer le \"pourquoi\" d'une décision, jamais le \"quoi\" que le code exprime déjà." },
      { type: 'quote', text: "Écrivez votre code comme si la personne qui le maintiendra était un psychopathe violent qui sait où vous habitez." },
    ],
  },

  {
    slug: 'reussir-recherche-alternance-informatique',
    title: "Réussir sa recherche d'alternance en informatique",
    description:
      "Candidatures, portfolio, entretiens : les conseils concrets que j'applique pour décrocher une alternance en développement.",
    date: '2026-07-12',
    readMinutes: 7,
    tags: ['Alternance', 'Carrière', 'Conseils'],
    gradient: 'from-brand-2/20 via-brand/15 to-brand-3/20',
    content: [
      { type: 'p', text: "Chercher une alternance en développement est un projet en soi. Après avoir affûté ma propre démarche, voici les leviers qui font vraiment la différence." },
      { type: 'h', text: "Un portfolio qui prouve" },
      { type: 'p', text: "Les recruteurs veulent voir ce que vous savez faire, pas seulement le lire. Un portfolio avec de vrais projets, du code sur GitHub et des réalisations concrètes vaut mille lignes de CV." },
      { type: 'h', text: "Des candidatures ciblées" },
      { type: 'list', items: [
        "Personnalisez chaque candidature à l'entreprise",
        "Montrez que vous avez compris ce qu'elle fait",
        "Un message court et précis vaut mieux qu'un pavé générique",
        "Relancez poliment après une semaine sans réponse",
      ]},
      { type: 'h', text: "Se démarquer par les projets" },
      { type: 'p', text: "Créer WebLocal, mon agence de sites web, m'a donné des projets clients réels à présenter. Rien ne parle plus fort qu'une preuve de travail concret livré à de vrais utilisateurs." },
      { type: 'quote', text: "En recherche d'alternance, votre meilleur argument n'est pas ce que vous dites savoir faire, mais ce que vous avez déjà fait." },
    ],
  },

  {
    slug: 'cv-developpeur-junior',
    title: "Le CV de développeur junior qui passe les filtres",
    description:
      "Ce qu'un recruteur regarde vraiment sur un CV de dev débutant, et les erreurs qui envoient directement à la corbeille.",
    date: '2026-07-13',
    readMinutes: 6,
    tags: ['CV', 'Carrière', 'Junior'],
    gradient: 'from-brand-3/20 via-brand/15 to-brand-2/20',
    content: [
      { type: 'p', text: "Un recruteur passe quelques secondes sur un CV avant de décider. Pour un développeur junior, chaque ligne compte. Voici ce qui fait mouche, et ce qui coule votre candidature." },
      { type: 'h', text: "Mettre les projets en avant" },
      { type: 'p', text: "Sans années d'expérience, ce sont vos projets qui parlent. Décrivez-les avec les technologies utilisées, le lien vers la démo et le code. C'est ce qui rassure sur votre capacité à produire." },
      { type: 'h', text: "Les erreurs qui tuent" },
      { type: 'list', items: [
        "Lister 30 technologies dont vous ne maîtrisez que le nom",
        "Un CV de trois pages illisible",
        "Aucun lien vers GitHub ou un portfolio",
        "Des fautes d'orthographe (rédhibitoire)",
      ]},
      { type: 'h', text: "Rester honnête et clair" },
      { type: 'p', text: "Indiquez votre vrai niveau sur chaque techno. Un recruteur préfère un junior lucide sur ses acquis qu'un candidat qui gonfle son CV et se fait démasquer en entretien." },
      { type: 'quote', text: "Votre CV n'a qu'un seul but : décrocher l'entretien. Faites simple, honnête et orienté preuves." },
    ],
  },

  {
    slug: 'preparer-entretien-technique',
    title: "Préparer un entretien technique de développeur",
    description:
      "Tests de code, questions théoriques, mises en situation : comment aborder sereinement un entretien technique et éviter le stress.",
    date: '2026-07-13',
    readMinutes: 7,
    tags: ['Entretien', 'Carrière', 'Technique'],
    gradient: 'from-brand/20 via-brand-3/15 to-brand-2/20',
    content: [
      { type: 'p', text: "L'entretien technique impressionne, mais il se prépare. L'objectif du recruteur n'est pas de vous piéger, mais de voir comment vous réfléchissez. Voici comment l'aborder." },
      { type: 'h', text: "Réviser les fondamentaux" },
      { type: 'p', text: "Maîtrisez les bases du langage et des concepts de votre stack : structures de données, boucles, fonctions, notions de base algorithmiques. On teste rarement l'exotique, souvent le solide." },
      { type: 'h', text: "Penser à voix haute" },
      { type: 'list', items: [
        "Expliquez votre raisonnement au fur et à mesure",
        "Un recruteur juge la démarche autant que le résultat",
        "Bloqué ? Décrire où vous coincez est déjà un bon signe",
      ]},
      { type: 'h', text: "Poser des questions" },
      { type: 'p', text: "Un bon développeur clarifie le besoin avant de coder. Reformuler l'énoncé, poser des questions sur les cas limites : c'est exactement ce qu'on attend d'un professionnel." },
      { type: 'quote', text: "En entretien technique, on ne cherche pas quelqu'un qui sait tout, mais quelqu'un qui sait réfléchir et apprendre." },
    ],
  },

  {
    slug: 'idees-projets-portfolio-developpeur',
    title: "10 idées de projets pour muscler votre portfolio de dev",
    description:
      "À court d'inspiration ? Des idées de projets concrets, du simple au ambitieux, pour démontrer vos compétences aux recruteurs.",
    date: '2026-07-13',
    readMinutes: 6,
    tags: ['Portfolio', 'Projets', 'Carrière'],
    gradient: 'from-brand-2/20 via-brand-3/15 to-brand/20',
    content: [
      { type: 'p', text: "Un portfolio se construit avec des projets. Mais lesquels ? Voici des idées qui montrent des compétences variées et racontent une vraie histoire technique." },
      { type: 'h', text: "Pour démarrer" },
      { type: 'list', items: [
        "Une application météo consommant une API publique",
        "Une todo-list avec sauvegarde et filtres",
        "Une calculatrice ou un convertisseur soigné",
        "Un portfolio personnel (le méta-projet utile)",
      ]},
      { type: 'h', text: "Pour progresser" },
      { type: 'list', items: [
        "Un blog avec système d'articles et recherche",
        "Une application de gestion (tâches, budget, stock)",
        "Un clone simplifié d'un service connu",
        "Un tableau de bord avec graphiques et données",
      ]},
      { type: 'h', text: "Pour impressionner" },
      { type: 'p', text: "Une application temps réel (chat, enchères), un projet full-stack avec authentification, ou une expérience originale (3D, jeu). C'est ce qui marque les esprits et déclenche les discussions en entretien." },
      { type: 'quote', text: "Un projet terminé et en ligne vaut dix idées géniales restées dans votre tête." },
    ],
  },

  {
    slug: 'veille-techno-developpeur',
    title: "Comment faire sa veille techno sans se noyer",
    description:
      "Le monde du dev évolue vite. Une méthode simple pour rester à jour sur les technologies sans y passer toutes ses soirées.",
    date: '2026-07-13',
    readMinutes: 5,
    tags: ['Veille', 'Carrière', 'Productivité'],
    gradient: 'from-brand-3/20 via-brand-2/15 to-brand/20',
    content: [
      { type: 'p', text: "En développement, ne pas se former, c'est reculer. Mais l'avalanche de nouveautés peut vite devenir écrasante. La clé : une veille régulière et ciblée, pas exhaustive." },
      { type: 'h', text: "Choisir ses sources" },
      { type: 'p', text: "Inutile de tout suivre. Sélectionnez quelques sources de qualité : une newsletter, quelques comptes de référence, un ou deux blogs techniques. Mieux vaut trois sources lues qu'une centaine ignorées." },
      { type: 'h', text: "Apprendre en faisant" },
      { type: 'list', items: [
        "Testez une nouvelle techno sur un petit projet perso",
        "La pratique ancre mille fois mieux que la lecture passive",
        "Documentez ce que vous apprenez (un article, une note)",
      ]},
      { type: 'h', text: "Ne pas courir après chaque nouveauté" },
      { type: 'p', text: "Toutes les tendances ne survivront pas. Maîtrisez d'abord les fondamentaux solides et durables, puis explorez les nouveautés avec curiosité mais sans FOMO. La profondeur bat la course permanente." },
      { type: 'quote', text: "La veille n'est pas une course à tout savoir, mais l'art de rester curieux sans s'épuiser." },
    ],
  },

  {
    slug: 'mobile-first-pourquoi-essentiel',
    title: "Mobile-first : pourquoi concevoir d'abord pour le téléphone",
    description:
      "Plus de la moitié du web se consulte sur mobile. Pourquoi partir du petit écran change tout, pour l'expérience et pour Google.",
    date: '2026-07-13',
    readMinutes: 5,
    tags: ['Mobile', 'UX', 'Responsive'],
    gradient: 'from-brand/20 via-brand-2/15 to-brand-3/20',
    content: [
      { type: 'p', text: "Concevoir un site en pensant d'abord à l'ordinateur puis en \"l'adaptant\" au mobile est une erreur d'un autre temps. Aujourd'hui, la bonne approche est l'inverse : mobile-first." },
      { type: 'h', text: "Le mobile domine" },
      { type: 'p', text: "La majorité des visites viennent des smartphones. Google indexe même les sites en priorité selon leur version mobile. Ignorer le mobile, c'est ignorer la majorité de vos visiteurs et pénaliser votre référencement." },
      { type: 'h', text: "Ce que le mobile-first impose de bon" },
      { type: 'list', items: [
        "Aller à l'essentiel : le petit écran ne pardonne pas le superflu",
        "Des boutons assez grands pour le doigt",
        "Un contenu hiérarchisé, du plus important au moins important",
        "Des performances soignées (les mobiles ont des connexions variables)",
      ]},
      { type: 'h', text: "Le desktop vient ensuite" },
      { type: 'p', text: "Une fois l'expérience mobile solide, l'élargir au grand écran est facile : on ajoute de l'espace et des colonnes. L'inverse est bien plus douloureux." },
      { type: 'quote', text: "Concevoir mobile-first, c'est se forcer à l'essentiel. Et l'essentiel, c'est ce qui convertit." },
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
