import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

/**
 * Robot Spline (Nexbot, modèle communauté), 3D interactive : il suit le curseur.
 * InteractiveRobot gère déjà le lazy-load au scroll, le Suspense et l'error-boundary ;
 * react-spline appelle lui-même app.dispose() au démontage (libération WebGL).
 *
 * Intégration :
 *  - fond de la scène aligné sur celui de la page + masque radial sur les bords :
 *    plus de rectangle noir à arêtes vives, le robot "flotte" dans la section
 *    (le masque estompe aussi le badge Spline du coin, plus besoin de cache opaque) ;
 *  - rendu mis en pause dès que la scène sort de l'écran (GPU/CPU libérés) ;
 *  - fondu d'apparition une fois la scène chargée (pas de flash noir).
 */
const SCENE = 'https://prod.spline.design/QWFwT7uWkGBL9YAX/scene.splinecode';

// Rayons = demi-largeur/hauteur : opaque au centre, totalement transparent aux bords et
// dans les coins (le badge "Built with Spline", en bas à droite, disparaît avec).
const EDGE_MASK = 'radial-gradient(ellipse 50% 50% at 50% 47%, #000 62%, transparent 100%)';

/** Couleur de fond réelle de la page (suit le thème clair/sombre). */
const pageBackground = () => getComputedStyle(document.body).backgroundColor || '#090b10';

const SplineRobot = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const [ready, setReady] = useState(false);

  const handleLoad = (app: Application) => {
    appRef.current = app;
    try {
      app.setBackgroundColor(pageBackground());
    } catch { /* API absente sur une vieille version du runtime : sans gravité */ }
    setReady(true);
  };

  // Pause du rendu hors écran
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      const app = appRef.current;
      if (!app) return;
      if (entry.isIntersecting) app.play();
      else app.stop();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Suivi du changement de thème (classe .dark sur <html>)
  useEffect(() => {
    const mo = new MutationObserver(() => {
      try {
        appRef.current?.setBackgroundColor(pageBackground());
      } catch { /* idem */ }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center" role="status">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-brand" />
          <span className="sr-only">Chargement de la scène 3D</span>
        </div>
      )}
      <div
        className={`h-full w-full transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
      >
        <Spline scene={SCENE} onLoad={handleLoad} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default SplineRobot;
