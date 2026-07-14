import { useEffect, useRef, useState, type VideoHTMLAttributes } from 'react';

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  /** Lance la lecture dès que la vidéo devient visible (nécessite muted). */
  playInView?: boolean;
}

/**
 * <video> qui ne télécharge sa source qu'à l'approche du viewport.
 * Évite de charger ~20 Mo de vidéos au chargement initial de la page
 * (les aperçus muets étaient tous téléchargés + lus dès le montage).
 */
const LazyVideo = ({ src, playInView = true, ...rest }: LazyVideoProps) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: '300px' } // pré-charge un peu avant l'arrivée à l'écran
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (visible && playInView) ref.current?.play().catch(() => {});
  }, [visible, playInView]);

  return <video ref={ref} src={visible ? src : undefined} preload="none" {...rest} />;
};

export default LazyVideo;
