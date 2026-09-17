import { useState } from 'react';
import { ArrowUpRight, Github, Check, ExternalLink, ChevronDown, ChevronUp, Sparkles, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { useClickSound } from '@/hooks/useClickSound';
import { useLocale } from '@/lib/LocaleProvider';
import SectionHeading from '@/components/fx/SectionHeading';
import { staggerContainer, staggerItem } from '@/components/fx/Reveal';

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

const GITHUB = 'https://github.com/benhammane';

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
}

// ⭐ Vedette — applications & sites mis en avant (visibles par défaut)
const vedetteWeb: WebCard[] = [
  { titleKey: 'wl_timessquare_title', descKey: 'wl_timessquare_desc', techs: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'], image: wlTimesSquareImg, url: 'https://times-square-roubaix.vercel.app' },
  { titleKey: 'wl_conduite_title', descKey: 'wl_conduite_desc', techs: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'], image: wlConduiteImg, url: 'https://conduite-plus.vercel.app' },
  { titleKey: 'wl_luxestate_title', descKey: 'wl_luxestate_desc', techs: ['Next.js', 'TypeScript', 'Prisma', 'MapLibre'], image: wlLuxestateImg, url: 'https://lux-estate-livid.vercel.app' },
  { titleKey: 'wl_drivenow_title', descKey: 'wl_drivenow_desc', techs: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'], image: wlDrivenowImg, url: 'https://drive-now-phi.vercel.app' },
  { titleKey: 'wl_invoiceflow_title', descKey: 'wl_invoiceflow_desc', techs: ['Next.js', 'TypeScript', 'Prisma', 'NextAuth'], image: wlInvoiceflowImg, url: 'https://invoice-flow-sand.vercel.app' },
  { titleKey: 'wl_insightai_title', descKey: 'wl_insightai_desc', techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API'], image: wlInsightaiImg, url: 'https://insight-ai-lilac.vercel.app' },
  { titleKey: 'wl_spendly_title', descKey: 'wl_spendly_desc', techs: ['React', 'TypeScript', 'Tailwind CSS'], image: wlSpendlyImg, url: 'https://spendly-lake-eight.vercel.app' },
  // Nouveaux projets — sans capture pour le moment (placeholder), pas de lien public
  { titleKey: 'freelanceos_title', descKey: 'freelanceos_desc', techs: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'], image: freelanceosImg, badge: 'projects_badge_demo' },
  { titleKey: 'kadji_title', descKey: 'kadji_desc', techs: ['Expo', 'React Native'], mobileImages: [kadjiAccueilImg, kadjiCommandesImg], badge: 'projects_badge_test' },
  { titleKey: 'm2app_title', descKey: 'm2app_desc', techs: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase'], image: m2appImg, url: 'https://m2-app-eta.vercel.app' },
];

// Reste des réalisations — révélées via « Voir plus de projets »
const moreProjects: WebCard[] = [
  { titleKey: 'wl_crepescorner_title', descKey: 'wl_crepescorner_desc', techs: ['React', 'TypeScript', 'Tailwind CSS'], image: wlCrepescornerImg, url: 'https://crepescorner.lovable.app' },
  { titleKey: 'wl_nana_title', descKey: 'wl_nana_desc', techs: ['React', 'TypeScript', 'Tailwind CSS'], image: wlNanaImg, url: 'https://nana-delights-site.lovable.app' },
  { titleKey: 'wl_miage_title', descKey: 'wl_miage_desc', techs: ['React', 'TypeScript', 'Tailwind CSS'], image: wlMiageImg, url: 'https://miage-lille-connect.lovable.app' },
  { titleKey: 'wl_benedictines_title', descKey: 'wl_benedictines_desc', techs: ['React', 'TypeScript', 'Tailwind CSS'], image: wlBenedictinesImg, url: 'https://lesbenedictines.lovable.app' },
  { titleKey: 'project_ecommerce_title', descKey: 'project_ecommerce_desc', techs: ['Laravel', 'PHP', 'JavaScript', 'MySQL'], image: jesmoniteImg, github: true },
  { titleKey: 'project_encheres_title', descKey: 'project_encheres_desc', techs: ['JavaScript', 'Node.js', 'socket.io'], image: venteEnchereImg, github: true },
  { titleKey: 'project_bubbleti_title', descKey: 'project_bubbleti_desc', techs: ['JavaScript', 'Node.js', 'MySQL'], image: bubbletiImg, url: 'https://github.com/benhammane/Bubbleti', github: true },
  { titleKey: 'project_recettes_title', descKey: 'project_recettes_desc', techs: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'], image: foodixImg, github: true },
  { titleKey: 'project_shmup_title', descKey: 'project_shmup_desc', techs: ['Java', 'LibGDX'], image: jeuTirImg, github: true },
  { titleKey: 'project_velo_title', descKey: 'project_velo_desc', techs: ['Java', 'MySQL', 'UML'], image: vlilleImg, github: true },
  { titleKey: 'project_railroad_title', descKey: 'project_railroad_desc', techs: ['Java', 'Python', 'WebSocket'], image: railroadImg, github: true },
  { titleKey: 'project_kanban_title', descKey: 'project_kanban_desc', techs: ['JavaScript', 'HTML', 'CSS'], image: kanbanImg, github: true },
  { titleKey: 'project_delidefi_title', descKey: 'project_delidefi_desc', techs: ['App Inventor 2', 'Android'], image: defiGoImg, github: true },
  { titleKey: 'project_bubbele_title', descKey: 'project_bubbele_desc', techs: ['Game Design', 'JavaScript'], image: bubbleJeuImg, url: 'https://github.com/benhammane/Bubulle', github: true },
];

/** Cadre navigateur contenant la capture du projet. */
const ProjectFrame = ({ image, domain, alt }: { image: string; domain: string; alt: string }) => (
  <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-2xl">
    <div className="flex items-center gap-2 border-b border-border/60 bg-background/60 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-red-400/70" />
      <span className="h-3 w-3 rounded-full bg-amber-400/70" />
      <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
      <div className="ml-3 flex-1 truncate rounded-md bg-secondary/70 px-3 py-1 text-center text-[11px] text-muted-foreground">
        {domain}
      </div>
    </div>
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
    </div>
  </div>
);

const FeaturedProject = ({ project, index }: { project: Featured; index: number }) => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const link = project.url || GITHUB;
  const reversed = index % 2 === 1;
  const title = t(project.titleKey);

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
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs text-brand">
            {t(project.categoryKey)}
          </span>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>

        <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h3>

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

        {/* CTA */}
        <LiquidButton
          variant="brand"
          size="md"
          className="mt-8"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
        >
          {project.playable ? t('projects_play') : project.url ? t('projects_view_site') : t('projects_view_github')}
          <ArrowUpRight size={17} />
        </LiquidButton>
      </div>

      {/* Mockup */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={playClick}
        className={`block ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
        aria-label={title}
      >
        <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          <ProjectFrame image={project.image} domain={project.domain} alt={title} />
        </motion.div>
      </a>
    </motion.div>
  );
};

/** Carte compacte : site live, repo GitHub, ou projet sans lien public (placeholder + badge). */
const CompactCard = ({ project }: { project: WebCard }) => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const title = t(project.titleKey);
  const link = project.url ? project.url : project.github ? GITHUB : undefined;
  const CornerIcon = project.github ? Github : ExternalLink;
  const PlaceholderIcon = project.placeholderIcon ?? Sparkles;

  const inner = (
    <>
      <div className={`relative overflow-hidden ${project.mobileImages ? 'h-56' : 'h-44'}`}>
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
        {project.badge && (
          <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
            {t(project.badge)}
          </span>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <span key={tech} className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const cls = 'group flex h-full flex-col overflow-hidden rounded-3xl glass';

  return link ? (
    <motion.a
      variants={staggerItem}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={playClick}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cls}
      aria-label={title}
    >
      {inner}
    </motion.a>
  ) : (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cls}
    >
      {inner}
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading eyebrow="04 — Portfolio" title="Mes" highlight="Projets" subtitle={t('projects_sub')} />

        {/* Projets vedettes — grand format */}
        <div className="space-y-20 md:space-y-28">
          {featured.map((p, i) => (
            <FeaturedProject key={p.titleKey} project={p} index={i} />
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
              <CompactCard key={p.titleKey} project={p} />
            ))}
          </motion.div>
        </div>

        {/* Bouton Voir plus / Voir moins */}
        <div className="mt-12 flex justify-center">
          <LiquidButton
            variant="ghost"
            size="md"
            onClick={() => { playClick(); setShowMore((v) => !v); }}
          >
            {showMore ? t('projects_show_less') : t('projects_show_more')}
            {showMore ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
          </LiquidButton>
        </div>

        {/* Reste des réalisations — révélé au clic */}
        {showMore && (
          <div className="mt-14">
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
                <CompactCard key={p.titleKey} project={p} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
