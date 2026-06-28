import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  /** distance du décalage initial en px */
  distance?: number;
  once?: boolean;
}

const offset = (dir: Direction, d: number) => {
  switch (dir) {
    case 'up': return { y: d };
    case 'down': return { y: -d };
    case 'left': return { x: d };
    case 'right': return { x: -d };
    default: return {};
  }
};

/** Reveal au scroll : fade + slide, courbe "premium" (easeOutQuint). */
const Reveal = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 40,
  once = true,
}: RevealProps) => {
  const variants: Variants = {
    hidden: { opacity: 0, filter: 'blur(6px)', ...offset(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Variantes utilitaires pour les conteneurs en stagger. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default Reveal;
