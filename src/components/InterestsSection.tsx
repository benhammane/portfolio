import { Gamepad2, Music, Plane, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useClickSound } from '@/hooks/useClickSound';
import { useLocale } from '@/lib/LocaleProvider';
import SectionHeading from '@/components/fx/SectionHeading';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import montageVideo from '@/assert/montagePORTFOLIO.mp4';
import sportVideo from '@/assert/sportPORTFOLIO.mp4';
import voyageVideo from '@/assert/voyagePORTFOLIO4.mp4';
import streamingVideo from '@/assert/streamingPORTFOLIO.mp4';

const interests = [
  { icon: Plane, titleKey: 'interest_travel_title', descKey: 'interest_travel_desc', video: voyageVideo },
  { icon: Gamepad2, titleKey: 'interest_sport_title', descKey: 'interest_sport_desc', video: sportVideo },
  { icon: Music, titleKey: 'interest_music_title', descKey: 'interest_music_desc', video: streamingVideo },
  { icon: Play, titleKey: 'interest_video_title', descKey: 'interest_video_desc', video: montageVideo },
];

const InterestsSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const [selectedInterest, setSelectedInterest] = useState<typeof interests[0] | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => video?.play().catch(() => {}));
  }, []);

  const handleCardClick = (interest: typeof interests[0]) => {
    playClick();
    setSelectedInterest(interest);
  };

  return (
    <section id="interests" className="section-padding relative">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading
          eyebrow="07 — Au-delà du code"
          title="Centres"
          highlight="d'intérêt"
          subtitle={t('interests_sub')}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.titleKey}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => handleCardClick(interest)}
              className="group cursor-pointer overflow-hidden rounded-3xl glass"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <video
                  ref={(el) => { videoRefs.current[interest.titleKey] = el; }}
                  src={interest.video}
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/90 shadow-lg backdrop-blur-sm transition-transform"
                  >
                    <Play className="ml-1 h-6 w-6 text-primary-foreground" fill="currentColor" />
                  </motion.div>
                </div>
                <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-background/70 text-brand backdrop-blur-md">
                  <interest.icon size={16} />
                </div>
              </div>
              <div className="p-5 text-center">
                <h3 className="font-display font-semibold transition-colors group-hover:text-brand">
                  {t(interest.titleKey)}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(interest.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedInterest} onOpenChange={(open) => !open && setSelectedInterest(null)}>
        <DialogContent className="w-full max-w-4xl overflow-hidden p-0">
          <DialogHeader className="p-4">
            <DialogTitle>{selectedInterest ? t(selectedInterest.titleKey) : ''}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <video
              src={selectedInterest?.video}
              controls
              autoPlay
              className="h-full w-full"
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
