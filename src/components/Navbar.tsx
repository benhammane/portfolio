import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickSound } from '@/hooks/useClickSound';
import { useTheme } from '@/lib/ThemeProvider';
import { useLocale } from '@/lib/LocaleProvider';
import ABLogo from '@/assert/ABLogo.jpeg';

const navItemsBase = [
  { key: 'nav_home', href: '#hero', id: 'hero' },
  { key: 'nav_about', href: '#about', id: 'about' },
  { key: 'nav_skills', href: '#skills', id: 'skills' },
  { key: 'nav_projects', href: '#projects', id: 'projects' },
  { key: 'nav_freelance', href: '#freelance', id: 'freelance' },
  { key: 'nav_experience', href: '#experience', id: 'experience' },
  { key: 'nav_parcours', href: '#parcours', id: 'parcours' },
  { key: 'nav_interests', href: '#interests', id: 'interests' },
  { key: 'nav_contact', href: '#contact', id: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const { playClick } = useClickSound();
  const { toggleTheme, theme } = useTheme();
  const { t, locale, setLocale } = useLocale();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy : section visible -> onglet actif
  useEffect(() => {
    const sections = navItemsBase
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => {
    playClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div
        className={`container mx-auto flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
          isScrolled ? 'glass-strong shadow-lg' : 'border border-transparent'
        }`}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={handleNavClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2.5"
        >
          <img src={ABLogo} alt="AB" className="h-9 w-9 rounded-full object-cover ring-1 ring-brand/40" />
          <span className="font-display text-lg font-bold tracking-tight">
            Amine<span className="text-gradient">.</span>
          </span>
        </motion.a>

        {/* Nav desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItemsBase.map((item) => (
            <li key={item.href} className="relative">
              <a
                href={item.href}
                onClick={handleNavClick}
                className={`relative block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active === item.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-brand/15 ring-1 ring-brand/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {t(item.key)}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blog"
              onClick={handleNavClick}
              className="block rounded-full px-3.5 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand/10"
            >
              {t('nav_blog')}
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => { playClick(); toggleTheme(); }}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand"
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

          {/* Burger mobile */}
          <button
            onClick={() => { playClick(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
            className="ml-1 rounded-full p-2 text-foreground lg:hidden"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="container mx-auto mt-2 overflow-hidden rounded-3xl glass-strong p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItemsBase.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <a
                    href={item.href}
                    onClick={handleNavClick}
                    className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      active === item.id
                        ? 'bg-brand/15 text-brand'
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    {t(item.key)}
                  </a>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
                <Link
                  to="/blog"
                  onClick={handleNavClick}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-brand hover:bg-brand/10"
                >
                  {t('nav_blog')}
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
