import { motion } from 'framer-motion';
import { Sparkles, MousePointer2, Cpu, Eye } from 'lucide-react';
import { useLocale } from '@/lib/LocaleProvider';
import InteractiveRobot from '@/components/fx/InteractiveRobot';
import LedStage from '@/components/fx/LedStage';

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
              <span className="h-px w-8 bg-brand/60" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand">
                {t('robot_eyebrow')}
              </span>
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t('robot_title')}{' '}
              <span className="text-gradient-animated">{t('robot_highlight')}</span>
            </h2>

            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              {t('robot_sub')}
            </p>

            {/* Badges */}
            <div className="mt-7 flex flex-wrap gap-3">
              {badges.map(({ icon: Icon, key }) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm"
                >
                  <Icon size={15} className="text-brand" />
                  {t(key)}
                </span>
              ))}
            </div>

            {/* Indice d'interaction */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <MousePointer2 size={15} className="text-brand" />
              {t('robot_hint')}
            </motion.div>
          </motion.div>

          {/* Robot interactif */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[380px] w-full sm:h-[460px] lg:h-[560px]"
          >
            {/* halo derrière le robot */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-3/15 blur-[100px]" />
            {/* habillage LED — couche arrière */}
            <LedStage variant="back" />
            <InteractiveRobot className="h-full w-full" />
            {/* habillage LED — couche avant */}
            <LedStage variant="front" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RobotSection;
