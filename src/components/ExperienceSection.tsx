import { Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';
import { useTranslation } from 'react-i18next';

const ExperienceSection = () => {
  const { playClick } = useClickSound();
  const { t } = useTranslation();

  const experienceCount = 8; // Number of experiences in translation file

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
          {Array.from({ length: experienceCount }).map((_, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <div className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline line */}
                {index !== experienceCount - 1 && (
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
                    <h3 className="font-display font-semibold text-xl">{t(`experience.list.${index}.title`)}</h3>
                    <span className="text-primary font-medium">{t(`experience.list.${index}.company`)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <Calendar size={14} />
                    {t(`experience.list.${index}.period`)}
                  </div>

                  <p className="text-muted-foreground mb-4">{t(`experience.list.${index}.description`)}</p>

                  <div className="flex flex-wrap gap-2">
                    {(t(`experience.list.${index}.highlights`, { returnObjects: true }) as string[]).map((highlight) => (
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
