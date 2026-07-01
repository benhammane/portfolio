import { Link } from 'react-router-dom';
import { Sun, Moon, Globe, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeProvider';
import { useLocale } from '@/lib/LocaleProvider';
import { useClickSound } from '@/hooks/useClickSound';
import ABLogo from '@/assert/ABLogo.jpeg';

const BlogHeader = () => {
  const { toggleTheme, theme } = useTheme();
  const { t, locale, setLocale } = useLocale();
  const { playClick } = useClickSound();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="container mx-auto flex items-center justify-between rounded-full glass-strong px-4 py-2.5 shadow-lg">
        <Link to="/" onClick={playClick} className="flex items-center gap-2.5">
          <img src={ABLogo} alt="AB" className="h-9 w-9 rounded-full object-cover ring-1 ring-brand/40" />
          <span className="font-display text-lg font-bold tracking-tight">
            Amine<span className="text-gradient">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/"
            onClick={playClick}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            {t('blog_home')}
          </Link>
          <span className="rounded-full bg-brand/15 px-3.5 py-1.5 text-sm font-medium text-brand ring-1 ring-brand/30">
            {t('nav_blog')}
          </span>

          <button
            onClick={() => { playClick(); toggleTheme(); }}
            className="ml-1 rounded-full p-2 text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            onClick={() => { playClick(); setLocale(locale === 'fr' ? 'en' : 'fr'); }}
            className="flex items-center gap-1 rounded-full p-2 text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand"
            aria-label="Toggle language"
          >
            <Globe size={18} />
            <span className="text-xs font-semibold uppercase">{locale}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
