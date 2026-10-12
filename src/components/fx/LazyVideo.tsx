import { useEffect, useRef, useState, type VideoHTMLAttributes } from 'react';

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  /** Lance la lecture quand la vidéo est visible et la met en pause hors écran (nécessite muted). */
  playInView?: boolean;
}

/**
 * <video> qui ne télécharge sa source qu'à l'approche du viewport.
 * Évite de charger ~20 Mo de vidéos au chargement initial de la page.
 * La lecture est suspendue dès que la vidéo sort de l'écran : avant, les vidéos
 * en boucle continuaient d'être décodées en arrière-plan (CPU/GPU, batterie,
 * saccades au scroll sur mobile).
 */
const LazyVideo = ({ src, playInView = true, ...rest }: LazyVideoProps) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Chargement de la source un peu avant l'arrivée à l'écran
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          obs.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Lecture uniquement quand la vidéo est réellement visible
  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded || !playInView) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [loaded, playInView]);

  return <video ref={ref} src={loaded ? src : undefined} preload="none" {...rest} />;
};

export default LazyVideo;
