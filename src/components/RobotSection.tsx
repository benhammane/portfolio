import { motion } from 'framer-motion';
import { Sparkles, MousePointer2, Cpu, Eye } from 'lucide-react';
import { useLocale } from '@/lib/LocaleProvider';
import InteractiveRobot from '@/components/fx/InteractiveRobot';

const RobotSection = () => {
  const { t } = useLocale();

  const badges = [
    { icon: Sparkles, key: 'robot_b1' },
    { icon: Cpu, key: 'robot_b2' },
    { icon: Eye, key: 'robot_b3' },
  ];

  return (
    <section id="innovation" className="section-padding relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
                {t('robot_eyebrow').split(' — ')[0]}
              </span>
              <span className="h-px w-10 bg-border" aria-hidden />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {t('robot_eyebrow').split(' — ')[1]}
              </span>
            </div>

            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[3.25rem] md:leading-[1.1]">
              {t('robot_title')}{' '}
              <span className="text-accent-brand">{t('robot_highlight')}</span>
            </h2>

            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              {t('robot_sub')}
            </p>

            {/* Badges */}
            <div className="mt-7 flex flex-wrap gap-3">
              {badges.map(({ icon: Icon, key }) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-2 rounded-full surface px-4 py-2 text-sm"
                >
                  <Icon size={15} className="text-brand" />
                  {t(key)}
                </span>
              ))}
            </div>

            {/* Indice d'interaction */}
            {/* Indice d'interaction : utile seulement là où la scène 3D est chargée (pointeur fin, >= md) */}
            <p className="mt-8 hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground md:inline-flex">
              <MousePointer2 size={14} className="text-brand" aria-hidden />
              {t('robot_hint')}
            </p>
          </motion.div>

          {/* Robot interactif */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[380px] w-full sm:h-[460px] lg:h-[560px]"
          >
            {/* Sol : ellipse d'ombre qui ancre le robot dans la page */}
            <div aria-hidden className="absolute inset-x-[18%] bottom-[6%] h-10 rounded-[100%] bg-brand/10 blur-2xl" />
            <InteractiveRobot className="h-full w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RobotSection;
