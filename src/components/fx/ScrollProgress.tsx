import { motion, useScroll, useSpring } from 'framer-motion';

/** Barre de progression de lecture fixée en haut de page. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-brand-gradient"
    />
  );
};

export default ScrollProgress;
