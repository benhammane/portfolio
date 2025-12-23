import { Code, Palette, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLanguage();

  const skills = [
    { icon: Code, label: t('about.skills.frontend'), techs: t('about.skills.frontendTechs') },
    { icon: Zap, label: t('about.skills.backend'), techs: t('about.skills.backendTechs') },
    { icon: Palette, label: t('about.skills.design'), techs: t('about.skills.designTechs') },
    { icon: Globe, label: t('about.skills.devops'), techs: t('about.skills.devopsTechs') },
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
