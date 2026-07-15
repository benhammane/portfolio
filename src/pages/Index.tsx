import { useState } from 'react';
import { Head } from 'vite-react-ssg';
import { motion } from 'framer-motion';
import { SITE_URL, SITE_NAME } from '@/config';
import { useLocale } from '@/lib/LocaleProvider';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import RobotSection from '@/components/RobotSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import FreelanceSection from '@/components/FreelanceSection';
import ExperienceSection from '@/components/ExperienceSection';
import ParcoursSection from '@/components/ParcoursSection';
import InterestsSection from '@/components/InterestsSection';
import ContactSection from '@/components/ContactSection';
import Preloader from '@/components/fx/Preloader';

const Index = () => {
  const { locale } = useLocale();

  // Intro affichée une seule fois par session
  const [loading, setLoading] = useState(() => {
    try {
      return sessionStorage.getItem('intro-seen') !== '1';
    } catch {
      return true;
    }
  });

  const handleIntroDone = () => {
    try {
      sessionStorage.setItem('intro-seen', '1');
    } catch {
      /* noop */
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      <Head>
        <html lang={locale} />
        <title>Amine Benhammane — Développeur Full-Stack & Fondateur de WebLocal</title>
        <meta
          name="description"
          content="Portfolio d'Amine Benhammane, développeur full-stack (M2 MIAGE) et fondateur de l'agence WebLocal. Création de sites web et d'applications sur-mesure. Disponible pour une alternance."
        />
        <meta name="keywords" content="développeur full-stack, React, TypeScript, freelance, création site web, WebLocal, alternance, Lille" />
        <meta property="og:title" content="Amine Benhammane — Développeur Full-Stack & Freelance" />
        <meta property="og:description" content="Développeur full-stack et fondateur de WebLocal. Sites web & applications sur-mesure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1536" />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: SITE_NAME,
            url: SITE_URL,
            jobTitle: 'Développeur Full-Stack',
            image: `${SITE_URL}/og-image.jpg`,
            email: 'benhammanemedamine@gmail.com',
            address: { '@type': 'PostalAddress', addressLocality: 'Lille', addressCountry: 'FR' },
            sameAs: [
              'https://github.com/benhammane',
              'https://www.linkedin.com/in/benhammaneamine/',
            ],
            worksFor: { '@type': 'Organization', name: 'WebLocal', url: 'https://adamine.vercel.app' },
          })}
        </script>
      </Head>

      {loading && <Preloader onComplete={handleIntroDone} />}

      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
      >
        <HeroSection />
        <AboutSection />
        <RobotSection />
        <SkillsSection />
        <ProjectsSection />
        <FreelanceSection />
        <ExperienceSection />
        <ParcoursSection />
        <InterestsSection />
        <ContactSection />
      </motion.main>
    </div>
  );
};

export default Index;
