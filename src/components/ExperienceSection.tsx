import { Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';
import { useLocale } from '@/lib/LocaleProvider';

const ExperienceSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();

  const experiences = [
    {
      titleKey: 'exp_frontend_title',
      companyKey: 'exp_frontend_company',
      periodKey: 'exp_frontend_period',
      descKey: 'exp_frontend_desc',
      highlights: ['exp_frontend_h1', 'exp_frontend_h2', 'exp_frontend_h3'],
    },
    {
      titleKey: 'exp_web_title',
      companyKey: 'exp_web_company',
      periodKey: 'exp_web_period',
      descKey: 'exp_web_desc',
      highlights: ['exp_web_h1', 'exp_web_h2', 'exp_web_h3'],
    },
    {
      titleKey: 'exp_crepes_title',
      companyKey: 'exp_crepes_company',
      periodKey: 'exp_crepes_period',
      descKey: 'exp_crepes_desc',
      highlights: ['exp_crepes_h1', 'exp_crepes_h2', 'exp_crepes_h3'],
    },
    {
      titleKey: 'exp_magasinier_title',
      companyKey: 'exp_magasinier_company',
      periodKey: 'exp_magasinier_period',
      descKey: 'exp_magasinier_desc',
      highlights: ['exp_magasinier_h1', 'exp_magasinier_h2', 'exp_magasinier_h3'],
    },
    {
      titleKey: 'exp_snack_title',
      companyKey: 'exp_snack_company',
      periodKey: 'exp_snack_period',
      descKey: 'exp_snack_desc',
      highlights: ['exp_snack_h1', 'exp_snack_h2', 'exp_snack_h3'],
    },
    {
      titleKey: 'exp_uber_title',
      companyKey: 'exp_uber_company',
      periodKey: 'exp_uber_period',
      descKey: 'exp_uber_desc',
      highlights: ['exp_uber_h1', 'exp_uber_h2', 'exp_uber_h3'],
    },
    {
      titleKey: 'exp_security_title',
      companyKey: 'exp_security_company',
      periodKey: 'exp_security_period',
      descKey: 'exp_security_desc',
      highlights: ['exp_security_h1', 'exp_security_h2', 'exp_security_h3'],
    },
    {
      titleKey: 'exp_rgis_title',
      companyKey: 'exp_rgis_company',
      periodKey: 'exp_rgis_period',
      descKey: 'exp_rgis_desc',
      highlights: ['exp_rgis_h1', 'exp_rgis_h2', 'exp_rgis_h3'],
    },
  ];

  return (
    <section id="experience" className="section-padding relative">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('experience_title').split(' ')[0]} <span className="text-gradient">{t('experience_title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('experience_sub')}
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
                    <h3 className="font-display font-semibold text-xl">{t(exp.titleKey)}</h3>
                    <span className="text-primary font-medium">{t(exp.companyKey)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <Calendar size={14} />
                    {t(exp.periodKey)}
                  </div>

                  <p className="text-muted-foreground mb-4">{t(exp.descKey)}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlightKey) => (
                      <span
                        key={highlightKey}
                        className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                      >
                        {t(highlightKey)}
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
