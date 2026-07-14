import Spline from '@splinetool/react-spline';

/**
 * Robot Spline (Nexbot, modèle communauté), 3D interactive : il suit le curseur.
 * InteractiveRobot gère déjà le lazy-load au scroll, le Suspense et l'error-boundary.
 */
const SCENE = 'https://prod.spline.design/QWFwT7uWkGBL9YAX/scene.splinecode';

const SplineRobot = () => (
  <div className="relative h-full w-full">
    <Spline scene={SCENE} style={{ width: '100%', height: '100%' }} />
    {/* masque le badge "Built with Spline" en bas à droite */}
    <div className="pointer-events-none absolute bottom-3 right-3 h-10 w-32 rounded-md bg-background" />
  </div>
);

export default SplineRobot;
