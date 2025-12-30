import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';

// Import project images
import foodixImg from '@/assert/foodix.png';
import jesmoniteImg from '@/assert/jesmoniteEcommerce.jpeg';
import jeuTirImg from '@/assert/jeuTIR.png';
import vlilleImg from '@/assert/Vlille.png';
import kanbanImg from '@/assert/Kanban.png';
import defiGoImg from '@/assert/DefiGO.jpeg';
import bubbletiImg from '@/assert/BubbletiMA.png';
import bubbleJeuImg from '@/assert/BubbleJEU.png';

const projects = [
  {
    title: 'Site de partage de recettes',
    description: "Développement d'un site de partage de recettes avec interface interactive et gestion des utilisateurs.",
    techs: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    github: '#',
    demo: '#',
    image: foodixImg,
  },
  {
    title: 'Site e-commerce',
    description: "Conception d'une boutique en ligne avec gestion des transactions, utilisateurs et catalogue.",
    techs: ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
    github: '#',
    demo: '#',
    image: jesmoniteImg,
  },
  {
    title: 'Jeu vidéo (shmup)',
    description: "Conception et programmation d'un jeu de type shoot-em-up en Java.",
    techs: ['Java', 'LibGDX'],
    github: '#',
    image: jeuTirImg,
  },
  {
    title: 'Système de location de vélos',
    description: "Système autonome de location de vélos avec gestion des stations et des locations.",
    techs: ['Java', 'MySQL', 'UML'],
    github: '#',
    image: vlilleImg,
  },
  {
    title: "Application d'enchères en temps réel",
    description: "Application d'enchères en temps réel avec communication via WebSocket et backend Node.js.",
    techs: ['JavaScript', 'Node.js', 'socket.io', 'WebPack'],
    github: '#',
  },
  {
    title: 'Railroad Ink (numérique)',
    description: "Version numérique du jeu multijoueur, gestion réseau et interface interactive.",
    techs: ['Java', 'Python', 'JavaScript', 'WebSocket'],
    github: '#',
  },
  {
    title: 'Kanban',
    description: "Outil visuel de gestion des tâches et du flux de travail sous forme de tableau Kanban. Les tâches sont représentées par des cartes organisées en colonnes (À faire, En cours, Terminé) et déplacées selon leur avancement.",
    techs: ['JavaScript', 'HTML', 'CSS'],
    github: '#',
    demo: '#',
    image: kanbanImg,
  },
  {
    title: 'Defi Go',
    description: "Jeu Android développé avec App Inventor 2 visant à encourager les utilisateurs à se dépasser quotidiennement. Le jeu propose des défis aléatoires (mémoire, tir, flappy bird, énigmes, calcul). Plus le joueur réussit de défis, plus son score augmente et des badges sont débloqués.",
    techs: ['App Inventor 2', 'Android'],
    github: '#',
    image: defiGoImg,
  },
  {
    title: 'Bubbleti',
    description: "Système de prise de commande pour salon de bubble tea. Les clients peuvent commander et payer via une borne ou directement à la caisse. Le système inclut également un écran d'affichage indiquant l'état des commandes (en cours / prêtes).",
    techs: ['JavaScript', 'Node.js', 'MySQL'],
    github: '#',
    image: bubbletiImg,
  },
  {
    title: 'Bubbule',
    description: "Jeu inspiré de Talking Tom dans lequel l'utilisateur interagit avec un dragon virtuel : le nourrir, le laver, l'emmener aux toilettes, le faire dormir et jouer à des mini-jeux. Les points gagnés permettent d'acheter des accessoires pour personnaliser le dragon.",
    techs: ['Game Design', 'JavaScript'],
    github: '#',
    image: bubbleJeuImg,
  },
];

const ProjectsSection = () => {
  const { playClick } = useClickSound();

  return (
    <section id="projects" className="section-padding relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Mes <span className="text-gradient">Projets</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une sélection de projets sur lesquels j'ai travaillé, démontrant mes compétences
              en développement full-stack et ma passion pour la création.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full mt-4" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-2xl overflow-hidden h-full group cursor-pointer hover-lift glow-sm ring-1 ring-primary/10 flex flex-col"
                onClick={playClick}
              >
                {/* Project Image */}
                {project.image ? (
                  <div className="relative overflow-hidden h-48">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-cyan-400/20 flex items-center justify-center">
                    <span className="text-6xl opacity-30">🚀</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-semibold text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 ml-2 shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          onClick={(e) => { e.stopPropagation(); playClick(); }}
                          className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-primary/10"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          onClick={(e) => { e.stopPropagation(); playClick(); }}
                          className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-primary/10"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
