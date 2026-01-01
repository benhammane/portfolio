import { Code, Palette, Zap, Globe, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';
import { useLocale } from '@/lib/LocaleProvider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import IlePORTFOLIO from '@/assert/IlePORTFOLIO.png';
import portfolioVideo from '@/assert/videoPORTFOLIOAB.mp4';

const skills = [
  { icon: Code, label: 'Frontend', techs: 'React, Vue, TypeScript' },
  { icon: Zap, label: 'Backend', techs: 'Node.js, Python, SQL' },
  { icon: Palette, label: 'Design', techs: 'Figma, UI/UX' },
  { icon: Globe, label: 'DevOps', techs: 'Docker, AWS, CI/CD' },
];

const AboutSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Play preview video when component mounts
    if (videoPreviewRef.current) {
      videoPreviewRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }
  }, []);

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('about_title').split(' ')[0]} <span className="text-gradient">{t('about_title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                {t('about_p1')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-muted-foreground leading-relaxed"
              >
                {t('about_p2')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground leading-relaxed"
              >
                {t('about_p3')}
              </motion.p>
            </div>
          </AnimatedSection>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.label} delay={0.3 + index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={playClick}
                  className="glass rounded-xl p-6 cursor-pointer group"
                >
                  <skill.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-semibold text-lg mb-2">{skill.label}</h3>
                  <p className="text-muted-foreground text-sm">{skill.techs}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Portfolio Video Section - Above the Island */}
        <AnimatedSection delay={0.45}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playClick();
                setIsVideoOpen(true);
              }}
              className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden glass glow cursor-pointer group"
            >
              {/* Video Preview */}
              <div className="relative aspect-video w-full">
                <video
                  ref={videoPreviewRef}
                  src={portfolioVideo}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center group-hover:bg-black/20 transition-colors">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-4 p-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30"
                  >
                    <Play className="w-12 h-12 md:w-16 md:h-16 text-primary fill-primary/30" />
                  </motion.div>
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white text-center px-4 drop-shadow-lg">
                    {t('about_video_cta')}
                  </h3>
                </div>
              </div>

              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          </motion.div>
        </AnimatedSection>

        {/* Interactive Island Video Section */}
        <AnimatedSection delay={0.5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <a
              href="https://island-navigator.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="block group"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden glass glow cursor-pointer"
              >
                {/* Catchy Text */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-4 p-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30"
                  >
                    <Play className="w-12 h-12 md:w-16 md:h-16 text-primary fill-primary/30" />
                  </motion.div>
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white text-center px-4 drop-shadow-lg">
                    {t('video_cta')}
                  </h3>
                </div>

                {/* Cover Image */}
                <div className="aspect-video w-full relative">
                  <img
                    src={IlePORTFOLIO}
                    alt="Island Navigator Preview"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.4)_100%)]" />
                </div>

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            </a>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
          <DialogHeader className="p-4">
            <DialogTitle>{t('about_video_title')}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <video
              src={portfolioVideo}
              controls
              autoPlay
              className="w-full h-full"
              aria-label={t('about_video_title')}
            >
              {t('interest_video_not_supported')}
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AboutSection;
