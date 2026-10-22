import { useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Github, Check, ExternalLink, ChevronDown, ChevronUp, Play, Sparkles, type LucideIcon } from 'lucide-react';
import { MotionConfig, motion } from 'framer-motion';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { useClickSound } from '@/hooks/useClickSound';
import { useLocale } from '@/lib/LocaleProvider';
import { trackVideoPreview } from '@/lib/analytics';
import SectionHeading from '@/components/fx/SectionHeading';
import { staggerContainer, staggerItem } from '@/components/fx/Reveal';
import { ProjectVideoMedia, ProjectVideoModal, type ProjectVideoData } from '@/components/fx/ProjectVideo';

// Project images
import foodixImg from '@/assert/foodix.webp';
import jesmoniteImg from '@/assert/jesmoniteEcommerce.jpeg';
import jeuTirImg from '@/assert/jeuTIR.webp';
import vlilleImg from '@/assert/Vlille.png';
import kanbanImg from '@/assert/Kanban.png';
import defiGoImg from '@/assert/DefiGO.jpeg';
import bubbletiImg from '@/assert/BubbletiMA.png';
import bubbleJeuImg from '@/assert/BubbleJEU.png';
import venteEnchereImg from '@/assert/venteEnchere.webp';
import railroadImg from '@/assert/railroad2.webp';
import bankInsightImg from '@/assert/BankInsight.png';
import etooImg from '@/assert/etoo-blast-off.png';

// Réalisations web (sites & apps en ligne, importées de WebLocal)
import wlTimesSquareImg from '@/assert/wl-timessquare.webp';
import wlConduiteImg from '@/assert/wl-conduite-plus.webp';
import wlSpendlyImg from '@/assert/wl-spendly.webp';
import wlInsightaiImg from '@/assert/wl-insightai.webp';
import wlLuxestateImg from '@/assert/wl-luxestate.webp';
import wlDrivenowImg from '@/assert/wl-drivenow.webp';
import wlInvoiceflowImg from '@/assert/wl-invoiceflow.webp';
import wlCrepescornerImg from '@/assert/wl-crepescorner.webp';
import wlNanaImg from '@/assert/wl-delicesdenana.webp';
import wlMiageImg from '@/assert/wl-miagelille.webp';
import wlBenedictinesImg from '@/assert/wl-residencebenedictines.webp';
import freelanceosImg from '@/assert/freelanceos.webp';
import kadjiAccueilImg from '@/assert/kadji-accueil.webp';
import kadjiCommandesImg from '@/assert/kadji-commandes.webp';
import m2appImg from '@/assert/m2app.webp';

// Vidéos de présentation (encodées depuis les rushs 1080p : extrait muet de 8 s pour le survol,
// version 720p pour la modale, poster WebP). Les rushs originaux ne sont pas versionnés.
import etooPreview from '@/assert/etoo-preview.mp4';
import etooFull from '@/assert/etoo-full.mp4';
import etooPoster from '@/assert/etoo-poster.webp';
import luxestatePreview from '@/assert/luxestate-preview.mp4';
import luxestateFull from '@/assert/luxestate-full.mp4';
import luxestatePoster from '@/assert/luxestate-poster.webp';
import conduitePreview from '@/assert/conduite-preview.mp4';
import conduiteFull from '@/assert/conduite-full.mp4';
import conduitePoster from '@/assert/conduite-poster.webp';
import m2appPreview from '@/assert/m2app-preview.mp4';
import m2appFull from '@/assert/m2app-full.mp4';
import m2appPoster from '@/assert/m2app-poster.webp';
import freelanceosPreview from '@/assert/freelanceos-preview.mp4';
import freelanceosFull from '@/assert/freelanceos-full.mp4';
import freelanceosPoster from '@/assert/freelanceos-poster.webp';
import kadjiPreview from '@/assert/kadji-preview.mp4';
import kadjiFull from '@/assert/kadji-full.mp4';
import kadjiPoster from '@/assert/kadji-poster.webp';
import spendlyPreview from '@/assert/spendly-preview.mp4';
import spendlyFull from '@/assert/spendly-full.mp4';
import spendlyPoster from '@/assert/spendly-poster.webp';
import kanbanPreview from '@/assert/kanban-preview.mp4';
import kanbanFull from '@/assert/kanban-full.mp4';
import kanbanPoster from '@/assert/kanban-poster.webp';
import bubbletiPreview from '@/assert/bubbleti-preview.mp4';
import bubbletiFull from '@/assert/bubbleti-full.mp4';
import bubbletiPoster from '@/assert/bubbleti-poster.webp';
import timessquarePreview from '@/assert/timessquare-preview.mp4';
import timessquareFull from '@/assert/timessquare-full.mp4';
import timessquarePoster from '@/assert/timessquare-poster.webp';
import drivenowPreview from '@/assert/drivenow-preview.mp4';
import drivenowFull from '@/assert/drivenow-full.mp4';
import drivenowPoster from '@/assert/drivenow-poster.webp';
import insightaiPreview from '@/assert/insightai-preview.mp4';
import insightaiFull from '@/assert/insightai-full.mp4';
import insightaiPoster from '@/assert/insightai-poster.webp';
import invoiceflowPreview from '@/assert/invoiceflow-preview.mp4';
import invoiceflowFull from '@/assert/invoiceflow-full.mp4';
import invoiceflowPoster from '@/assert/invoiceflow-poster.webp';

