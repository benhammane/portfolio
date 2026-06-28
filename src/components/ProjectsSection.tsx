import { ArrowUpRight, Github } from 'lucide-react';
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

const projects = [
  {
    title: 'Site de partage de recettes',
    description: "Site de partage de recettes avec interface interactive et gestion des utilisateurs.",
    techs: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    github: '#', demo: '#', image: foodixImg, featured: true,
  },
  {
    title: 'Site e-commerce',
    description: "Boutique en ligne avec gestion des transactions, utilisateurs et catalogue.",
    techs: ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
    github: '#', demo: '#', image: jesmoniteImg, featured: true,
  },
  {
    title: 'Jeu vidéo (shmup)',
    description: "Conception et programmation d'un jeu de type shoot-em-up en Java.",
    techs: ['Java', 'LibGDX'], github: '#', image: jeuTirImg,
  },
  {
    title: 'Système de location de vélos',
    description: "Système autonome de location de vélos avec gestion des stations et des locations.",
    techs: ['Java', 'MySQL', 'UML'], github: '#', image: vlilleImg,
  },
  {
    title: "Application d'enchères en temps réel",
    description: "Enchères temps réel via WebSocket avec backend Node.js.",
    techs: ['JavaScript', 'Node.js', 'socket.io', 'WebPack'], github: '#', image: venteEnchereImg,
  },
  {
    title: 'Railroad Ink (numérique)',
    description: "Version numérique du jeu multijoueur, gestion réseau et interface interactive.",
    techs: ['Java', 'Python', 'JavaScript', 'WebSocket'], github: '#', image: railroadImg,
  },
  {
    title: 'Kanban',
    description: "Tableau de gestion des tâches avec cartes déplaçables (À faire, En cours, Terminé).",
    techs: ['JavaScript', 'HTML', 'CSS'], github: '#', demo: '#', image: kanbanImg,
  },
  {
    title: 'Defi Go',
    description: "Jeu Android (App Inventor 2) à défis aléatoires quotidiens : mémoire, tir, énigmes, calcul.",
    techs: ['App Inventor 2', 'Android'], github: '#', image: defiGoImg,
  },
  {
    title: 'Bubbleti',
    description: "Système de commande pour salon de bubble tea : borne, paiement et affichage des commandes.",
    techs: ['JavaScript', 'Node.js', 'MySQL'], github: '#', image: bubbletiImg,
  },
  {
    title: 'Bubbule',
    description: "Jeu façon Talking Tom : nourrir, laver et faire jouer un dragon virtuel avec des mini-jeux.",
    techs: ['Game Design', 'JavaScript'], github: '#', image: bubbleJeuImg,
  },
];

const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const ProjectsSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();

  return (
    <section id="projects" className="section-padding relative">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading
          eyebrow="04 — Portfolio"
          title="Mes"
          highlight="Projets"
          subtitle={t('projects_sub')}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={staggerItem}
              onMouseMove={handleSpotlight}
              onClick={playClick}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`card-spotlight group flex cursor-pointer flex-col overflow-hidden rounded-3xl glass ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                {/* Actions au survol */}
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  {project.github && (
                    <a
                      href={project.github}
                      aria-label="Code source"
                      onClick={(e) => { e.stopPropagation(); playClick(); }}
                      className="rounded-full bg-background/80 p-2.5 text-foreground backdrop-blur-md transition-colors hover:bg-brand hover:text-primary-foreground"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      aria-label="Démo"
                      onClick={(e) => { e.stopPropagation(); playClick(); }}
                      className="rounded-full bg-background/80 p-2.5 text-foreground backdrop-blur-md transition-colors hover:bg-brand hover:text-primary-foreground"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Contenu */}
              <div className="flex flex-grow flex-col p-6">
                <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-brand">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-grow text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
