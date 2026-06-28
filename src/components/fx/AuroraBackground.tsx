import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Fond global "aurora" :
 *  - blobs lumineux animés (CSS, GPU-friendly)
 *  - grille en fondu
 *  - champ de particules léger (canvas, plafonné en perf + reduced-motion safe)
 *  - grain subtil
 * Le tout en position fixed derrière toute l'app (z -10).
 */
const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];

    const buildParticles = () => {
      // densité modérée et plafonnée : perf 60fps même sur laptop modeste
      const isMobile = width < 768;
      const count = Math.min(isMobile ? 28 : 56, Math.floor((width * height) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.5 + 0.2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 240, 220, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base teinte */}
      <div className="absolute inset-0 bg-background" />

      {/* Blobs aurora */}
      <div className="absolute -top-1/4 left-1/4 h-[36rem] w-[36rem] rounded-full bg-brand/20 blur-[120px] animate-aurora-drift" />
      <div
        className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-brand-3/20 blur-[130px] animate-aurora-drift"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-brand-2/15 blur-[120px] animate-aurora-drift"
        style={{ animationDelay: '-12s' }}
      />

      {/* Grille */}
      <div className="absolute inset-0 bg-grid opacity-[0.5]" />

      {/* Particules */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      {/* Grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.025] mix-blend-soft-light" />

      {/* Vignette pour la lisibilité du texte */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,hsl(var(--background))_100%)]" />
    </div>
  );
};

export default AuroraBackground;
