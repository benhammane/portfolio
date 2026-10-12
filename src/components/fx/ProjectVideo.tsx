import { useCallback, useEffect, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useReducedMotion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Loader2, Play, Volume2, X } from 'lucide-react';
import { DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { useLocale } from '@/lib/LocaleProvider';
import { cn } from '@/lib/utils';

export interface ProjectVideoData {
  /** Extrait court et muet, joué au survol (chargé au premier survol uniquement). */
  preview: string;
  /** Vidéo complète, chargée seulement à l'ouverture de la modale. */
  full: string;
  /** Image affichée au repos et pendant le chargement. */
  poster: string;
  /** Durée affichée sur la pastille, ex. « 0:52 ». */
  duration: string;
  /** La vidéo complète contient une piste son → propose « Activer le son ». */
  hasAudio?: boolean;
  kind?: 'demo' | 'trailer';
}

// ─── Un seul aperçu actif à la fois ──────────────────────────────────────────
// Démarrer un aperçu arrête le précédent ; ouvrir la modale arrête l'aperçu en cours.
let stopActivePreview: (() => void) | null = null;

const claimPreview = (stop: () => void) => {
  if (stopActivePreview && stopActivePreview !== stop) stopActivePreview();
  stopActivePreview = stop;
};

const releasePreview = (stop: () => void) => {
  if (stopActivePreview === stop) stopActivePreview = null;
};

const pauseActivePreview = () => stopActivePreview?.();

const canHoverPreview = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ─── Miniature interactive ──────────────────────────────────────────────────

interface ProjectVideoMediaProps {
  video: ProjectVideoData;
  title: string;
  /** Reçoit l'élément déclencheur, pour lui rendre le focus à la fermeture de la modale. */
  onOpen: (trigger: HTMLElement) => void;
  /** Dimensions / arrondis fournis par le conteneur. */
  className?: string;
  /** Mise en avant (carte vedette) : bouton lecture toujours visible et plus grand. */
  featured?: boolean;
}

/**
 * Poster + aperçu vidéo au survol (souris uniquement), cliquable pour ouvrir la modale.
 * Sur tactile ou avec `prefers-reduced-motion`, le poster reste statique et le bouton
 * lecture est toujours affiché.
 */
export const ProjectVideoMedia = ({ video, title, onOpen, className, featured }: ProjectVideoMediaProps) => {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const wantPlayRef = useRef(false);

  const [armed, setArmed] = useState(false); // src assignée (chargement paresseux)
  const [wantPlay, setWantPlay] = useState(false);
  const [ready, setReady] = useState(false); // la vidéo joue → fondu poster → vidéo
  const [failed, setFailed] = useState(false);

  const isTrailer = video.kind === 'trailer';

  const stop = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    wantPlayRef.current = false;
    setWantPlay(false);
    setReady(false);
    videoRef.current?.pause();
  }, []);

  const start = () => {
    if (failed || reduceMotion || !canHoverPreview()) return;
    window.clearTimeout(hoverTimer.current);
    // Petit délai : évite de lancer des vidéos quand la souris ne fait que traverser la grille.
    hoverTimer.current = window.setTimeout(() => {
      claimPreview(stop);
      wantPlayRef.current = true;
      setArmed(true);
      setWantPlay(true);
    }, 140);
  };

  // Lecture / pause pilotées par l'état (la src n'existe qu'après le premier rendu « armé »).
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !armed) return;
    if (wantPlay) {
      v.currentTime = 0;
      v.play().catch(() => {
        /* lecture refusée (économie d'énergie, onglet masqué…) : on garde le poster */
      });
    } else {
      v.pause();
    }
  }, [armed, wantPlay]);

  // Stoppe l'aperçu quand la carte sort de l'écran ou que l'onglet est masqué.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop();
    });
    obs.observe(el);
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      obs.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearTimeout(hoverTimer.current);
      releasePreview(stop);
    };
  }, [stop]);

  const loading = wantPlay && !ready && !failed;
  const watchLabel = t(isTrailer ? 'video_watch_trailer' : 'video_watch');

  return (
    <button
      ref={rootRef}
      type="button"
      onClick={(e) => {
        stop();
        onOpen(e.currentTarget);
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') start();
      }}
      onPointerLeave={stop}
      aria-label={`${watchLabel} — ${title}`}
      className={cn(
        'group/video relative block w-full overflow-hidden bg-black text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <img
        src={video.poster}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/video:scale-[1.04]"
      />

      <video
        ref={videoRef}
        src={armed ? video.preview : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => {
          if (wantPlayRef.current) setReady(true);
        }}
        onError={() => {
          // Format non supporté ou fichier introuvable : on reste sur le poster.
          setFailed(true);
          setReady(false);
        }}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover/video:scale-[1.04]',
          ready ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Voile pour la lisibilité de la pastille */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />

      {/* Bouton lecture : toujours visible au tactile / en vedette, au survol ou au focus sinon */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="relative flex items-center justify-center">
          {featured && (
            <span className="absolute inset-0 rounded-full bg-brand/40 motion-safe:animate-ping [animation-duration:2.4s]" />
          )}
          <span
            className={cn(
              'relative flex items-center justify-center rounded-full border border-white/25 bg-black/40 text-white shadow-2xl backdrop-blur-md transition-all duration-300 ease-out',
              featured ? 'h-20 w-20' : 'h-14 w-14',
              !featured &&
                '[@media(hover:hover)]:scale-90 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/video:scale-100 [@media(hover:hover)]:group-hover/video:opacity-100 group-focus-visible/video:scale-100 group-focus-visible/video:opacity-100',
              'group-hover/video:border-white/40 group-hover/video:bg-black/55',
            )}
          >
            {loading ? (
              <Loader2 className={cn('animate-spin', featured ? 'h-7 w-7' : 'h-5 w-5')} aria-hidden="true" />
            ) : (
              <Play className={cn('translate-x-0.5', featured ? 'h-7 w-7' : 'h-5 w-5')} fill="currentColor" aria-hidden="true" />
            )}
          </span>
        </span>
      </span>

      {/* Pastille : type + durée — indique discrètement qu'une vidéo est disponible */}
      <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-md">
        <Play className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true" />
        {t(isTrailer ? 'video_badge_trailer' : 'video_badge_demo')}
        <span className="text-white/60">·</span>
        {video.duration}
      </span>
    </button>
  );
};

// ─── Modale de lecture ──────────────────────────────────────────────────────

export interface ProjectVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: ProjectVideoData;
  title: string;
  description?: string;
  /** Lien « Découvrir le projet » (site, démo jouable…). */
  ctaHref?: string;
  ctaLabel?: string;
  /** Statut affiché à la place du lien quand il n'y a pas de démo publique. */
  note?: string;
  /**
   * Élément qui a ouvert la modale. Radix rend normalement le focus au `DialogTrigger` ;
   * la modale étant pilotée sans trigger, on le restitue explicitement à la fermeture.
   */
  returnFocusTo?: HTMLElement | null;
}

type PlayerStatus = 'loading' | 'ready' | 'blocked' | 'error';

/** Lecteur monté uniquement quand la modale est ouverte : la vidéo complète n'est jamais préchargée. */
const ModalPlayer = ({
  video,
  title,
  videoRef,
  ctaHref,
  ctaLabel,
}: {
  video: ProjectVideoData;
  title: string;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  ctaHref?: string;
  ctaLabel?: string;
}) => {
  const { t } = useLocale();
  const [status, setStatus] = useState<PlayerStatus>('loading');
  const [muted, setMuted] = useState(true);

  // Lecture automatique MUETTE à l'ouverture (geste explicite du visiteur) ; le son reste à son initiative.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => setStatus((s) => (s === 'error' ? s : 'blocked')));
    return () => v.pause();
  }, [videoRef]);

  return (
    <div className="relative aspect-video w-full bg-black">
      <video
        ref={videoRef}
        src={video.full}
        poster={video.poster}
        controls
        playsInline
        preload="auto"
        aria-label={title}
        onPlaying={() => setStatus('ready')}
        onCanPlay={() => setStatus((s) => (s === 'loading' ? 'ready' : s))}
        onWaiting={() => setStatus((s) => (s === 'error' ? s : 'loading'))}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onError={() => setStatus('error')}
        className="h-full w-full"
      />

      {status === 'loading' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" role="status">
          <span className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-md">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {t('video_loading')}
          </span>
        </div>
      )}

      {status === 'blocked' && (
        <button
          type="button"
          onClick={() => videoRef.current?.play().catch(() => {})}
          className="absolute inset-0 flex items-center justify-center bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
          aria-label={t('video_watch')}
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md">
            <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" aria-hidden="true" />
          </span>
        </button>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/85 p-6 text-center text-white">
          <AlertCircle className="h-8 w-8 text-white/70" aria-hidden="true" />
          <p className="max-w-sm text-sm text-white/80">{t('video_error')}</p>
          {ctaHref && (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
            >
              {ctaLabel ?? t('video_discover')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      )}

      {video.hasAudio && muted && status !== 'error' && (
        <button
          type="button"
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            v.muted = false;
            if (v.volume === 0) v.volume = 1;
            v.play().catch(() => {});
          }}
          className="absolute right-3 top-3 inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Volume2 className="h-4 w-4" aria-hidden="true" />
          {t('video_unmute')}
        </button>
      )}
    </div>
  );
};

