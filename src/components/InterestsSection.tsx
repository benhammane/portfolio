import { Gamepad2, Music, Plane, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useClickSound } from '@/hooks/useClickSound';
import { useLocale } from '@/lib/LocaleProvider';
import SectionHeading from '@/components/fx/SectionHeading';
import LazyVideo from '@/components/fx/LazyVideo';
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
            <motion.button
              type="button"
              key={interest.titleKey}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              onClick={() => handleCardClick(interest)}
              aria-haspopup="dialog"
              className="group block w-full overflow-hidden rounded-3xl surface text-left transition-colors duration-300 hover:border-brand/30"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <LazyVideo
                  src={interest.video}
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden />
                  </span>
                </div>
                <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-background/70 text-brand backdrop-blur-md">
                  <interest.icon size={16} aria-hidden />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold transition-colors group-hover:text-brand">
                  {t(interest.titleKey)}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(interest.descKey)}</p>
              </div>
            </motion.button>
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
