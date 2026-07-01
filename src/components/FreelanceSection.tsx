import { motion } from 'framer-motion';
import {
  ArrowUpRight, Globe, Zap, CheckCircle2, Rocket,
  ShoppingCart, LayoutGrid, Search,
} from 'lucide-react';
import { useLocale } from '@/lib/LocaleProvider';
import { useClickSound } from '@/hooks/useClickSound';

const AGENCY_URL = 'https://adamine.vercel.app';

/** Maquette de navigateur stylisée représentant le site de l'agence. */
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

    {/* Page factice */}
    <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-background via-card to-background p-5">
      <div className="absolute right-6 top-8 h-24 w-24 rounded-full bg-brand/20 blur-2xl" />

      {/* Nav du site */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded bg-brand" />
          <span className="text-xs font-bold">WebLocal</span>
        </div>
        <div className="hidden gap-2 sm:flex">
          {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-8 rounded bg-muted" />)}
        </div>
        <span className="h-5 w-14 rounded-full bg-brand/80" />
      </div>

      {/* Hero du site */}
      <div className="relative mt-8 space-y-2.5">
        <div className="h-3 w-3/4 rounded bg-foreground/80" />
        <div className="h-3 w-1/2 rounded bg-gradient-to-r from-brand to-brand-3" />
        <div className="h-2 w-2/3 rounded bg-muted" />
        <div className="mt-3 flex gap-2">
          <span className="h-6 w-24 rounded-full bg-brand" />
          <span className="h-6 w-20 rounded-full border border-border" />
        </div>
      </div>

      {/* Cartes du site */}
      <div className="relative mt-6 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-border/50 bg-card/60 p-2">
            <span className="mb-1.5 block h-4 w-4 rounded bg-brand/70" />
            <span className="mb-1 block h-1.5 w-full rounded bg-muted" />
            <span className="block h-1.5 w-2/3 rounded bg-muted" />
          </div>
        ))}
      </div>
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

  return (
    <section id="freelance" className="section-padding relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border-gradient relative overflow-hidden rounded-[2.5rem] glass p-8 md:p-12"
        >
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
              className="block"
              aria-label="WebLocal"
            >
              <BrowserMockup note={t('freelance_note')} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreelanceSection;
