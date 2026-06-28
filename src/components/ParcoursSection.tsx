import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/LocaleProvider';
import SectionHeading from '@/components/fx/SectionHeading';

const parcours = [
  { step: '01', degree: 'L1 Informatique Mathématique', school: 'Université Picardie Jules Verne, Amiens' },
  { step: '02', degree: 'L2 Informatique', school: 'Université de Lille' },
  { step: '03', degree: 'L3 Informatique', school: 'Université de Lille' },
  { step: '04', degree: 'M1 MIAGE', school: 'Université de Lille' },
];

const ParcoursSection = () => {
  const { t } = useLocale();

  return (
    <section id="parcours" className="section-padding relative">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading
          eyebrow="06 — Formation"
          title="Mon"
          highlight="Parcours"
          subtitle={t('parcours_sub')}
        />

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {parcours.map((p, i) => (
            <motion.div
              key={p.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="group relative flex items-center gap-5 overflow-hidden rounded-2xl glass p-6"
            >
              {/* Numéro en filigrane */}
              <span className="pointer-events-none absolute -right-2 -top-4 font-display text-6xl font-bold text-brand/5 transition-colors group-hover:text-brand/10">
                {p.step}
              </span>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-transform group-hover:scale-110">
                <GraduationCap size={24} />
              </div>
              <div className="relative">
                <div className="font-mono text-xs text-brand">{p.step}</div>
                <div className="font-display font-semibold">{p.degree}</div>
                <div className="text-sm text-muted-foreground">{p.school}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParcoursSection;
