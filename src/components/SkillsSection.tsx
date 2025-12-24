import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AnimatedSection from './AnimatedSection';
import { useTranslation } from 'react-i18next';

const SkillPill = ({ name, index }: { name: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ scale: 1.04 }}
      className="inline-flex items-center gap-3 px-4 py-2 bg-secondary text-secondary-foreground rounded-full shadow-sm hover-lift glow-sm transition-smooth"
    >
      <span className="font-medium text-sm">{name}</span>
    </motion.div>
  );
};

const SkillsSection = () => {
  const { t } = useTranslation();
  const skills = t('skills.items', { returnObjects: true }) as string[];

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('skills.title')} <span className="text-gradient">{t('skills.titleHighlight')}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('skills.subtitle')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full mt-4" />
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {skills.map((skill, index) => (
              <SkillPill key={skill} name={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
