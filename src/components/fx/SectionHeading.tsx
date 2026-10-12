import { motion } from 'framer-motion';

interface SectionHeadingProps {
  /** petit label au-dessus (ex: "01 — Projets") : le numéro est séparé du libellé */
  eyebrow?: string;
  /** mots en couleur de texte */
  title: string;
  /** mot clé en couleur de marque (placé après le titre) */
  highlight?: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

const EASE = [0.22, 1, 0.36, 1] as const;

const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
}: SectionHeadingProps) => {
  const isCenter = align === 'center';
  // "01 — Profil" -> index "01" + libellé "Profil"
  const [index, label] = eyebrow?.includes(' — ') ? eyebrow.split(' — ') : [undefined, eyebrow];

  return (
    <div className={`mb-14 md:mb-16 ${isCenter ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] ${
            isCenter ? 'justify-center' : ''
          }`}
        >
          {index && <span className="text-brand">{index}</span>}
          {index && <span className="h-px w-10 bg-border" aria-hidden />}
          <span className="text-muted-foreground">{label}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
        className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[3.25rem] md:leading-[1.1]"
      >
        {title}{' '}
        {highlight && <span className="text-accent-brand">{highlight}</span>}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          className={`mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg ${
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
