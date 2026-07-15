import { ArrowUpRight, Github, Check } from 'lucide-react';
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
}

// ⭐ 4 projets vedettes
const featured: Featured[] = [
  {
    titleKey: 'project_ecommerce_title',
    categoryKey: 'project_ecommerce_category',
    year: '2022',
    descKey: 'project_ecommerce_desc',
    calloutKey: 'project_ecommerce_callout',
    highlightKeys: ['project_ecommerce_h1', 'project_ecommerce_h2', 'project_ecommerce_h3', 'project_ecommerce_h4'],
    techs: ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
    image: jesmoniteImg,
    domain: 'e-commerce.demo',
  },
  {
    titleKey: 'project_encheres_title',
    categoryKey: 'project_encheres_category',
    year: '2023',
    descKey: 'project_encheres_desc',
    calloutKey: 'project_encheres_callout',
    highlightKeys: ['project_encheres_h1', 'project_encheres_h2', 'project_encheres_h3', 'project_encheres_h4'],
    techs: ['JavaScript', 'Node.js', 'socket.io', 'WebPack'],
    image: venteEnchereImg,
    domain: 'encheres.demo',
  },
  {
    titleKey: 'project_bubbleti_title',
    categoryKey: 'project_bubbleti_category',
    year: '2024',
    descKey: 'project_bubbleti_desc',
    calloutKey: 'project_bubbleti_callout',
    highlightKeys: ['project_bubbleti_h1', 'project_bubbleti_h2', 'project_bubbleti_h3', 'project_bubbleti_h4'],
    techs: ['JavaScript', 'Node.js', 'MySQL'],
    image: bubbletiImg,
    domain: 'bubbleti.demo',
    url: 'https://github.com/benhammane/Bubbleti',
  },
  {
    titleKey: 'project_recettes_title',
    categoryKey: 'project_recettes_category',
    year: '2021',
    descKey: 'project_recettes_desc',
    calloutKey: 'project_recettes_callout',
    highlightKeys: ['project_recettes_h1', 'project_recettes_h2', 'project_recettes_h3', 'project_recettes_h4'],
    techs: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    image: foodixImg,
    domain: 'recettes.demo',
  },
];

// Autres réalisations (grille compacte)
const others = [
  { titleKey: 'project_shmup_title', descKey: 'project_shmup_desc', techs: ['Java', 'LibGDX'], image: jeuTirImg },
  { titleKey: 'project_velo_title', descKey: 'project_velo_desc', techs: ['Java', 'MySQL', 'UML'], image: vlilleImg },
  { titleKey: 'project_railroad_title', descKey: 'project_railroad_desc', techs: ['Java', 'Python', 'WebSocket'], image: railroadImg },
  { titleKey: 'project_kanban_title', descKey: 'project_kanban_desc', techs: ['JavaScript', 'HTML', 'CSS'], image: kanbanImg },
  { titleKey: 'project_delidefi_title', descKey: 'project_delidefi_desc', techs: ['App Inventor 2', 'Android'], image: defiGoImg },
  { titleKey: 'project_bubbele_title', descKey: 'project_bubbele_desc', techs: ['Game Design', 'JavaScript'], image: bubbleJeuImg, url: 'https://github.com/benhammane/Bubulle' },
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
          {project.url ? t('projects_view_site') : t('projects_view_github')}
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

const ProjectsSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading eyebrow="04 — Portfolio" title="Mes" highlight="Projets" subtitle={t('projects_sub')} />

        {/* Projets vedettes */}
        <div className="space-y-20 md:space-y-28">
          {featured.map((p, i) => (
            <FeaturedProject key={p.titleKey} project={p} index={i} />
          ))}
        </div>

        {/* Autres réalisations */}
        <div className="mt-24">
          <div className="mb-10 flex items-center gap-4">
            <h3 className="font-display text-xl font-semibold">{t('projects_others_heading')}</h3>
            <span className="h-px flex-1 bg-border/60" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {others.map((project) => {
              const title = t(project.titleKey);
              return (
                <motion.a
                  key={project.titleKey}
                  href={project.url || GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={staggerItem}
                  onClick={playClick}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="group flex flex-col overflow-hidden rounded-3xl glass"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={project.image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <div className="absolute right-3 top-3 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                      <Github size={15} />
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <h4 className="font-display font-semibold transition-colors group-hover:text-brand">{title}</h4>
                    <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">{t(project.descKey)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techs.map((tech) => (
                        <span key={tech} className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
