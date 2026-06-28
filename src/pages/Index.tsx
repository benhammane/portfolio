import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ParcoursSection from '@/components/ParcoursSection';
import InterestsSection from '@/components/InterestsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AuroraBackground from '@/components/fx/AuroraBackground';
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
      <AuroraBackground />

      {loading && <Preloader onComplete={handleIntroDone} />}

      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ParcoursSection />
        <InterestsSection />
        <ContactSection />
      </motion.main>

      <Footer />
    </div>
  );
};

export default Index;
