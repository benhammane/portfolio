import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useLocale } from '@/lib/LocaleProvider';

const parcours = [
    { degree: "L1 Informatique Mathématique", school: "Université Picardie Jules Verne, Amiens" },
    { degree: "L2 Informatique", school: "Université de Lille" },
    { degree: "L3 Informatique", school: "Université de Lille" },
    { degree: "M1 MIAGE", school: "Université de Lille" },
];

const ParcoursSection = () => {
    const { t } = useLocale();

    return (
        <section id="parcours" className="section-padding relative">
            <div className="container mx-auto px-6 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                            {t('parcours_title').split(' ')[0]} <span className="text-gradient">{t('parcours_title').split(' ').slice(1).join(' ')}</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            {t('parcours_sub')}
                        </p>
                    </div>
                </AnimatedSection>

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-6">
                        {parcours.map((p, i) => (
                            <motion.div
                                key={p.degree}
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
                                    <div className="font-display font-semibold">{p.degree}</div>
                                    <div className="text-muted-foreground text-sm">{p.school}</div>
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
