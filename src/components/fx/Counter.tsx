import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

/** Compte de 0 → `to` quand l'élément entre dans le viewport. */
const Counter = ({ to, suffix = '', prefix = '', duration = 1.6 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  // Déclenche à l'entrée dans le viewport, MAIS avec un filet de sécurité : si le
  // compteur n'y entre jamais (ex. sous la ligne de flottaison du hero sur petit
  // écran, visiteur qui ne scrolle pas), on lance quand même l'animation ~1,2 s
  // après le montage pour ne jamais rester bloqué à « 0+ ».
  useEffect(() => {
    if (inView) {
      setStarted(true);
      return;
    }
    const id = setTimeout(() => setStarted(true), 1200);
    return () => clearTimeout(id);
  }, [inView]);

  useEffect(() => {
    if (!started) return;
    if (prefersReduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    // Filet de sécurité : requestAnimationFrame est gelé quand l'onglet est en
    // arrière-plan (le compteur resterait bloqué à 0). Ce setTimeout, lui, finit
    // toujours par tomber et garantit l'affichage de la valeur finale.
    const safety = setTimeout(() => setValue(to), duration * 1000 + 200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, [started, to, duration, prefersReduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

export default Counter;
