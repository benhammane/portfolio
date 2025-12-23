import { Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';
import { useLanguage } from '@/contexts/LanguageContext';

const ExperienceSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLanguage();

  const experiences = [
    {
      title: t('experience.items.techLink.title'),
      company: t('experience.items.techLink.company'),
      period: t('experience.items.techLink.period'),
      description: t('experience.items.techLink.description'),
      highlights: t('experience.items.techLink.highlights'),
    },
    {
      title: t('experience.items.marocville.title'),
      company: t('experience.items.marocville.company'),
      period: t('experience.items.marocville.period'),
      description: t('experience.items.marocville.description'),
      highlights: t('experience.items.marocville.highlights'),
    },
    {
      title: t('experience.items.crepesCorner.title'),
      company: t('experience.items.crepesCorner.company'),
      period: t('experience.items.crepesCorner.period'),
      description: t('experience.items.crepesCorner.description'),
      highlights: t('experience.items.crepesCorner.highlights'),
    },
    {
      title: t('experience.items.marocvilleMagasinier.title'),
      company: t('experience.items.marocvilleMagasinier.company'),
      period: t('experience.items.marocvilleMagasinier.period'),
      description: t('experience.items.marocvilleMagasinier.description'),
      highlights: t('experience.items.marocvilleMagasinier.highlights'),
    },
    {
      title: t('experience.items.snackOMimosas.title'),
      company: t('experience.items.snackOMimosas.company'),
      period: t('experience.items.snackOMimosas.period'),
      description: t('experience.items.snackOMimosas.description'),
      highlights: t('experience.items.snackOMimosas.highlights'),
    },
    {
      title: t('experience.items.uberEats.title'),
      company: t('experience.items.uberEats.company'),
      period: t('experience.items.uberEats.period'),
      description: t('experience.items.uberEats.description'),
      highlights: t('experience.items.uberEats.highlights'),
    },
    {
      title: t('experience.items.securityAgent.title'),
      company: t('experience.items.securityAgent.company'),
      period: t('experience.items.securityAgent.period'),
      description: t('experience.items.securityAgent.description'),
      highlights: t('experience.items.securityAgent.highlights'),
    },
    {
      title: t('experience.items.rgis.title'),
      company: t('experience.items.rgis.company'),
      period: t('experience.items.rgis.period'),
      description: t('experience.items.rgis.description'),
      highlights: t('experience.items.rgis.highlights'),
    },
  ];

  return (
    <section id="experience" className="section-padding relative">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('experience.title')} <span className="text-gradient">{t('experience.titleHighlight')}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('experience.subtitle')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full mt-4" />
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <div className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline line */}
                {index !== experiences.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="absolute left-[11px] top-10 w-0.5 bg-gradient-to-b from-primary to-transparent"
                  />
                )}

                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center glow-sm"
                >
                  <Briefcase size={12} className="text-primary-foreground" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.995 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={playClick}
                  className="glass rounded-xl p-6 ml-4 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <h3 className="font-display font-semibold text-xl">{exp.title}</h3>
                    <span className="text-primary font-medium">{exp.company}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <Calendar size={14} />
                    {exp.period}
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
