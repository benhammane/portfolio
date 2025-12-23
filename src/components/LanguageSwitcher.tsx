import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useClickSound } from '@/hooks/useClickSound';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { playClick } = useClickSound();

  const toggleLanguage = () => {
    playClick();
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-primary/10 transition-smooth hover-lift glow-sm"
      title={i18n.language === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <Globe size={18} />
      <span className="text-sm font-medium uppercase">{i18n.language}</span>
    </motion.button>
  );
};

export default LanguageSwitcher;