/**
 * Modale accessible (Radix Dialog) : focus piégé puis restitué, Échap, clic sur le fond,
 * scroll de la page verrouillé, lecture stoppée à la fermeture.
 */
export const ProjectVideoModal = ({
  open,
  onOpenChange,
  video,
  title,
  description,
  ctaHref,
  ctaLabel,
  note,
  returnFocusTo,
}: ProjectVideoModalProps) => {
  const { t } = useLocale();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isTrailer = video.kind === 'trailer';

  useEffect(() => {
    if (open) pauseActivePreview();
  }, [open]);

  const handleOpenChange = (next: boolean) => {
    // La modale reste montée le temps de l'animation de sortie : on coupe la lecture tout de suite.
    if (!next) videoRef.current?.pause();
    onOpenChange(next);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <DialogPrimitive.Content
          {...(description ? {} : { 'aria-describedby': undefined })}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocusTo?.focus({ preventScroll: true });
          }}
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[min(94vw,1120px,calc((100dvh_-_11rem)*16/9))] min-w-[min(94vw,320px)] -translate-x-1/2 -translate-y-1/2',
            'overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] outline-none sm:rounded-3xl',
            'duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            isTrailer && 'border-brand/30',
          )}
        >
          {/* En-tête */}
          <div className="flex items-center justify-between gap-4 border-b border-border/60 px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
                {t(isTrailer ? 'video_eyebrow_trailer' : 'video_eyebrow_demo')}
              </p>
              <DialogPrimitive.Title className="truncate font-display text-base font-semibold sm:text-lg">
                {title}
              </DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close
              aria-label={t('video_close')}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-secondary/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <ModalPlayer video={video} title={title} videoRef={videoRef} ctaHref={ctaHref} ctaLabel={ctaLabel} />

          {/* Pied : contexte + accès au projet */}
          {(description || ctaHref || note) && (
            <div className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5">
              {description ? (
                <DialogPrimitive.Description className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </DialogPrimitive.Description>
              ) : (
                <span />
              )}
              {ctaHref ? (
                <LiquidButton
                  variant="brand"
                  size="sm"
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 self-start sm:self-auto"
                >
                  {ctaLabel ?? t('video_discover')}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </LiquidButton>
              ) : (
                note && (
                  <span className="inline-flex shrink-0 items-center self-start rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand sm:self-auto">
                    {note}
                  </span>
                )
              )}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
};
