import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, Briefcase, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickSound } from '@/hooks/useClickSound';
import photo from '@/assert/photoPORTFOLIO.jpeg';
import cvFile from '@/assert/CVBENHAMMANE.pdf';
import { toast } from '@/hooks/use-toast';
import { useLocale } from '@/lib/LocaleProvider';
import Magnetic from '@/components/fx/Magnetic';
import Counter from '@/components/fx/Counter';

const HeroSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [t('hero_role_1'), t('hero_role_2'), t('hero_role_3'), t('hero_role_4'), t('hero_role_5')];

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  const handleClick = (callback?: () => void) => {
    playClick();
    callback?.();
  };

  const handleDownloadCV = () => {
    playClick();
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

  const name = 'Amine Benhammane';

  const socials = [
    { icon: Github, href: 'https://github.com/benhammane', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/benhammaneamine/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:benhammanemedamine@gmail.com', label: 'Email' },
  ];

  const stats = [
    { to: 20, suffix: '+', label: t('stat_projects') },
    { to: 13, suffix: '+', label: t('stat_techs') },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="border-gradient relative mx-auto max-w-6xl rounded-[2.5rem] bg-card/30 px-6 py-12 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:px-12 sm:py-14 lg:px-16"
        >
          {/* lueur de marque diffuse derrière le cadre */}
          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[0_0_120px_-30px_hsl(var(--brand)/0.4)]" />
          <div className="relative flex flex-col-reverse items-center gap-14 lg:flex-row lg:justify-between lg:gap-16">
          {/* ---------- Texte ---------- */}
          <div className="max-w-xl text-center lg:text-left">
            {/* Badge dispo */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-4 py-1.5 text-sm backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-muted-foreground">
                {t('hero_badge_available')}
                <span className="mx-1.5 text-border">·</span>
                <span className="text-foreground/80">{t('hero_badge_extra')}</span>
              </span>
            </motion.div>

            {/* Salutation */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-brand"
            >
              {t('hero_hello')}
            </motion.p>

            {/* Nom (reveal mot par mot) */}
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              {name.split(' ').map((word, wi) => (
                <span key={word} className="mr-3 inline-block overflow-hidden align-bottom">
                  <motion.span
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + wi * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-gradient-animated"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Rôle rotatif */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-5 flex h-9 items-center justify-center gap-2 text-xl text-muted-foreground md:text-2xl lg:justify-start"
            >
              <Sparkles size={18} className="text-brand" />
              <div className="relative h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="block whitespace-nowrap font-medium text-foreground"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mx-auto mt-6 max-w-lg leading-relaxed text-muted-foreground lg:mx-0"
            >
              {t('hero_description')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Magnetic>
                <div className="relative">
                  {/* aura lumineuse qui respire */}
                  <div className="absolute -inset-1 rounded-full bg-brand-gradient opacity-70 blur-md animate-pulse" />
                  <a
                    href="#contact"
                    onClick={() => handleClick()}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-7 py-3 font-medium text-primary-foreground transition-transform active:scale-95"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                    {t('hero_cta_contact')}
                  </a>
                </div>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={handleDownloadCV}
                  className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium transition-smooth hover:bg-brand/10 active:scale-95"
                >
                  <Download size={18} />
                  {t('hero_download_cv')}
                </button>
              </Magnetic>

              <a
                href="https://adamine.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick()}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/60 px-6 py-3 font-medium text-amber-500 transition-smooth hover:bg-amber-500 hover:text-background active:scale-95"
              >
                <Briefcase size={18} />
                {t('hero_freelance')}
              </a>
            </motion.div>

            {/* Réseaux */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6 flex items-center justify-center gap-3 lg:justify-start"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  onClick={() => handleClick()}
                  className="rounded-full glass p-3 text-muted-foreground transition-smooth hover:-translate-y-1 hover:text-brand"
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-10 flex items-center justify-center gap-8 border-t border-border/60 pt-6 lg:justify-start"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="font-display text-3xl font-bold text-gradient">
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---------- Photo ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0"
          >
            {/* Anneau dégradé rotatif */}
            <div className="absolute -inset-4 rounded-full bg-[conic-gradient(from_0deg,hsl(var(--brand)),hsl(var(--brand-3)),hsl(var(--brand-2)),hsl(var(--brand)))] opacity-40 blur-md animate-spin-slow" />
            <div className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,hsl(var(--brand)),hsl(var(--brand-3)),hsl(var(--brand-2)),hsl(var(--brand)))] animate-spin-slow" />

            <div className="relative h-64 w-64 overflow-hidden rounded-full ring-1 ring-white/10 md:h-80 md:w-80">
              <img
                src={photo}
                alt="Amine Benhammane"
                className="h-full w-full rounded-full object-cover"
                style={{ objectPosition: '80% 15%' }}
              />
            </div>

            {/* Étiquette flottante */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-2 -left-4 flex items-center gap-2 rounded-2xl glass px-4 py-2.5 shadow-lg"
            >
              <Sparkles size={16} className="text-brand" />
              <span className="text-sm font-medium">Full-Stack</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -right-4 top-6 rounded-2xl glass px-4 py-2.5 shadow-lg"
            >
              <span className="font-mono text-sm text-brand">{'</>'}</span>
            </motion.div>
          </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <motion.a
        href="#about"
        onClick={() => handleClick()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-brand sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{t('hero_scroll')}</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-border p-1">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-brand"
          />
        </span>
      </motion.a>
    </section>
  );
};

export default HeroSection;
