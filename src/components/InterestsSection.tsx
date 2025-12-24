import { Camera, Gamepad2, Music, Plane, BookOpen, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';
import { useTranslation } from 'react-i18next';

const InterestsSection = () => {
  const { playClick } = useClickSound();
  const { t } = useTranslation();

  const interests = [
    { icon: Camera },
    { icon: Plane },
    { icon: Gamepad2 },
    { icon: Coffee },
    { icon: BookOpen },
    { icon: Music },
  ];

  return (
    <section id="interests" className="section-padding relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('interests.title')} <span className="text-gradient">{t('interests.titleHighlight')}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('interests.subtitle')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full mt-4" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={playClick}
                className="glass rounded-xl p-6 text-center cursor-pointer group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
                >
                  <interest.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-display font-semibold text-lg mb-2">{t(`interests.list.${index}.title`)}</h3>
                <p className="text-muted-foreground text-sm">{t(`interests.list.${index}.description`)}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;
