import { motion } from 'framer-motion';
import { Layout, Server, PenTool } from 'lucide-react';
import { useLocale } from '@/lib/LocaleProvider';
import SectionHeading from '@/components/fx/SectionHeading';

interface Skill {
  name: string;
  level: number;
}

const SkillBar = ({ name, level, delay }: Skill & { delay: number }) => (
  <div>
    <div className="mb-1.5 flex items-center justify-between">
      <span className="text-sm font-medium">{name}</span>
      <span className="font-mono text-xs text-muted-foreground">{level}%</span>
    </div>
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full bg-brand-gradient"
      />
    </div>
  </div>
);

const SkillsSection = () => {
  const { t } = useLocale();

  const categories = [
    {
      icon: Layout,
      title: t('skills_cat_frontend'),
      skills: [
        { name: 'React', level: 88 },
        { name: 'TypeScript / JavaScript', level: 85 },
        { name: 'HTML / CSS', level: 92 },
        { name: 'Tailwind CSS', level: 86 },
      ],
    },
    {
      icon: Server,
      title: t('skills_cat_backend'),
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'PHP (Laravel)', level: 82 },
        { name: 'Python', level: 75 },
        { name: 'Java', level: 78 },
      ],
    },
    {
      icon: PenTool,
      title: t('skills_cat_tools'),
      skills: [
        { name: 'MySQL', level: 84 },
        { name: 'Git', level: 86 },
        { name: 'Figma', level: 80 },
        { name: 'Montage vidéo', level: 88 },
      ],
    },
  ];

  const extra = ['C / C++', 'Photoshop', 'WebSocket', 'REST API', 'UML', 'Vite', 'Framer Motion'];

  return (
    <section id="skills" className="section-padding relative">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading
          eyebrow="03 — Stack"
          title="Mes"
          highlight="Compétences"
          subtitle={t('skills_sub')}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl glass p-7 hover-lift"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/20">
                  <cat.icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold">{cat.title}</h3>
              </div>
              <div className="space-y-5">
                {cat.skills.map((skill, si) => (
                  <SkillBar key={skill.name} {...skill} delay={ci * 0.1 + si * 0.08} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compétences additionnelles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {t('skills_also')} —
          </span>
          {extra.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border/60 bg-secondary/40 px-4 py-1.5 text-sm transition-colors hover:border-brand/40 hover:text-brand"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
