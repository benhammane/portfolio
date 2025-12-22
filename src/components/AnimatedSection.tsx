import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

const AnimatedSection = ({ children, className = '', delay = 0, stagger = false }: AnimatedSectionProps) => {
  const { ref, isInView } = useScrollAnimation();

  const parentVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      ref={ref}
      variants={parentVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={stagger ? { duration: 0.6, delay, ease: 'easeOut', staggerChildren: 0.08 } : { duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