const GITHUB = 'https://github.com/benhammane';

const VIDEOS = {
  etoo: { preview: etooPreview, full: etooFull, poster: etooPoster, duration: '1:03', hasAudio: true, kind: 'trailer' },
  luxestate: { preview: luxestatePreview, full: luxestateFull, poster: luxestatePoster, duration: '0:43', hasAudio: true },
  conduite: { preview: conduitePreview, full: conduiteFull, poster: conduitePoster, duration: '0:47' },
  m2app: { preview: m2appPreview, full: m2appFull, poster: m2appPoster, duration: '0:52' },
  freelanceos: { preview: freelanceosPreview, full: freelanceosFull, poster: freelanceosPoster, duration: '1:24', hasAudio: true },
  kadji: { preview: kadjiPreview, full: kadjiFull, poster: kadjiPoster, duration: '2:36', hasAudio: true },
  spendly: { preview: spendlyPreview, full: spendlyFull, poster: spendlyPoster, duration: '0:40' },
  kanban: { preview: kanbanPreview, full: kanbanFull, poster: kanbanPoster, duration: '0:52', hasAudio: true },
  bubbleti: { preview: bubbletiPreview, full: bubbletiFull, poster: bubbletiPoster, duration: '1:12', hasAudio: true },
  timessquare: { preview: timessquarePreview, full: timessquareFull, poster: timessquarePoster, duration: '0:58', hasAudio: true },
  drivenow: { preview: drivenowPreview, full: drivenowFull, poster: drivenowPoster, duration: '0:35', hasAudio: true },
  insightai: { preview: insightaiPreview, full: insightaiFull, poster: insightaiPoster, duration: '0:30' },
  invoiceflow: { preview: invoiceflowPreview, full: invoiceflowFull, poster: invoiceflowPoster, duration: '0:31', hasAudio: true },
} satisfies Record<string, ProjectVideoData>;

/** Données transmises à la modale vidéo (une seule modale pour toute la section). */
interface OpenVideo {
  video: ProjectVideoData;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
  note?: string;
}
type OpenVideoHandler = (data: OpenVideo, trigger: HTMLElement) => void;

interface Featured {
  titleKey: string;
  categoryKey: string;
  year: string;
  descKey: string;
  calloutKey: string;
  highlightKeys: string[];
  techs: string[];
  image: string;
  url?: string; // lien démo réel ou repo GitHub spécifique (sinon → profil GitHub)
  domain: string; // affiché dans la barre du mockup
  playable?: boolean; // true → CTA « Jouer maintenant » au lieu de « Voir le site »
  video?: ProjectVideoData;
}

// ⭐ projets vedettes en grand format (les deux flagships les plus riches)
const featured: Featured[] = [
  {
    titleKey: 'project_etoo_title',
    categoryKey: 'project_etoo_category',
    year: '2026',
    descKey: 'project_etoo_desc',
    calloutKey: 'project_etoo_callout',
    highlightKeys: ['project_etoo_h1', 'project_etoo_h2', 'project_etoo_h3', 'project_etoo_h4'],
    techs: ['React', 'Three.js', 'TypeScript', 'WebRTC'],
    image: etooImg,
    domain: 'etoo-blast-off.vercel.app',
    url: 'https://etoo-blast-off.vercel.app',
    playable: true,
    video: VIDEOS.etoo,
  },
  {
    titleKey: 'project_bankinsight_title',
    categoryKey: 'project_bankinsight_category',
    year: '2026',
    descKey: 'project_bankinsight_desc',
    calloutKey: 'project_bankinsight_callout',
    highlightKeys: ['project_bankinsight_h1', 'project_bankinsight_h2', 'project_bankinsight_h3', 'project_bankinsight_h4'],
    techs: ['Python', 'Streamlit', 'LangChain', 'ChromaDB'],
    image: bankInsightImg,
    domain: 'bankinsight.streamlit.app',
    url: 'https://bankinsight.streamlit.app',
  },
];

