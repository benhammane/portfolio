import { motion } from 'framer-motion';

interface SectionHeadingProps {
  /** petit label au-dessus (ex: "01 — Projets") */
  eyebrow?: string;
  /** mots en blanc */
  title: string;
  /** mots en dégradé (placés après le titre) */
  highlight?: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
}: SectionHeadingProps) => {
  const isCenter = align === 'center';
  return (
    <div className={`mb-16 ${isCenter ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mb-4 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}
        >
          <span className="h-px w-8 bg-brand/60" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-brand/60" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
      >
        {title}{' '}
        {highlight && <span className="text-gradient-animated">{highlight}</span>}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={`mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
