import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

const NAME = 'AMINE BENHAMMANE';

/**
 * Intro élégante : compteur 0→100, reveal du nom lettre par lettre,
 * puis "rideau" qui se lève pour révéler la page.
 */
const Preloader = ({ onComplete }: PreloaderProps) => {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setCount(100);
      setDone(true);
      onComplete?.();
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo pour une montée "premium"
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [prefersReduced, onComplete]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* halo */}
          <div className="absolute h-[28rem] w-[28rem] rounded-full bg-brand/15 blur-[120px]" />

          {/* Nom révélé lettre par lettre */}
          <div className="relative mb-8 flex flex-wrap justify-center px-6">
            {NAME.split('').map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: char === ' ' ? 0 : 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: [0.22, 0.9, 0.24, 1] }}
                className="font-display text-2xl font-bold tracking-[0.25em] text-foreground sm:text-4xl"
              >
                {char === ' ' ? '  ' : char}
              </motion.span>
            ))}
          </div>

          {/* Barre de chargement */}
          <div className="relative h-px w-56 overflow-hidden bg-border sm:w-72">
            <motion.div
              className="absolute inset-y-0 left-0 bg-brand-gradient"
              style={{ width: `${count}%` }}
            />
          </div>

          {/* Compteur */}
          <div className="mt-4 font-mono text-sm tabular-nums text-muted-foreground">
            {String(count).padStart(3, '0')}
            <span className="text-brand"> %</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
