import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useTranslation } from 'react-i18next';

const ParcoursSection = () => {
    const { t } = useTranslation();
    const parcoursCount = 4; // Number of education entries

    return (
        <section id="parcours" className="section-padding relative">
            <div className="container mx-auto px-6 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                            {t('parcours.title')} <span className="text-gradient">{t('parcours.titleHighlight')}</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            {t('parcours.subtitle')}
                        </p>
                    </div>
                </AnimatedSection>

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-6">
                        {Array.from({ length: parcoursCount }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                                className="glass rounded-xl p-6 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <GraduationCap className="text-primary" />
                                </div>
                                <div>
                                    <div className="font-display font-semibold">{t(`parcours.list.${i}.degree`)}</div>
                                    <div className="text-muted-foreground text-sm">{t(`parcours.list.${i}.school`)}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ParcoursSection;
