import { Camera, Gamepad2, Music, Plane, BookOpen, Coffee, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';
import { useLocale } from '@/lib/LocaleProvider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import montageVideo from '@/assert/montagePORTFOLIO.mp4';

const interests = [
  { icon: Camera, titleKey: 'interest_photo_title', descKey: 'interest_photo_desc' },
  { icon: Plane, titleKey: 'interest_travel_title', descKey: 'interest_travel_desc' },
  { icon: Gamepad2, titleKey: 'interest_sport_title', descKey: 'interest_sport_desc' },
  { icon: Coffee, titleKey: 'interest_dev_title', descKey: 'interest_dev_desc' },
  { icon: BookOpen, titleKey: 'interest_book_title', descKey: 'interest_book_desc' },
  { icon: Music, titleKey: 'interest_music_title', descKey: 'interest_music_desc' },
  { icon: Video, titleKey: 'interest_video_title', descKey: 'interest_video_desc', hasVideo: true },
];

const InterestsSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleCardClick = (interest: typeof interests[0]) => {
    playClick();
    if (interest.hasVideo) {
      setIsVideoOpen(true);
    }
  };

  return (
    <section id="interests" className="section-padding relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('interests_title').split(' ')[0]} <span className="text-gradient">{t('interests_title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('interests_sub')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full mt-4" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <AnimatedSection key={interest.titleKey} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(interest)}
                className="glass rounded-xl p-6 text-center cursor-pointer group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
                >
                  <interest.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-display font-semibold text-lg mb-2">{t(interest.titleKey)}</h3>
                <p className="text-muted-foreground text-sm">{t(interest.descKey)}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
          <DialogHeader className="p-4">
            <DialogTitle>{t('interest_video_title')}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <video
              src={montageVideo}
              controls
              autoPlay
              className="w-full h-full"
              aria-label={t('interest_video_title')}
            >
              {t('interest_video_not_supported')}
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default InterestsSection;
