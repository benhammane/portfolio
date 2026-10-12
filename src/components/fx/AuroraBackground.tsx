/**
 * Fond global, volontairement sobre :
 *  - deux nappes de lumière (teal / indigo) très diffuses, dérive lente en CSS (compositor only)
 *  - grille fine en fondu sous la Hero
 *  - grain + vignette pour la profondeur
 * Plus de canvas de particules : il redessinait chaque frame pendant toute la visite
 * (coût main-thread permanent) pour un effet peu perceptible.
 * Position fixed derrière toute l'app (z -10). Les animations sont coupées par le bloc
 * prefers-reduced-motion global (index.css) et désactivées sous md (GPU mobile).
 */
const AuroraBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-background" />

    <div className="absolute -top-[30%] left-[10%] h-[40rem] w-[40rem] rounded-full bg-brand/[0.12] blur-[140px] md:animate-aurora-drift" />
    <div
      className="absolute -right-40 top-[35%] h-[34rem] w-[34rem] rounded-full bg-brand-3/[0.10] blur-[150px] md:animate-aurora-drift"
      style={{ animationDelay: '-14s' }}
    />

    <div className="absolute inset-0 bg-grid opacity-40" />
    <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(var(--background))_100%)]" />
  </div>
);

export default AuroraBackground;
