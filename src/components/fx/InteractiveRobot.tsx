import { Suspense, lazy, useEffect, useRef, useState, Component, ReactNode } from 'react';
import { Bot } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

// Visuel 3D actif : robot Spline.
const Scene = lazy(() => import('./SplineRobot'));

/** Visuel statique de repli (mobile, reduced-motion, pas de WebGL, ou si la 3D échoue). */
const RobotFallback = () => (
  <div className="relative flex h-full w-full items-center justify-center">
    <div className="absolute h-48 w-48 rounded-full bg-brand/15 blur-[80px]" />
    <div className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] surface">
      <Bot className="h-16 w-16 text-brand" strokeWidth={1.2} aria-hidden />
    </div>
  </div>
);

/** Empêche un crash de la 3D de casser la page. */
class RobotErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <RobotFallback /> : this.props.children;
  }
}

/** Détection WebGL (contexte jetable, libéré immédiatement). */
const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
};

const InteractiveRobot = ({ className = '' }: { className?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);
  // null = pas encore évalué (rendu serveur / avant montage) → fallback statique
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);

  useEffect(() => {
    // Version mobile allégée : pas de scène WebGL (~2 Mo) sous 768 px ni sur écran tactile seul
    const isSmall = window.matchMedia('(max-width: 767px)').matches;
    const coarseOnly = !window.matchMedia('(any-pointer: fine)').matches;
    setCanRender3D(!isSmall && !coarseOnly && hasWebGL());
  }, []);

  useEffect(() => {
    if (!ref.current || prefersReduced || !canRender3D) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [prefersReduced, canRender3D]);

  const showStatic = prefersReduced || !canRender3D;

  return (
    <div ref={ref} className={`relative ${className}`}>
      {showStatic || !shouldLoad ? (
        <RobotFallback />
      ) : (
        <RobotErrorBoundary>
          <Suspense fallback={<RobotFallback />}>
            <Scene />
          </Suspense>
        </RobotErrorBoundary>
      )}
    </div>
  );
};

export default InteractiveRobot;
