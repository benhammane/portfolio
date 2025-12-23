import { ExternalLink, Github, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';
import { useLanguage } from '@/contexts/LanguageContext';

const ProjectsSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLanguage();

  const projects = [
    {
      title: t('projects.items.recipesSite.title'),
      description: t('projects.items.recipesSite.description'),
      techs: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      github: '#',
      demo: '#',
    },
    {
      title: t('projects.items.ecommerceSite.title'),
      description: t('projects.items.ecommerceSite.description'),
      techs: ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
      github: '#',
      demo: '#',
    },
    {
      title: t('projects.items.shmupGame.title'),
      description: t('projects.items.shmupGame.description'),
      techs: ['Java', 'LibGDX'],
      github: '#',
    },
    {
      title: t('projects.items.bikeRental.title'),
      description: t('projects.items.bikeRental.description'),
      techs: ['Java', 'MySQL', 'UML'],
      github: '#',
    },
    {
      title: t('projects.items.auctionApp.title'),
      description: t('projects.items.auctionApp.description'),
      techs: ['JavaScript', 'Node.js', 'socket.io', 'WebPack'],
      github: '#',
    },
    {
      title: t('projects.items.railroadInk.title'),
      description: t('projects.items.railroadInk.description'),
      techs: ['Java', 'Python', 'JavaScript', 'WebSocket'],
      github: '#',
    },
  ];

  return (
    <section id="projects" className="section-padding relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('projects.title')} <span className="text-gradient">{t('projects.titleHighlight')}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('projects.subtitle')}
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
