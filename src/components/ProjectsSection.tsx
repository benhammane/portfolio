import { ExternalLink, Github, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';

const projects = [
  {
    title: 'Site de partage de recettes',
    description: "Développement d'un site de partage de recettes avec interface interactive et gestion des utilisateurs.",
    techs: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Site e-commerce',
    description: "Conception d'une boutique en ligne avec gestion des transactions, utilisateurs et catalogue.",
    techs: ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Jeu vidéo (shmup)',
    description: 'Conception et programmation d\'un jeu de type shoot \u2013 em up en Java.',
    techs: ['Java', 'LibGDX'],
    github: '#',
  },
  {
    title: 'Système de location de vélos',
    description: "Système autonome de location de vélos avec gestion des stations et des locations.",
    techs: ['Java', 'MySQL', 'UML'],
    github: '#',
  },
  {
    title: 'Application d\'enchères en temps réel',
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
  description:
    "Outil visuel de gestion des tâches et du flux de travail sous forme de tableau Kanban. Les tâches sont représentées par des cartes organisées en colonnes (À faire, En cours, Terminé) et déplacées selon leur avancement.",
  techs: ['JavaScript', 'HTML', 'CSS'],
  github: '#',
  demo: '#',
},
{
  title: 'Defi Go',
  description:
    "Jeu Android développé avec App Inventor 2 visant à encourager les utilisateurs à se dépasser quotidiennement. Le jeu propose des défis aléatoires (mémoire, tir, flappy bird, énigmes, calcul). Plus le joueur réussit de défis, plus son score augmente et des badges sont débloqués.",
  techs: ['App Inventor 2', 'Android'],
  github: '#',
},
{
  title: 'Bubbleti',
  description:
    "Système de prise de commande pour salon de bubble tea. Les clients peuvent commander et payer via une borne ou directement à la caisse. Le système inclut également un écran d’affichage indiquant l’état des commandes (en cours / prêtes).",
  techs: ['JavaScript', 'Node.js', 'MySQL'],
  github: '#',
},
{
  title: 'Bubbule',
  description:
    "Jeu inspiré de Talking Tom dans lequel l’utilisateur interagit avec un dragon virtuel : le nourrir, le laver, l’emmener aux toilettes, le faire dormir et jouer à des mini-jeux. Les points gagnés permettent d’acheter des accessoires pour personnaliser le dragon.",
  techs: ['Game Design', 'JavaScript'],
  github: '#',
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-xl p-6 h-full group cursor-pointer hover-lift glow-sm ring-1 ring-primary/10"
                onClick={playClick}
              >
                <div className="flex items-start justify-between mb-4">
                  <Folder className="w-10 h-10 text-primary" />
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        onClick={(e) => { e.stopPropagation(); playClick(); }}
                        className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover-lift"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        onClick={(e) => { e.stopPropagation(); playClick(); }}
                        className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover-lift"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
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
