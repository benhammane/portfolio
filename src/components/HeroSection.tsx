import { ArrowRight, ArrowDown, Github, Linkedin, Mail, Download, Briefcase } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { trackCvDownload, trackSocialClick, trackAgencyClick } from '@/lib/analytics';
import { useClickSound } from '@/hooks/useClickSound';
import cvFile from '@/assert/CVBENHAMMANE.pdf';
import { toast } from '@/hooks/use-toast';
import { useLocale } from '@/lib/LocaleProvider';
import Magnetic from '@/components/fx/Magnetic';
import Counter from '@/components/fx/Counter';
import HeroStage from '@/components/fx/HeroStage';

// Archivé le 2026-09-15 : le bouton "Mes projets web · WebLocal" est redondant
// depuis que les réalisations WebLocal sont importées dans la section Projets.
// Code conservé — repasser à true pour le réafficher.
const SHOW_WEBLOCAL_BUTTON = false;

// Entrée courte et non bloquante (classes .hero-* dans index.css) : en CSS pur, elle
// démarre dès le HTML pré-rendu au lieu d'attendre l'hydratation de Framer Motion.

const HeroSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();

  const handleClick = (callback?: () => void) => {
    playClick();
    callback?.();
  };

  const handleDownloadCV = () => {
    playClick();
    trackCvDownload();
    try {
      const a = document.createElement('a');
      a.href = cvFile;
      a.download = 'CV_Amine_Benhammane.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast({ title: 'CV', description: t('toast_download') });
    } catch {
      toast({ title: 'Erreur', description: t('toast_error') });
    }
  };

  const socials = [
    { icon: Github, href: 'https://github.com/benhammane', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/benhammaneamine/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:benhammanemedamine@gmail.com', label: 'Email' },
  ];

  const stats = [
    { to: 25, suffix: '+', label: t('stat_projects') },
    { to: 13, suffix: '+', label: t('stat_techs') },
  ];

  return (
    <>
      <section
        id="hero"
        className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 md:pt-32"
      >
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            {/* ---------- Texte ---------- */}
            <div className="max-w-2xl text-center lg:text-left">
              <div
                style={{ animationDelay: '0s' }}
                className="hero-rise mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/50 px-3.5 py-1.5 text-[13px]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-foreground/90">{t('hero_badge_available')}</span>
                <span className="hidden text-muted-foreground sm:inline">· {t('hero_badge_extra')}</span>
              </div>

              <p
                style={{ animationDelay: '0.05s' }}
                className="hero-rise mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
              >
                {t('hero_hello')}
              </p>

              {/* Nom : révélation par masque, une ligne par mot */}
              <h1 className="font-display text-[clamp(2.9rem,8vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                {['Amine', 'Benhammane'].map((word, wi) => (
                  <span key={word} className="block overflow-hidden pb-[0.08em]">
                    <span
                      style={{ animationDelay: `${0.1 + wi * 0.08}s` }}
                      className={`hero-mask-up inline-block ${wi === 1 ? 'text-accent-brand' : ''}`}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </h1>

              <p
                style={{ animationDelay: '0.3s' }}
                className="hero-rise mt-6 font-display text-xl font-medium tracking-tight text-foreground/85 md:text-2xl"
              >
                {t('hero_title_role')}
              </p>

              <p
                style={{ animationDelay: '0.38s' }}
                className="hero-rise mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground lg:mx-0"
              >
                {t('hero_description')}
              </p>

              {/* CTAs : projets en premier, contact ensuite, CV en action secondaire */}
              <div
                style={{ animationDelay: '0.46s' }}
                className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              >
                <Magnetic>
                  <a
                    href="#projects"
                    onClick={() => handleClick()}
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform active:scale-[0.97]"
                  >
                    {t('hero_cta_projects')}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    href="#contact"
                    onClick={() => handleClick()}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand/50 hover:text-brand"
                  >
                    {t('hero_cta_contact')}
                  </a>
                </Magnetic>

                <button
                  type="button"
                  onClick={handleDownloadCV}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Download size={16} />
                  {t('hero_download_cv')}
                </button>

                {SHOW_WEBLOCAL_BUTTON && (
                  <LiquidButton
                    variant="amber"
                    size="md"
                    href="https://adamine.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { handleClick(); trackAgencyClick(); }}
                  >
                    <Briefcase size={18} />
                    {t('hero_freelance')}
                  </LiquidButton>
                )}
              </div>

              {/* Réseaux + chiffres */}
              <div
                style={{ animationDelay: '0.54s' }}
                className="hero-rise mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 border-t border-border/60 pt-7 lg:justify-start"
              >
                <div className="flex items-center gap-2">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noreferrer"
                      aria-label={label}
                      onClick={() => { handleClick(); trackSocialClick(label); }}
                      className="rounded-full border border-border/70 p-2.5 text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>

                <div className="flex items-center gap-8">
                  {stats.map((s) => (
                    <div key={s.label} className="text-left">
                      <div className="font-display text-2xl font-semibold tabular-nums">
                        <Counter to={s.to} suffix={s.suffix} />
                      </div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ---------- Scène 3D interactive ---------- */}
            <div className="hero-stage-in">
              <HeroStage
                projectLabel={t('hero_stage_label')}
                etooTitle={t('project_etoo_title')}
                luxTitle={t('wl_luxestate_title')}
              />
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <a
          href="#about"
          onClick={() => handleClick()}
          aria-label={t('hero_scroll')}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-brand md:flex"
        >
          {t('hero_scroll')}
          <ArrowDown size={13} className="motion-safe:animate-bounce" />
        </a>
      </section>
    </>
  );
};

export default HeroSection;
