import { Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';

const experiences = [
  {
    title: 'Développement Frontend et Workflow (Stage)',
    company: 'Tech Link Service',
    period: '2025',
    description: 'Développement d\'une solution SaaS de gestion de restaurants et intégration de commandes externes sur une interface centralisée.',
    highlights: ['React / Flutterflow', 'TypeScript / JavaScript', 'Intégrations API (Uber Eats, Deliveroo)'],
  },
  {
    title: 'Développement Web (Stage)',
    company: 'Equipe MAROCVILLE',
    period: '2022',
    description: 'Développement d\'une application de gestion (stocks, commandes, clients) avec Laravel et MySQL.',
    highlights: ['Laravel & MySQL', 'Design d\'interface', 'Automatisation des tests'],
  },
  {
    title: 'Employé polyvalent',
    company: 'Crêpes Corner',
    period: '2024',
    description: 'Mission en point de vente, gestion du service client et polyvalence opérationnelle.',
    highlights: ['Service client', 'Travail en équipe', 'Adaptabilité'],
  },
  {
    title: 'Magasinier',
    company: 'Equipe MAROCVILLE',
    period: '—',
    description: "Réception et documentation des produits, contrôle des colis endommagés, rangement sur étagères et assistance aux préparateurs de commandes pour le ramassage et l'emballage.",
    highlights: ['Réception & contrôle', 'Gestion des stocks', 'Préparation de commandes'],
  },
  {
    title: 'Employé polyvalent',
    company: 'Snack O mimosas',
    period: '—',
    description: "Accueil et prise de commandes, préparation rapide et précise des plats, service clientèle, et entretien des zones de préparation et de salle en respectant les normes d'hygiène.",
    highlights: ['Accueil & prise de commandes', 'Préparation & propreté', 'Hygiène alimentaire'],
  },
  {
    title: 'Livreur de commandes',
    company: 'Uber Eats',
    period: '—',
    description: "Livraison rapide et sécurisée des commandes, utilisation efficace des outils de navigation et interaction professionnelle avec les clients.",
    highlights: ['Livraison & navigation', 'Relation client', 'Entretien du véhicule'],
  },
  {
    title: 'Agent de sécurité (événement)',
    company: 'Match de football (Ligue 1)',
    period: '—',
    description: "Assurer la sécurité des spectateurs et du personnel, appliquer les mesures de contrôle et coopérer avec les forces de l'ordre pour prévenir les incidents.",
    highlights: ['Sécurité événementielle', 'Contrôle des foules', 'Coordination opérationnelle'],
  },
  {
    title: 'Inventoriste',
    company: 'RGIS',
    period: 'Depuis mai 2025',
    description: "Réalisation d'inventaires dans le nord de la France : comptage, validation et remontée des écarts, travail en équipe et rigueur des données.",
    highlights: ['Inventaires régionaux', 'Précision & fiabilité', 'Travail en équipe'],
  },
];

const ExperienceSection = () => {
  const { playClick } = useClickSound();

  return (
    <section id="experience" className="section-padding relative">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Mes <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mon évolution professionnelle à travers différentes entreprises et projets.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full mt-4" />
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <div className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline line */}
                {index !== experiences.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="absolute left-[11px] top-10 w-0.5 bg-gradient-to-b from-primary to-transparent"
                  />
                )}

                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center glow-sm"
                >
                  <Briefcase size={12} className="text-primary-foreground" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.995 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={playClick}
                  className="glass rounded-xl p-6 ml-4 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <h3 className="font-display font-semibold text-xl">{exp.title}</h3>
                    <span className="text-primary font-medium">{exp.company}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <Calendar size={14} />
                    {exp.period}
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
