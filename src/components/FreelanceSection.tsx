import { motion } from 'framer-motion';
import {
  ArrowUpRight, Globe, Zap, CheckCircle2, Rocket,
  ShoppingCart, LayoutGrid, Search, Palette, Code2,
} from 'lucide-react';
import { useLocale } from '@/lib/LocaleProvider';
import { useClickSound } from '@/hooks/useClickSound';
import { ShineBorder } from '@/components/ui/shine-border';
import weblocalScreenshot from '@/assert/weblocal-screenshot.webp';

const AGENCY_URL = 'https://adamine.vercel.app';

// Dégradé de marque (teal → cyan → indigo) utilisé par la ShineBorder — suit le thème du portfolio.
const SHINE_COLORS = ['hsl(var(--brand))', 'hsl(var(--brand-2))', 'hsl(var(--brand-3))'];

/** Étape du processus WebLocal, reliée par un connecteur vertical (sauf la dernière). */
const ProcessStep = ({
  index,
  icon: Icon,
  title,
  description,
  isLast,
}: {
  index: number;
  icon: typeof Search;
  title: string;
  description: string;
  isLast: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative flex gap-4"
  >
    <div className="relative flex shrink-0 flex-col items-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/25">
        <Icon size={18} />
      </div>
      {!isLast && <div className="mt-2 w-px flex-1 bg-gradient-to-b from-brand/40 to-transparent" />}
    </div>
    <div className={isLast ? '' : 'pb-8'}>
      <p className="font-mono text-xs text-brand">0{index + 1}</p>
      <h4 className="font-display font-semibold">{title}</h4>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

/** Maquette de navigateur avec la vraie capture d'écran du site de l'agence. */
const BrowserMockup = ({ note }: { note: string }) => (
  <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-2xl backdrop-blur">
    {/* Barre du navigateur */}
    <div className="flex items-center gap-2 border-b border-border/60 bg-background/60 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-red-400/70" />
      <span className="h-3 w-3 rounded-full bg-amber-400/70" />
      <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
      <div className="ml-3 flex-1 truncate rounded-md bg-secondary/70 px-3 py-1 text-center text-[11px] text-muted-foreground">
        adamine.vercel.app
      </div>
    </div>

    {/* Vraie capture du site */}
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <img
        src={weblocalScreenshot}
        alt="Aperçu du site WebLocal"
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
    </div>

    {/* Badge "en ligne" flottant */}
    <div className="absolute right-4 top-16 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      {note}
    </div>
  </div>
);

const FreelanceSection = () => {
  const { t } = useLocale();
  const { playClick } = useClickSound();

  const services = [
    { icon: LayoutGrid, key: 'freelance_s1' },
    { icon: ShoppingCart, key: 'freelance_s2' },
    { icon: Zap, key: 'freelance_s3' },
    { icon: Search, key: 'freelance_s4' },
  ];

  const stats = [
    { icon: Rocket, key: 'freelance_stat_full' },
    { icon: CheckCircle2, key: 'freelance_stat_custom' },
    { icon: Zap, key: 'freelance_stat_response' },
  ];

  const process = [
    { icon: Search, titleKey: 'freelance_process_1_title', descKey: 'freelance_process_1_desc' },
    { icon: Palette, titleKey: 'freelance_process_2_title', descKey: 'freelance_process_2_desc' },
    { icon: Code2, titleKey: 'freelance_process_3_title', descKey: 'freelance_process_3_desc' },
    { icon: Rocket, titleKey: 'freelance_process_4_title', descKey: 'freelance_process_4_desc' },
  ];

  return (
    <section id="freelance" className="section-padding relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ShineBorder animée sur le panneau principal : c'est la vitrine qui doit accrocher l'œil du client.
              Halo flouté derrière pour renforcer l'effet (même dégradé que l'anneau). */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-3 rounded-[46px] bg-[conic-gradient(from_0deg,hsl(var(--brand)),hsl(var(--brand-2)),hsl(var(--brand-3)),hsl(var(--brand)))] opacity-40 blur-2xl motion-safe:animate-spin-slow" />
            <ShineBorder color={SHINE_COLORS} borderWidth={3} duration={7} borderRadius={40}>
              <div className="relative overflow-hidden rounded-[2.5rem] glass p-8 md:p-12">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/15 blur-[110px]" />

                <div className="relative grid items-center gap-10 lg:grid-cols-2">
                  {/* ---------- Contenu ---------- */}
                  <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-brand">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                      </span>
                      {t('freelance_eyebrow')}
                    </div>

                    <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                      Web<span className="text-gradient-animated">Local</span>
                    </h2>
                    <p className="mt-2 text-lg text-muted-foreground">{t('freelance_tagline')}</p>
                    <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{t('freelance_pitch')}</p>

                    {/* Services */}
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {services.map(({ icon: Icon, key }) => (
                        <span
                          key={key}
                          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3.5 py-1.5 text-sm"
                        >
                          <Icon size={14} className="text-brand" /> {t(key)}
                        </span>
                      ))}
                    </div>

                    {/* Mini-preuves */}
                    <div className="mt-7 grid grid-cols-3 gap-3">
                      {stats.map(({ icon: Icon, key }) => (
                        <div key={key} className="rounded-2xl border border-border/50 bg-card/30 p-3 text-center">
                          <Icon size={18} className="mx-auto mb-1.5 text-brand" />
                          <div className="text-xs leading-tight text-muted-foreground">{t(key)}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-8">
                      <a
                        href={AGENCY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-7 py-3.5 font-medium text-primary-foreground transition-transform active:scale-95 glow-sm"
                      >
                        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                        <Globe size={18} />
                        {t('freelance_cta')}
                        <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>

                  {/* ---------- Maquette ---------- */}
                  <motion.a
                    href={AGENCY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    whileHover={{ y: -6, rotate: -0.5 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="group block"
                    aria-label="WebLocal"
                  >
                    <BrowserMockup note={t('freelance_note')} />
                  </motion.a>
                </div>
              </div>
            </ShineBorder>
          </div>
        </motion.div>

        {/* ---------- Notre méthode ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <ShineBorder color={SHINE_COLORS} borderWidth={2.5} duration={9} borderRadius={40}>
            <div className="glass rounded-[2.5rem] p-8 md:p-12">
              <div className="mb-9 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-brand">
                  {t('freelance_process_eyebrow')}
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {t('freelance_process_title')}
                </h3>
              </div>

              <div className="mx-auto max-w-md">
                {process.map((step, i) => (
                  <ProcessStep
                    key={step.titleKey}
                    index={i}
                    icon={step.icon}
                    title={t(step.titleKey)}
                    description={t(step.descKey)}
                    isLast={i === process.length - 1}
                  />
                ))}
              </div>
            </div>
          </ShineBorder>
        </motion.div>
      </div>
    </section>
  );
};

export default FreelanceSection;
