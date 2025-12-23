import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClickSound } from '@/hooks/useClickSound';
import { useLanguage } from '@/contexts/LanguageContext';
import photo from '@/assert/photoPORTFOLIO.jpeg';
import cvFile from '@/assert/CVBENHAMMANE.pdf';
import { toast } from '@/hooks/use-toast';
import useParallax from '@/hooks/useParallax';

const HeroSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLanguage();

  const handleClick = (callback?: () => void) => {
    playClick();
    callback?.();
  };

  const { ref: parallaxRef1, offset: offset1 } = useParallax(0.08);
  const { ref: parallaxRef2, offset: offset2 } = useParallax(0.04);

  const handleDownloadCV = async () => {
    playClick();
    try {
      const a = document.createElement('a');
      a.href = cvFile;
      a.download = 'CV_Amine_Benhammane.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({ title: t('hero.downloadToast'), description: t('hero.downloadSuccess') });
    } catch (e) {
      toast({ title: t('hero.downloadError'), description: t('hero.downloadErrorMessage') });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={parallaxRef1 as any} style={{ transform: `translateY(${offset1}px)` }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div ref={parallaxRef2 as any} style={{ transform: `translateY(${offset2}px)` }} className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glow animate-pulse-glow">
              <img
                src={photo}
                alt={t('hero.photoAlt')}
                className="w-full h-full object-cover rounded-full ring-4 ring-primary/20 shadow-lg"
                style={{ objectPosition: '80% 15%' }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-primary font-medium mb-4"
            >
              {t('hero.greeting')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-gradient">{t('hero.name')}</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-6"
            >
              {t('hero.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              {t('hero.description')}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                onClick={() => handleClick()}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-smooth hover-lift glow-sm active:scale-95"
              >
                {t('hero.contactMe')}
              </a>
              <button
                onClick={handleDownloadCV}
                className="glass px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/10 transition-smooth hover-lift glow-sm active:scale-95"
              >
                <Download size={18} />
                {t('hero.downloadCV')}
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-4 justify-center lg:justify-start mt-6"
            >
              <a
                href="https://github.com/benhammane"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleClick()}
                className="p-3 glass rounded-lg hover:bg-primary/10 transition-smooth hover-lift glow-sm active:scale-95"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/benhammaneamine/"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleClick()}
                className="p-3 glass rounded-lg hover:bg-primary/10 transition-smooth hover-lift glow-sm active:scale-95"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:benhammanemedamine@gmail.com"
                onClick={() => handleClick()}
                className="p-3 glass rounded-lg hover:bg-primary/10 transition-smooth hover-lift glow-sm active:scale-95"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          href="#about"
          onClick={() => handleClick()}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        >
          <ArrowDown size={24} />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
