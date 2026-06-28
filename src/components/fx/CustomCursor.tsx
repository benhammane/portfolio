import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Curseur custom premium :
 *  - point central précis (suit instantanément)
 *  - anneau "spring" qui suit avec inertie
 *  - grossit / s'illumine au survol des éléments interactifs
 * Désactivé sur écrans tactiles / pointeur grossier.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 380, damping: 30, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 380, damping: 30, mass: 0.6 });

  const enabledRef = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    enabledRef.current = true;
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setHidden(false);
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest(
        'a, button, [role="button"], input, textarea, select, label, .cursor-pointer'
      );
      setHovering(Boolean(interactive));
    };
    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Anneau */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-brand/70 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: hidden ? 0 : hovering ? 0.9 : 0.55,
          backgroundColor: hovering ? 'hsl(var(--brand) / 0.12)' : 'hsl(var(--brand) / 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
      {/* Point */}
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-brand"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};

export default CustomCursor;
