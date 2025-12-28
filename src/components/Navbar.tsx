import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickSound } from '@/hooks/useClickSound';
import { useTheme } from '@/lib/ThemeProvider';
import { useLocale } from '@/lib/LocaleProvider';
const navItemsBase = [
  { key: 'nav_home', href: '#hero' },
  { key: 'nav_about', href: '#about' },
  { key: 'nav_skills', href: '#skills' },
  { key: 'nav_projects', href: '#projects' },
  { key: 'nav_experience', href: '#experience' },
  { key: 'nav_parcours', href: '#parcours' },
  { key: 'nav_interests', href: '#interests' },
  { key: 'nav_contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { playClick } = useClickSound();
  const { toggleTheme, theme } = useTheme();
  const { t, locale, setLocale } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    playClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#hero"
          onClick={handleNavClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-display font-bold text-xl text-gradient"
        >
          Portfolio
        </motion.a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          {navItemsBase.map((item, index) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.a
                href={item.href}
                onClick={handleNavClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
              >
                {t(item.key)}
              </motion.a>
            </motion.li>
          ))}

          {/* Theme & Language Toggles */}
          <li>
            <button
              onClick={() => { playClick(); toggleTheme(); }}
              className="p-2 rounded-md text-muted-foreground hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>
          <li>
            <button
              onClick={() => { playClick(); setLocale(locale === 'fr' ? 'en' : 'fr'); }}
              className="p-2 rounded-md text-muted-foreground hover:text-primary"
              aria-label="Toggle language"
            >
              <Globe size={18} />
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => { playClick(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
          className="md:hidden text-foreground p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass mt-2 mx-4 rounded-lg p-4 overflow-hidden"
          >
            <ul className="flex flex-col gap-4">
              {navItemsBase.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={handleNavClick}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium block py-2"
                  >
                    {t(item.key)}
                  </a>
                </motion.li>
              ))}

              <li className="pt-2 flex gap-2">
                <button
                  onClick={() => { playClick(); toggleTheme(); }}
                  className="p-2 rounded-md text-muted-foreground hover:text-primary"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => { playClick(); setLocale(locale === 'fr' ? 'en' : 'fr'); }}
                  className="p-2 rounded-md text-muted-foreground hover:text-primary"
                >
                  <Globe size={18} />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
