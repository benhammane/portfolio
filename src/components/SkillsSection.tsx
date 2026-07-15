import { motion } from 'framer-motion';
import { Layout, Server, Wrench } from 'lucide-react';
import { useLocale } from '@/lib/LocaleProvider';
import SectionHeading from '@/components/fx/SectionHeading';

const SkillsSection = () => {
  const { t } = useLocale();

  const categories = [
    {
      icon: Layout,
      title: t('skills_cat_frontend'),
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      icon: Server,
      title: t('skills_cat_backend'),
      skills: ['Node.js', 'PHP (Laravel)', 'Python', 'Java', 'MySQL', 'REST API'],
    },
    {
      icon: Wrench,
      title: t('skills_cat_tools'),
      skills: ['Git', 'Figma', 'Vite', 'Vercel', 'Photoshop', 'Montage vidéo'],
    },
  ];

  // Bandeaux défilants (2 rangées, sens opposés)
  const rowA = ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Node.js', 'PHP', 'Laravel', 'MySQL', 'Python', 'Java'];
  const rowB = ['Git', 'Figma', 'Vite', 'Vercel', 'REST API', 'WebSocket', 'C / C++', 'UML', 'Framer Motion', 'Photoshop', 'socket.io', 'Montage vidéo'];

  const Pill = ({ label }: { label: string }) => (
    <span className="flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm backdrop-blur-sm">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
      {label}
    </span>
  );

  const Marquee = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => (
    <div
      aria-hidden="true"
      className="flex overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div
        className={`flex w-max items-center gap-4 pr-4 animate-marquee hover:[animation-play-state:paused] ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
      >
        {[...items, ...items].map((s, i) => (
          <Pill key={`${s}-${i}`} label={s} />
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading
          eyebrow="03 — Stack technique"
          title="Les technologies que je"
          highlight="maîtrise"
          subtitle={t('skills_sub')}
        />

        {/* Cartes par catégorie (pills) */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-spotlight rounded-3xl glass p-7 hover-lift"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                el.style.setProperty('--mx', `${e.clientX - r.left}px`);
                el.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}
            >
              <div className="mb-5 flex items-center gap-2.5">
                <cat.icon size={18} className="text-brand" />
                <h3 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border/60 bg-secondary/40 px-3 py-1.5 text-sm transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bandeaux défilants pleine largeur */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-14 space-y-4"
      >
        <Marquee items={rowA} />
        <Marquee items={rowB} reverse />
      </motion.div>
    </section>
  );
};

export default SkillsSection;
