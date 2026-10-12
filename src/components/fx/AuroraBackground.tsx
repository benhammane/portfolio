/**
 * Fond global, volontairement sobre :
 *  - deux nappes de lumière (teal / indigo), dérive lente en CSS (compositor only)
 *  - grille fine en fondu sous la Hero
 *  - grain + vignette pour la profondeur
 *
 * Perf : les nappes sont des dégradés radiaux et non des div floutées
 * (filter: blur(140px) sur des calques de 40rem coûtait cher au GPU, surtout sur
 * mobile, à chaque frame de la dérive). Rendu visuel équivalent, sans filtre.
 * Pas de canvas de particules (rAF permanent). Animations coupées sous md et par
 * le bloc prefers-reduced-motion global (index.css).
 */
const AuroraBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-background" />

    <div
      className="absolute -top-[40%] left-[-5%] h-[60rem] w-[60rem] rounded-full md:animate-aurora-drift"
      style={{ background: 'radial-gradient(closest-side, hsl(var(--brand) / 0.13), transparent)' }}
    />
    <div
      className="absolute -right-[25%] top-[25%] h-[54rem] w-[54rem] rounded-full md:animate-aurora-drift"
      style={{
        background: 'radial-gradient(closest-side, hsl(var(--brand-3) / 0.11), transparent)',
        animationDelay: '-14s',
      }}
    />

    <div className="absolute inset-0 bg-grid opacity-40" />
    <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(var(--background))_100%)]" />
  </div>
);

export default AuroraBackground;
