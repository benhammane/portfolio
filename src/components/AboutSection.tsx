import { Code, Palette, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';

const skills = [
  { icon: Code, label: 'Frontend', techs: 'React, Vue, TypeScript' },
  { icon: Zap, label: 'Backend', techs: 'Node.js, Python, SQL' },
  { icon: Palette, label: 'Design', techs: 'Figma, UI/UX' },
  { icon: Globe, label: 'DevOps', techs: 'Docker, AWS, CI/CD' },
];

const AboutSection = () => {
  const { playClick } = useClickSound();

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              À propos de <span className="text-gradient">moi</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                Étudiant en Master 1 Informatique (MIAGE), je me spécialise dans le développement web et la conception d'applications innovantes. Curieux, rigoureux et motivé, je recherche une alternance en développement pour approfondir mes compétences et contribuer activement à des projets concrets.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-muted-foreground leading-relaxed"
              >
                J'ai travaillé sur des projets variés : sites web (recettes, e-commerce), applications temps réel (enchères, chat), et jeux en Java. J'utilise des technologies telles que HTML, CSS, JavaScript, PHP (Laravel), MySQL, ainsi que des outils de design comme Figma.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground leading-relaxed"
              >
                Passionné par la qualité logicielle et la cybersécurité, je m'intéresse également aux architectures distribuées, à l'automatisation des tests et à l'expérience utilisateur.
              </motion.p>
            </div>
          </AnimatedSection>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.label} delay={0.3 + index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={playClick}
                  className="glass rounded-xl p-6 cursor-pointer group"
                >
                  <skill.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-semibold text-lg mb-2">{skill.label}</h3>
                  <p className="text-muted-foreground text-sm">{skill.techs}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
