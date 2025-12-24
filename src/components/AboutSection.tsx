import { Code, Palette, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { playClick } = useClickSound();
  const { t } = useTranslation();

  const skills = [
    { icon: Code, labelKey: 'about.skills.frontend.label', techsKey: 'about.skills.frontend.techs' },
    { icon: Zap, labelKey: 'about.skills.backend.label', techsKey: 'about.skills.backend.techs' },
    { icon: Palette, labelKey: 'about.skills.design.label', techsKey: 'about.skills.design.techs' },
    { icon: Globe, labelKey: 'about.skills.devops.label', techsKey: 'about.skills.devops.techs' },
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('about.title')} <span className="text-gradient">{t('about.titleHighlight')}</span>
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
                {t('about.paragraph1')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-muted-foreground leading-relaxed"
              >
                {t('about.paragraph2')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground leading-relaxed"
              >
                {t('about.paragraph3')}
              </motion.p>
            </div>
          </AnimatedSection>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.labelKey} delay={0.3 + index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={playClick}
                  className="glass rounded-xl p-6 cursor-pointer group"
                >
                  <skill.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-semibold text-lg mb-2">{t(skill.labelKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(skill.techsKey)}</p>
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
