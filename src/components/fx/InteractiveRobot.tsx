import { Suspense, lazy, useEffect, useRef, useState, Component, ReactNode } from 'react';
import { Bot } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

// Visuel 3D actif : robot Spline (modèle exact demandé).
// Alternatives R3F maison dispo : './HumanoidModel', './RobotModel', './DroneModel'.
const Scene = lazy(() => import('./SplineRobot'));

/** Visuel statique de repli (mobile, reduced-motion, ou si la 3D échoue). */
const RobotFallback = () => (
  <div className="relative flex h-full w-full items-center justify-center">
    <div className="absolute h-56 w-56 rounded-full bg-brand/20 blur-[80px]" />
    <div className="relative flex h-40 w-40 items-center justify-center rounded-[2rem] glass border-gradient">
      <Bot className="h-20 w-20 text-brand" strokeWidth={1.2} />
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

const InteractiveRobot = ({ className = '' }: { className?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 767px)').matches);
  }, []);

  useEffect(() => {
    if (!ref.current || prefersReduced || isMobile) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [prefersReduced, isMobile]);

  const showStatic = prefersReduced || isMobile;

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
