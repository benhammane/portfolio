import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useClickSound } from '@/hooks/useClickSound';
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { playClick } = useClickSound();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleToggle = () => {
    playClick();
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-primary/10 transition-smooth hover-lift glow-sm"
      title={isDark ? t('theme.toggleToLight') : t('theme.toggleToDark')}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm font-medium hidden sm:inline">
        {isDark ? t('theme.light') : t('theme.dark')}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
