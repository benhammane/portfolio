import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useClickSound } from '@/hooks/useClickSound';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const { playClick } = useClickSound();

  const toggleLanguage = () => {
    playClick();
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-primary/10 transition-smooth"
      title={language === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <Globe size={18} />
      <span className="text-sm font-medium uppercase">{language}</span>
    </motion.button>
  );
};

export default LanguageSelector;