// Carte compacte unifiée : site en ligne, repo GitHub, ou projet sans lien public (badge).
interface WebCard {
  titleKey: string;
  descKey: string;
  techs: string[];
  image?: string; // absent → placeholder dégradé + icône
  mobileImages?: [string, string]; // captures mobiles verticales (2 écrans côte à côte, non recadrées)
  placeholderIcon?: LucideIcon;
  url?: string; // lien direct (site live ou repo)
  github?: boolean; // true → icône GitHub + lien url || profil GitHub
  badge?: string; // clé i18n d'un statut (ex : « Démo sur demande », « En test »)
  video?: ProjectVideoData; // présentation vidéo → aperçu au survol + modale
}

// ⭐ Vedette — applications & sites mis en avant (visibles par défaut)
const vedetteWeb: WebCard[] = [
  { titleKey: 'wl_timessquare_title', descKey: 'wl_timessquare_desc', techs: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'], image: wlTimesSquareImg, url: 'https://times-square-roubaix.vercel.app', video: VIDEOS.timessquare },
  { titleKey: 'wl_conduite_title', descKey: 'wl_conduite_desc', techs: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'], image: wlConduiteImg, url: 'https://conduite-plus.vercel.app', video: VIDEOS.conduite },
  { titleKey: 'wl_luxestate_title', descKey: 'wl_luxestate_desc', techs: ['Next.js', 'TypeScript', 'Prisma', 'MapLibre'], image: wlLuxestateImg, url: 'https://lux-estate-livid.vercel.app', video: VIDEOS.luxestate },
  { titleKey: 'wl_drivenow_title', descKey: 'wl_drivenow_desc', techs: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'], image: wlDrivenowImg, url: 'https://drive-now-phi.vercel.app', video: VIDEOS.drivenow },
  { titleKey: 'wl_invoiceflow_title', descKey: 'wl_invoiceflow_desc', techs: ['Next.js', 'TypeScript', 'Prisma', 'NextAuth'], image: wlInvoiceflowImg, url: 'https://invoice-flow-sand.vercel.app', video: VIDEOS.invoiceflow },
  { titleKey: 'wl_insightai_title', descKey: 'wl_insightai_desc', techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API'], image: wlInsightaiImg, url: 'https://insight-ai-lilac.vercel.app', video: VIDEOS.insightai },
  { titleKey: 'wl_spendly_title', descKey: 'wl_spendly_desc', techs: ['React', 'TypeScript', 'Tailwind CSS'], image: wlSpendlyImg, url: 'https://spendly-lake-eight.vercel.app', video: VIDEOS.spendly },
  // Stack FreelanceOS alignée sur la slide « architecture » de la vidéo de présentation.
  { titleKey: 'freelanceos_title', descKey: 'freelanceos_desc', techs: ['React 19', 'Java 21', 'Spring Boot 3', 'PostgreSQL'], image: freelanceosImg, badge: 'projects_badge_demo', video: VIDEOS.freelanceos },
  { titleKey: 'kadji_title', descKey: 'kadji_desc', techs: ['Expo', 'React Native', 'NestJS', 'PostgreSQL'], mobileImages: [kadjiAccueilImg, kadjiCommandesImg], badge: 'projects_badge_test', video: VIDEOS.kadji },
  { titleKey: 'm2app_title', descKey: 'm2app_desc', techs: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase'], image: m2appImg, url: 'https://m2-app-eta.vercel.app', video: VIDEOS.m2app },
];

// Reste des réalisations — révélées via « Voir plus de projets »
const moreProjects: WebCard[] = [
  { titleKey: 'wl_crepescorner_title', descKey: 'wl_crepescorner_desc', techs: ['React', 'TypeScript', 'Tailwind CSS'], image: wlCrepescornerImg, url: 'https://crepescorner.lovable.app' },
  { titleKey: 'wl_nana_title', descKey: 'wl_nana_desc', techs: ['React', 'TypeScript', 'Tailwind CSS'], image: wlNanaImg, url: 'https://nana-delights-site.lovable.app' },
  { titleKey: 'wl_miage_title', descKey: 'wl_miage_desc', techs: ['React', 'TypeScript', 'Tailwind CSS'], image: wlMiageImg, url: 'https://miage-lille-connect.lovable.app' },
  { titleKey: 'wl_benedictines_title', descKey: 'wl_benedictines_desc', techs: ['React', 'TypeScript', 'Tailwind CSS'], image: wlBenedictinesImg, url: 'https://lesbenedictines.lovable.app' },
  { titleKey: 'project_ecommerce_title', descKey: 'project_ecommerce_desc', techs: ['Laravel', 'PHP', 'JavaScript', 'MySQL'], image: jesmoniteImg, github: true },
  { titleKey: 'project_encheres_title', descKey: 'project_encheres_desc', techs: ['JavaScript', 'Node.js', 'socket.io'], image: venteEnchereImg, github: true },
  { titleKey: 'project_bubbleti_title', descKey: 'project_bubbleti_desc', techs: ['JavaScript', 'Node.js', 'MySQL'], image: bubbletiImg, url: 'https://github.com/benhammane/Bubbleti', github: true, video: VIDEOS.bubbleti },
  { titleKey: 'project_recettes_title', descKey: 'project_recettes_desc', techs: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'], image: foodixImg, github: true },
  { titleKey: 'project_shmup_title', descKey: 'project_shmup_desc', techs: ['Java', 'LibGDX'], image: jeuTirImg, github: true },
  { titleKey: 'project_velo_title', descKey: 'project_velo_desc', techs: ['Java', 'MySQL', 'UML'], image: vlilleImg, github: true },
  { titleKey: 'project_railroad_title', descKey: 'project_railroad_desc', techs: ['Java', 'Python', 'WebSocket'], image: railroadImg, github: true },
  { titleKey: 'project_kanban_title', descKey: 'project_kanban_desc', techs: ['JavaScript', 'HTML', 'CSS'], image: kanbanImg, github: true, video: VIDEOS.kanban },
  { titleKey: 'project_delidefi_title', descKey: 'project_delidefi_desc', techs: ['App Inventor 2', 'Android'], image: defiGoImg, github: true },
  { titleKey: 'project_bubbele_title', descKey: 'project_bubbele_desc', techs: ['Game Design', 'JavaScript'], image: bubbleJeuImg, url: 'https://github.com/benhammane/Bubulle', github: true },
];

/** Cadre navigateur ; le contenu (capture ou vidéo) est fourni par l'appelant. */
const ProjectFrame = ({ domain, children }: { domain: string; children: ReactNode }) => (
  <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-2xl">
    <div className="flex items-center gap-2 border-b border-border/60 bg-background/60 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-red-400/70" />
      <span className="h-3 w-3 rounded-full bg-amber-400/70" />
      <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
      <div className="ml-3 flex-1 truncate rounded-md bg-secondary/70 px-3 py-1 text-center text-[11px] text-muted-foreground">
        {domain}
      </div>
    </div>
    {children}
  </div>
);

const FeaturedProject = ({
  project,
  index,
  onOpenVideo,
}: {
  project: Featured;
  index: number;
  onOpenVideo: OpenVideoHandler;
}) => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const link = project.url || GITHUB;
  const reversed = index % 2 === 1;
  const title = t(project.titleKey);
  const ctaLabel = project.playable ? t('projects_play') : project.url ? t('projects_view_site') : t('projects_view_github');
  const isTrailer = project.video?.kind === 'trailer';

  const openVideo = (trigger: HTMLElement) => {
    if (!project.video) return;
    onOpenVideo(
      {
        video: project.video,
        title,
        description: t(project.descKey),
        ctaHref: link,
        ctaLabel,
      },
      trigger,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      {/* Texte */}
      <div className={reversed ? 'lg:order-2' : 'lg:order-1'}>
        <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="text-brand">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-border" aria-hidden="true" />
          <span className="uppercase tracking-[0.18em] text-muted-foreground">{t(project.categoryKey)}</span>
          <span className="text-muted-foreground/70">· {project.year}</span>
        </div>

        <h3 className="font-display text-3xl font-semibold tracking-tight md:text-[2.5rem] md:leading-tight">{title}</h3>

        <p className="mt-4 leading-relaxed text-muted-foreground">{t(project.descKey)}</p>

        {/* Encadré résultat */}
        <div className="mt-5 border-l-2 border-brand pl-4">
          <p className="font-medium text-foreground/90">{t(project.calloutKey)}</p>
        </div>

        {/* Points forts */}
        <div className="mt-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{t('projects_highlights_label')}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {project.highlightKeys.map((hKey) => (
              <div key={hKey} className="flex items-center gap-2 text-sm">
                <Check size={15} className="shrink-0 text-brand" />
                {t(hKey)}
              </div>
            ))}
          </div>
        </div>

        {/* Technos */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <span key={tech} className="rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA : découvrir le projet (lien) et, s'il existe, regarder la vidéo (modale) — deux actions distinctes */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <LiquidButton
            variant="brand"
            size="md"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
          >
            {ctaLabel}
            <ArrowUpRight size={17} />
          </LiquidButton>
          {project.video && (
            <LiquidButton variant="ghost" size="md" type="button" onClick={(e) => openVideo(e.currentTarget)}>
              <Play size={16} fill="currentColor" aria-hidden="true" />
              {t(isTrailer ? 'video_watch_trailer' : 'video_watch')}
            </LiquidButton>
          )}
        </div>
      </div>

      {/* Mockup : vidéo (aperçu au survol, modale au clic) ou capture cliquable vers le projet */}
      {project.video ? (
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className={`relative ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
        >
          {isTrailer && (
            // Halo néon façon page de jeu, dans la palette du portfolio.
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-500/30 via-brand-2/15 to-brand-3/30 opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
            />
          )}
          <ProjectFrame domain={project.domain}>
            <ProjectVideoMedia video={project.video} title={title} onOpen={openVideo} className="aspect-video" featured />
          </ProjectFrame>
        </motion.div>
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          className={`block ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
          aria-label={title}
        >
          <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
            <ProjectFrame domain={project.domain}>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img src={project.image} alt={title} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
            </ProjectFrame>
          </motion.div>
        </a>
      )}
    </motion.div>
  );
};

const CardTechs = ({ techs }: { techs: string[] }) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {techs.map((tech) => (
      <span key={tech} className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground">
        {tech}
      </span>
    ))}
  </div>
);

const CardBadge = ({ label }: { label: string }) => (
  <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
    {label}
  </span>
);

const cardMotion = {
  variants: staggerItem,
  whileHover: { y: -4 },
  transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
};

/** Carte compacte : site live, repo GitHub, projet sans lien public, ou présentation vidéo. */
const CompactCard = ({ project, onOpenVideo }: { project: WebCard; onOpenVideo: OpenVideoHandler }) => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const title = t(project.titleKey);
  const link = project.url ? project.url : project.github ? GITHUB : undefined;
  const CornerIcon = project.github ? Github : ExternalLink;
  const PlaceholderIcon = project.placeholderIcon ?? Sparkles;
  const cls =
    'group flex h-full flex-col overflow-hidden rounded-3xl surface transition-[border-color,box-shadow] duration-300 hover:border-brand/35 hover:shadow-[0_24px_50px_-28px_hsl(var(--brand)/0.35)]';

  // ── Carte avec vidéo : la vidéo ouvre la modale, le lien « Voir le site » mène au projet.
  // Pas de lien englobant : les deux actions restent distinctes (et le HTML valide).
  if (project.video) {
    const video = project.video;
    // Dépôt GitHub (projets sans site en ligne) : le libellé suit la nature du lien
    const linkLabel = t(project.github ? 'projects_view_github' : 'projects_view_site');
    const openVideo = (trigger: HTMLElement) =>
      onOpenVideo(
        {
          video,
          title,
          description: t(project.descKey),
          ctaHref: link,
          ctaLabel: linkLabel,
          note: project.badge ? t(project.badge) : undefined,
        },
        trigger,
      );

    return (
      <motion.div {...cardMotion} className={cls}>
        <ProjectVideoMedia video={video} title={title} onOpen={openVideo} className="aspect-video" />
        <div className="flex flex-grow flex-col p-6">
          <h4 className="font-display font-semibold">{title}</h4>
          <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">{t(project.descKey)}</p>
          {project.badge && <CardBadge label={t(project.badge)} />}
          <CardTechs techs={project.techs} />
          {link && (
            <div className="mt-5 border-t border-border/50 pt-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex min-h-[32px] items-center gap-1.5 rounded-md text-sm font-medium text-brand transition-colors hover:text-brand-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {linkLabel}
                <ArrowUpRight size={15} aria-hidden="true" />
                <span className="sr-only">— {title}</span>
              </a>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  const inner = (
    <>
      <div className="relative aspect-video overflow-hidden">
        {project.mobileImages ? (
          // Deux captures mobiles verticales côte à côte, non recadrées (object-contain).
          <div className="flex h-full w-full items-center justify-center gap-2 bg-gradient-to-br from-brand/15 via-brand-2/10 to-brand-3/20 px-4 py-3">
            {project.mobileImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${title} — écran ${i + 1}`}
                loading="lazy"
                className="h-full w-auto rounded-xl object-contain shadow-lg transition-transform duration-500 group-hover:-translate-y-1"
              />
            ))}
          </div>
        ) : project.image ? (
          <>
            <img src={project.image} alt={title} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/20 via-brand-2/10 to-brand-3/25">
            <PlaceholderIcon size={40} className="text-brand/70" />
          </div>
        )}
        {link && (
          <div className="absolute right-3 top-3 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
            <CornerIcon size={15} />
          </div>
        )}
      </div>
      <div className="flex flex-grow flex-col p-6">
        <h4 className="font-display font-semibold transition-colors group-hover:text-brand">{title}</h4>
        <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">{t(project.descKey)}</p>
        {project.badge && <CardBadge label={t(project.badge)} />}
        <CardTechs techs={project.techs} />
      </div>
    </>
  );

  return link ? (
    <motion.a
      {...cardMotion}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={playClick}
      className={cls}
      aria-label={title}
    >
      {inner}
    </motion.a>
  ) : (
    <motion.div {...cardMotion} className={cls}>
      {inner}
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const [showMore, setShowMore] = useState(false);

  // Une seule modale pour toute la section. Les données restent en place à la fermeture
  // pour que l'animation de sortie s'affiche avec le bon contenu.
  const [videoData, setVideoData] = useState<OpenVideo | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const videoTriggerRef = useRef<HTMLElement | null>(null);

  const openVideo: OpenVideoHandler = (data, trigger) => {
    playClick();
    trackVideoPreview(data.title);
    videoTriggerRef.current = trigger;
    setVideoData(data);
    setVideoOpen(true);
  };

  return (
    // reducedMotion="user" : Framer Motion coupe les translations si le visiteur l'a demandé.
    <MotionConfig reducedMotion="user">
      <section id="projects" className="section-padding relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-6">
          <SectionHeading eyebrow="04 — Portfolio" title="Mes" highlight="Projets" subtitle={t('projects_sub')} />

          {/* Projets vedettes — grand format */}
          <div className="space-y-20 md:space-y-28">
            {featured.map((p, i) => (
              <FeaturedProject key={p.titleKey} project={p} index={i} onOpenVideo={openVideo} />
            ))}
          </div>

          {/* Vedette — applications & sites (grille) */}
          <div className="mt-24">
            <div className="mb-10 flex items-center gap-4">
              <h3 className="font-display text-xl font-semibold">{t('projects_web_heading')}</h3>
              <span className="h-px flex-1 bg-border/60" />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {vedetteWeb.map((p) => (
                <CompactCard key={p.titleKey} project={p} onOpenVideo={openVideo} />
              ))}
            </motion.div>
          </div>

          {/* Bouton Voir plus / Voir moins */}
          <div className="mt-12 flex justify-center">
            <LiquidButton
              variant="ghost"
              size="md"
              onClick={() => { playClick(); setShowMore((v) => !v); }}
              aria-expanded={showMore}
              aria-controls="more-projects"
            >
              {showMore ? t('projects_show_less') : t('projects_show_more')}
              {showMore ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </LiquidButton>
          </div>

          {/* Reste des réalisations — révélé au clic */}
          {showMore && (
            <div id="more-projects" className="mt-14">
              <div className="mb-10 flex items-center gap-4">
                <h3 className="font-display text-xl font-semibold">{t('projects_others_heading')}</h3>
                <span className="h-px flex-1 bg-border/60" />
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {moreProjects.map((p) => (
                  <CompactCard key={p.titleKey} project={p} onOpenVideo={openVideo} />
                ))}
              </motion.div>
            </div>
          )}
        </div>

        {videoData && (
          <ProjectVideoModal
            open={videoOpen}
            onOpenChange={setVideoOpen}
            video={videoData.video}
            title={videoData.title}
            description={videoData.description}
            ctaHref={videoData.ctaHref}
            ctaLabel={videoData.ctaLabel}
            note={videoData.note}
            returnFocusTo={videoTriggerRef.current}
          />
        )}
      </section>
    </MotionConfig>
  );
};

export default ProjectsSection;
