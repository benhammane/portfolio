import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import photo from '@/assert/photoPORTFOLIO.jpeg';
import etooPoster from '@/assert/etoo-poster.webp';
import luxestatePoster from '@/assert/luxestate-poster.webp';

/**
 * Composition 3D de la Hero : le portrait au premier plan, deux vrais projets
 * (captures existantes) en profondeur. L'ensemble pivote légèrement avec le pointeur
 * et chaque plan se décale selon sa profondeur (parallaxe).
 *
 * Perf : 100 % transform CSS piloté par des MotionValues → aucun re-render React,
 * aucun canvas, aucun WebGL. L'écoute du pointeur n'est branchée que sur les
 * appareils à pointeur fin et hors prefers-reduced-motion ; sur mobile la
 * composition reste statique.
 */

interface Layer {
  depth: number; // décalage de parallaxe (px) à l'amplitude max du pointeur
  mx: MotionValue<number>;
  my: MotionValue<number>;
}

const useLayerOffset = ({ depth, mx, my }: Layer) => ({
  x: useTransform(mx, [-1, 1], [-depth, depth]),
  y: useTransform(my, [-1, 1], [-depth, depth]),
});

interface ProjectCardProps {
  src: string;
  title: string;
  label: string;
  className: string;
  offset: ReturnType<typeof useLayerOffset>;
  rotate: number;
}

const ProjectCard = ({ src, title, label, className, offset, rotate }: ProjectCardProps) => (
  <motion.a
    href="#projects"
    aria-label={`${label} : ${title}`}
    style={{ x: offset.x, y: offset.y, rotate }}
    className={`group absolute overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_30px_60px_-25px_rgba(0,0,0,0.75)] transition-[border-color] duration-300 hover:border-brand/50 ${className}`}
  >
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className="aspect-[16/10] w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
    />
    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2.5 pt-8 text-[11px] font-medium text-white">
      <span className="truncate">{title}</span>
      <ArrowUpRight size={13} className="shrink-0 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </span>
  </motion.a>
);

const HeroStage = ({ projectLabel, etooTitle, luxTitle }: { projectLabel: string; etooTitle: string; luxTitle: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  // Position normalisée du pointeur [-1, 1], lissée par un ressort
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 90, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 90, damping: 18, mass: 0.6 });

  const rotateY = useTransform(mx, [-1, 1], [-9, 9]);
  const rotateX = useTransform(my, [-1, 1], [7, -7]);

  const back = useLayerOffset({ depth: 22, mx, my });
  const mid = useLayerOffset({ depth: 12, mx, my });
  const front = useLayerOffset({ depth: -8, mx, my });

  useEffect(() => {
    if (prefersReduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // amplitude ramenée à [-1, 1] sur une zone 2x plus large que la scène
      const nx = ((e.clientX - (r.left + r.width / 2)) / r.width);
      const ny = ((e.clientY - (r.top + r.height / 2)) / r.height);
      rawX.set(Math.max(-1, Math.min(1, nx)));
      rawY.set(Math.max(-1, Math.min(1, ny)));
    };
    const reset = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', reset);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', reset);
    };
  }, [prefersReduced, rawX, rawY]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px]" style={{ perspective: 1400 }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative aspect-[4/5] w-full"
      >
        {/* Halo très discret derrière le portrait (une seule lueur, statique) */}
        <div aria-hidden className="absolute inset-[12%] rounded-full bg-brand/20 blur-[90px]" />

        <ProjectCard
          src={etooPoster}
          title={etooTitle}
          label={projectLabel}
          offset={back}
          rotate={5}
          className="-right-[26%] -top-[4%] w-[64%]"
        />
        <ProjectCard
          src={luxestatePoster}
          title={luxTitle}
          label={projectLabel}
          offset={mid}
          rotate={-4}
          className="-left-[16%] bottom-[6%] z-20 w-[62%]"
        />

        {/* Portrait */}
        <motion.figure
          style={{ x: front.x, y: front.y }}
          className="absolute left-[12%] top-[9%] z-10 w-[68%] overflow-hidden rounded-[1.75rem] border border-white/10 bg-card shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]"
        >
          <img
            src={photo}
            alt="Amine Benhammane"
            width={1024}
            height={1536}
            // @ts-expect-error -- React 18 ne connaît pas encore fetchPriority en camelCase, attribut DOM lowercase attendu
            fetchpriority="high"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
            style={{ objectPosition: '50% 18%' }}
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3.5 pt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
            Lille, France
          </figcaption>
        </motion.figure>
      </motion.div>
    </div>
  );
};

export default HeroStage;
