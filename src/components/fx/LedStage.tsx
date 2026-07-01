import { motion, useReducedMotion } from 'framer-motion';

/**
 * Habillage LED autour du robot (purement décoratif, pointer-events-none
 * pour ne pas bloquer le suivi du curseur par le robot).
 *  - variant "back"  : socle holographique + anneaux pulsants + faisceaux (derrière le robot)
 *  - variant "front" : particules LED montantes + coins HUD + indicateurs (devant le robot)
 */
const LedStage = ({ variant }: { variant: 'back' | 'front' }) => {
  const reduce = useReducedMotion();

  if (variant === 'back') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Faisceaux verticaux */}
        {[30, 70].map((x, i) => (
          <motion.div
            key={x}
            className="absolute top-0 h-full w-24 -translate-x-1/2 bg-gradient-to-b from-brand/10 via-brand/5 to-transparent blur-2xl"
            style={{ left: `${x}%` }}
            animate={reduce ? {} : { opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Socle holographique */}
        <div className="absolute bottom-10 left-1/2 h-24 w-[22rem] max-w-[90%] -translate-x-1/2">
          {/* lueur du sol */}
          <div className="absolute inset-x-0 bottom-0 h-16 rounded-[100%] bg-brand/30 blur-2xl" />
          {/* ellipse de base */}
          <div className="absolute inset-x-8 bottom-6 h-10 rounded-[100%] border border-brand/50 bg-brand/5" />
          {/* anneaux pulsants */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-x-4 bottom-2 h-16 rounded-[100%] border border-brand/40"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={reduce ? { scale: 1, opacity: 0.4 } : { scale: [0.6, 1.25], opacity: [0.6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'easeOut' }}
            />
          ))}
        </div>
      </div>
    );
  }

  // variant === 'front'
  const particles = Array.from({ length: 16 }, (_, i) => ({
    left: 8 + ((i * 37) % 84),
    delay: (i % 8) * 0.7,
    duration: 5 + (i % 5),
    size: i % 3 === 0 ? 3 : 2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Particules LED montantes */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand shadow-[0_0_8px_2px_hsl(var(--brand)/0.7)]"
          style={{ left: `${p.left}%`, bottom: '8%', width: p.size, height: p.size }}
          animate={reduce ? { opacity: 0.5 } : { y: [0, -260], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
        />
      ))}

      {/* Coins HUD */}
      {[
        'left-3 top-3 border-l-2 border-t-2',
        'right-3 top-3 border-r-2 border-t-2',
        'bottom-3 left-3 border-b-2 border-l-2',
        'bottom-3 right-3 border-b-2 border-r-2',
      ].map((pos, i) => (
        <motion.span
          key={pos}
          className={`absolute h-7 w-7 rounded-[3px] border-brand/50 ${pos}`}
          animate={reduce ? {} : { opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}

      {/* Indicateurs LED (HUD) */}
      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-background/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.7)]"
          animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        SYS · Online
      </div>
      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-background/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_6px_2px_hsl(var(--brand)/0.8)]"
          animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
        />
        AI · Active
      </div>
    </div>
  );
};

export default LedStage;
