import { Camera, Gamepad2, Music, Plane, BookOpen, Coffee, Play } from 'lucide-react';
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
import montageVideo from '@/assert/montagePORTFOLIO.mp4';
import sportVideo from '@/assert/sportPORTFOLIO.mp4';
import voyageVideo from '@/assert/voyagePORTFOLIO4.mp4';
import streamingVideo from '@/assert/streamingPORTFOLIO.mp4';

const interests = [
  { icon: Camera, titleKey: 'interest_photo_title', descKey: 'interest_photo_desc' },
  { icon: Plane, titleKey: 'interest_travel_title', descKey: 'interest_travel_desc', hasVideo: true, video: voyageVideo },
  { icon: Gamepad2, titleKey: 'interest_sport_title', descKey: 'interest_sport_desc', hasVideo: true, video: sportVideo },
  { icon: Coffee, titleKey: 'interest_dev_title', descKey: 'interest_dev_desc' },
  { icon: BookOpen, titleKey: 'interest_book_title', descKey: 'interest_book_desc' },
  { icon: Music, titleKey: 'interest_music_title', descKey: 'interest_music_desc', hasVideo: true, video: streamingVideo },
  { icon: Play, titleKey: 'interest_video_title', descKey: 'interest_video_desc', hasVideo: true, video: montageVideo },
];

const InterestsSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const [selectedInterest, setSelectedInterest] = useState<typeof interests[0] | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    // Play preview videos when component mounts
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.play().catch(() => {
          // Autoplay might be blocked, that's okay
        });
      }
    });
  }, []);

  const handleCardClick = (interest: typeof interests[0]) => {
    playClick();
    if (interest.hasVideo) {
      setSelectedInterest(interest);
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
              {interest.hasVideo ? (
                <motion.div
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCardClick(interest)}
                  className="glass rounded-xl overflow-hidden cursor-pointer group"
                >
                  {/* Video Preview */}
                  <div className="relative aspect-video w-full">
                    <video
                      ref={(el) => { videoRefs.current[interest.titleKey] = el; }}
                      src={interest.video}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {/* Play overlay */}
                    <div 
                      className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors"
                      role="button"
                      aria-label={t(interest.titleKey)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center"
                      >
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-display font-semibold text-lg mb-2">{t(interest.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(interest.descKey)}</p>
                  </div>
                </motion.div>
              ) : (
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
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedInterest} onOpenChange={(open) => !open && setSelectedInterest(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
          <DialogHeader className="p-4">
            <DialogTitle>{selectedInterest ? t(selectedInterest.titleKey) : ''}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <video
              src={selectedInterest?.video}
              controls
              autoPlay
              className="w-full h-full"
              aria-label={selectedInterest ? t(selectedInterest.titleKey) : ''}
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
