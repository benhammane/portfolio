import { ArrowUpRight, Github, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClickSound } from '@/hooks/useClickSound';
import { useLocale } from '@/lib/LocaleProvider';
import SectionHeading from '@/components/fx/SectionHeading';
import { staggerContainer, staggerItem } from '@/components/fx/Reveal';

// Project images
import foodixImg from '@/assert/foodix.png';
import jesmoniteImg from '@/assert/jesmoniteEcommerce.jpeg';
import jeuTirImg from '@/assert/jeuTIR.png';
import vlilleImg from '@/assert/Vlille.png';
import kanbanImg from '@/assert/Kanban.png';
import defiGoImg from '@/assert/DefiGO.jpeg';
import bubbletiImg from '@/assert/BubbletiMA.png';
import bubbleJeuImg from '@/assert/BubbleJEU.png';
import venteEnchereImg from '@/assert/venteEnchere.png';
import railroadImg from '@/assert/railroad2.png';

const GITHUB = 'https://github.com/benhammane';

interface Featured {
  title: string;
  category: string;
  year: string;
  description: string;
  callout: string;
  highlights: string[];
  techs: string[];
  image: string;
  url?: string; // lien démo réel (sinon → GitHub)
  domain: string; // affiché dans la barre du mockup
}

// ⭐ 4 projets vedettes (mets à jour `url` avec tes vrais liens de démo)
const featured: Featured[] = [
  {
    title: 'Site e-commerce',
    category: 'Site e-commerce · Full-Stack',
    year: '2022',
    description:
      "Boutique en ligne complète pour la vente de produits : catalogue, panier, gestion des commandes, des utilisateurs et back-office administrateur.",
    callout: 'Une boutique clé en main, du catalogue au paiement, avec un espace admin pour tout piloter.',
    highlights: ['Catalogue produits', 'Panier & commandes', 'Espace utilisateur', 'Back-office admin'],
    techs: ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
    image: jesmoniteImg,
    domain: 'e-commerce.demo',
  },
  {
    title: "Application d'enchères en temps réel",
    category: 'Temps réel · WebSocket',
    year: '2023',
    description:
      "Plateforme d'enchères où chaque offre se met à jour instantanément pour tous les participants, sans rechargement, grâce aux WebSockets.",
    callout: 'Des enchères qui se mettent à jour en direct pour tous les participants, en temps réel.',
    highlights: ['Enchères en direct', 'Backend Node.js', 'Multi-utilisateurs', 'Notifications live'],
    techs: ['JavaScript', 'Node.js', 'socket.io', 'WebPack'],
    image: venteEnchereImg,
    domain: 'encheres.demo',
  },
  {
    title: 'Bubbleti',
    category: 'Système de commande · Full-Stack',
    year: '2024',
    description:
      "Système complet de prise de commande pour un salon de bubble tea : commande en borne ou en caisse, paiement, et écran d'affichage de l'état des commandes en temps réel.",
    callout: 'De la commande à la préparation : un flux complet pensé pour un vrai commerce.',
    highlights: ['Commande en borne', 'Paiement intégré', "Écran d'état des commandes", 'Base de données MySQL'],
    techs: ['JavaScript', 'Node.js', 'MySQL'],
    image: bubbletiImg,
    domain: 'bubbleti.demo',
  },
  {
    title: 'Site de partage de recettes',
    category: 'Plateforme communautaire · Full-Stack',
    year: '2021',
    description:
      "Plateforme sociale permettant de publier, rechercher et gérer des recettes de cuisine, avec une interface interactive et une gestion des utilisateurs.",
    callout: 'Une communauté autour de la cuisine : publier, chercher et partager ses recettes.',
    highlights: ['Publication de recettes', 'Recherche & filtres', 'Gestion des utilisateurs', 'Interface interactive'],
    techs: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    image: foodixImg,
    domain: 'recettes.demo',
  },
];

// Autres réalisations (grille compacte)
const others = [
  { title: 'Jeu vidéo (shmup)', description: "Shoot-em-up conçu et programmé en Java.", techs: ['Java', 'LibGDX'], image: jeuTirImg },
  { title: 'Système de location de vélos', description: 'Gestion autonome des stations et des locations.', techs: ['Java', 'MySQL', 'UML'], image: vlilleImg },
  { title: 'Railroad Ink (numérique)', description: 'Version numérique multijoueur avec gestion réseau.', techs: ['Java', 'Python', 'WebSocket'], image: railroadImg },
  { title: 'Kanban', description: 'Tableau de gestion des tâches avec cartes déplaçables.', techs: ['JavaScript', 'HTML', 'CSS'], image: kanbanImg },
  { title: 'Defi Go', description: 'Jeu Android à défis quotidiens (App Inventor 2).', techs: ['App Inventor 2', 'Android'], image: defiGoImg },
  { title: 'Bubbule', description: "Jeu façon Talking Tom avec un dragon virtuel et des mini-jeux.", techs: ['Game Design', 'JavaScript'], image: bubbleJeuImg },
];

/** Cadre navigateur contenant la capture du projet. */
const ProjectFrame = ({ image, domain, alt }: { image: string; domain: string; alt: string }) => (
  <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-2xl">
    <div className="flex items-center gap-2 border-b border-border/60 bg-background/60 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-red-400/70" />
      <span className="h-3 w-3 rounded-full bg-amber-400/70" />
      <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
      <div className="ml-3 flex-1 truncate rounded-md bg-secondary/70 px-3 py-1 text-center text-[11px] text-muted-foreground">
        {domain}
      </div>
    </div>
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
    </div>
  </div>
);

const FeaturedProject = ({ project, index }: { project: Featured; index: number }) => {
  const { playClick } = useClickSound();
  const link = project.url || GITHUB;
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      {/* Texte */}
      <div className={reversed ? 'lg:order-2' : 'lg:order-1'}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs text-brand">
            {project.category}
          </span>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>

        <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h3>

        <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

        {/* Encadré résultat */}
        <div className="mt-5 border-l-2 border-brand pl-4">
          <p className="font-medium text-foreground/90">{project.callout}</p>
        </div>

        {/* Points forts */}
        <div className="mt-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Points forts</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-sm">
                <Check size={15} className="shrink-0 text-brand" />
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* Technos */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <span key={tech} className="rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          className="mt-8 inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium transition-smooth hover:bg-brand/10 hover:text-brand"
        >
          {project.url ? 'Voir le site' : 'Voir sur GitHub'}
          <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Mockup */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={playClick}
        className={`block ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
        aria-label={project.title}
      >
        <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          <ProjectFrame image={project.image} domain={project.domain} alt={project.title} />
        </motion.div>
      </a>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading eyebrow="04 — Portfolio" title="Mes" highlight="Projets" subtitle={t('projects_sub')} />

        {/* Projets vedettes */}
        <div className="space-y-20 md:space-y-28">
          {featured.map((p, i) => (
            <FeaturedProject key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Autres réalisations */}
        <div className="mt-24">
          <div className="mb-10 flex items-center gap-4">
            <h3 className="font-display text-xl font-semibold">Autres réalisations</h3>
            <span className="h-px flex-1 bg-border/60" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {others.map((project) => (
              <motion.a
                key={project.title}
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                variants={staggerItem}
                onClick={playClick}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group flex flex-col overflow-hidden rounded-3xl glass"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute right-3 top-3 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                    <Github size={15} />
                  </div>
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <h4 className="font-display font-semibold transition-colors group-hover:text-brand">{project.title}</h4>
                  <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <span key={tech} className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
