import { Code, Palette, Zap, Globe, Play, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useClickSound } from '@/hooks/useClickSound';
import { useLocale } from '@/lib/LocaleProvider';
import SectionHeading from '@/components/fx/SectionHeading';
import LazyVideo from '@/components/fx/LazyVideo';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import IlePORTFOLIO from '@/assert/IlePORTFOLIO.webp';
import portfolioVideo from '@/assert/videoportfolioAB9.mp4';

const skills = [
  { icon: Code, label: 'Frontend', techs: 'React, TypeScript, Tailwind' },
  { icon: Zap, label: 'Backend', techs: 'Node.js, Laravel, Python' },
  { icon: Palette, label: 'Design', techs: 'Figma, UI/UX' },
  { icon: Globe, label: 'Outils', techs: 'Git, MySQL, REST' },
];

const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const AboutSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="about" className="section-padding relative">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading eyebrow="01 — Profil" title="À propos de" highlight="moi" />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <p className="text-lg leading-relaxed text-foreground/90">{t('about_p1')}</p>
            <p className="leading-relaxed text-muted-foreground">{t('about_p2')}</p>
            <p className="leading-relaxed text-muted-foreground">{t('about_p3')}</p>
          </motion.div>

          {/* Cartes compétences */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                onMouseMove={handleSpotlight}
                onClick={playClick}
                className="card-spotlight group cursor-pointer rounded-2xl glass p-6"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-transform group-hover:scale-110">
                  <skill.icon size={22} />
                </div>
                <h3 className="font-display text-base font-semibold">{skill.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{skill.techs}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vidéo de présentation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => { playClick(); setIsVideoOpen(true); }}
            className="group relative mx-auto max-w-3xl cursor-pointer overflow-hidden rounded-3xl glass border-gradient glow-sm"
          >
            <div className="relative aspect-video w-full">
              <LazyVideo
                src={portfolioVideo}
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition-colors group-hover:bg-black/25">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-4 rounded-full border border-brand/40 bg-brand/20 p-4 backdrop-blur-sm"
                >
                  <Play className="h-10 w-10 fill-brand/30 text-brand md:h-12 md:w-12" />
                </motion.div>
                <h3 className="px-4 text-center font-display text-xl font-bold text-white drop-shadow-lg md:text-2xl">
                  {t('about_video_cta')}
                </h3>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Île interactive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8"
        >
          <a
            href="https://island-navigator.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="group block"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative mx-auto max-w-3xl cursor-pointer overflow-hidden rounded-3xl glass border-gradient glow-sm"
            >
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-4 rounded-full border border-brand/40 bg-brand/20 p-4 backdrop-blur-sm"
                >
                  <Play className="h-10 w-10 fill-brand/30 text-brand md:h-12 md:w-12" />
                </motion.div>
                <h3 className="flex items-center gap-2 px-4 text-center font-display text-xl font-bold text-white drop-shadow-lg md:text-2xl">
                  {t('video_cta')}
                  <ArrowUpRight className="hidden transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:inline" />
                </h3>
              </div>
              <div className="relative aspect-video w-full">
                <img
                  src={IlePORTFOLIO}
                  alt="Island Navigator"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </motion.div>
          </a>
        </motion.div>
      </div>

      {/* Modale vidéo */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="w-full max-w-4xl overflow-hidden p-0">
          <DialogHeader className="p-4">
            <DialogTitle>{t('about_video_title')}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <video src={portfolioVideo} controls autoPlay className="h-full w-full" aria-label={t('about_video_title')}>
              {t('interest_video_not_supported')}
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AboutSection;
