import { useState } from 'react';
import { Head } from 'vite-react-ssg';
import { motion } from 'framer-motion';
import { SITE_URL } from '@/config';
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
        <html lang="fr" />
        <title>Amine Benhammane — Développeur Full-Stack & Fondateur de WebLocal</title>
        <meta
          name="description"
          content="Portfolio d'Amine Benhammane, développeur full-stack (M1 MIAGE) et fondateur de l'agence WebLocal. Création de sites web et d'applications sur-mesure. Disponible pour une alternance."
        />
        <meta name="keywords" content="développeur full-stack, React, TypeScript, freelance, création site web, WebLocal, alternance, Lille" />
        <meta property="og:title" content="Amine Benhammane — Développeur Full-Stack & Freelance" />
        <meta property="og:description" content="Développeur full-stack et fondateur de WebLocal. Sites web & applications sur-mesure." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${SITE_URL}/`} />
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
