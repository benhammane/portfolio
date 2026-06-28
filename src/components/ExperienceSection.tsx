import { Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClickSound } from '@/hooks/useClickSound';
import { useLocale } from '@/lib/LocaleProvider';
import SectionHeading from '@/components/fx/SectionHeading';

const experiences = [
  { titleKey: 'exp_frontend_title', companyKey: 'exp_frontend_company', periodKey: 'exp_frontend_period', descKey: 'exp_frontend_desc', highlights: ['exp_frontend_h1', 'exp_frontend_h2', 'exp_frontend_h3'] },
  { titleKey: 'exp_web_title', companyKey: 'exp_web_company', periodKey: 'exp_web_period', descKey: 'exp_web_desc', highlights: ['exp_web_h1', 'exp_web_h2', 'exp_web_h3'] },
  { titleKey: 'exp_crepes_title', companyKey: 'exp_crepes_company', periodKey: 'exp_crepes_period', descKey: 'exp_crepes_desc', highlights: ['exp_crepes_h1', 'exp_crepes_h2', 'exp_crepes_h3'] },
  { titleKey: 'exp_magasinier_title', companyKey: 'exp_magasinier_company', periodKey: 'exp_magasinier_period', descKey: 'exp_magasinier_desc', highlights: ['exp_magasinier_h1', 'exp_magasinier_h2', 'exp_magasinier_h3'] },
  { titleKey: 'exp_snack_title', companyKey: 'exp_snack_company', periodKey: 'exp_snack_period', descKey: 'exp_snack_desc', highlights: ['exp_snack_h1', 'exp_snack_h2', 'exp_snack_h3'] },
  { titleKey: 'exp_uber_title', companyKey: 'exp_uber_company', periodKey: 'exp_uber_period', descKey: 'exp_uber_desc', highlights: ['exp_uber_h1', 'exp_uber_h2', 'exp_uber_h3'] },
  { titleKey: 'exp_security_title', companyKey: 'exp_security_company', periodKey: 'exp_security_period', descKey: 'exp_security_desc', highlights: ['exp_security_h1', 'exp_security_h2', 'exp_security_h3'] },
  { titleKey: 'exp_rgis_title', companyKey: 'exp_rgis_company', periodKey: 'exp_rgis_period', descKey: 'exp_rgis_desc', highlights: ['exp_rgis_h1', 'exp_rgis_h2', 'exp_rgis_h3'] },
];

const ExperienceSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();

  return (
    <section id="experience" className="section-padding relative">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading
          eyebrow="05 — Parcours pro"
          title="Mes"
          highlight="Expériences"
          subtitle={t('experience_sub')}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Ligne verticale */}
          <div className="absolute left-[15px] top-2 h-full w-px bg-gradient-to-b from-brand via-brand/40 to-transparent md:left-[19px]" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.titleKey}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12 md:pl-16"
              >
                {/* Point */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 + 0.1, type: 'spring' }}
                  className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/40 md:h-10 md:w-10"
                >
                  <Briefcase size={14} className="text-brand" />
                </motion.div>

                <motion.div
                  whileHover={{ x: 6 }}
                  onClick={playClick}
                  className="card-spotlight cursor-pointer rounded-2xl glass p-6"
                  onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const r = el.getBoundingClientRect();
                    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
                    el.style.setProperty('--my', `${e.clientY - r.top}px`);
                  }}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-semibold">{t(exp.titleKey)}</h3>
                    <span className="font-medium text-brand">{t(exp.companyKey)}</span>
                  </div>
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-secondary/60 px-2.5 py-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    {t(exp.periodKey)}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{t(exp.descKey)}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-border/50 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {t(h)}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
