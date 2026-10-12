import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useLocale } from '@/lib/LocaleProvider';
import { useClickSound } from '@/hooks/useClickSound';

const Footer = () => {
  const { t } = useLocale();
  const { playClick } = useClickSound();

  const socials = [
    { icon: Github, href: 'https://github.com/benhammane', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/benhammaneamine/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:benhammanemedamine@gmail.com', label: 'Email' },
  ];

  const scrollTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-10 border-t border-border/60">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Marque */}
          <div className="text-center md:text-left">
            <a href="/" className="font-display text-xl font-bold tracking-tight">
              Amine<span className="text-accent-brand">.</span>
            </a>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground md:justify-start">
              {t('footer_tagline')}
            </p>
          </div>

          {/* Liens rapides : chemins absolus, le footer est aussi rendu sur le blog */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[
                { href: '/#projects', key: 'nav_projects' },
                { href: '/#experience', key: 'nav_experience' },
                { href: '/#contact', key: 'nav_contact' },
                { href: '/blog', key: 'nav_blog' },
              ].map((l) => (
                <li key={l.key}>
                  <a href={l.href} className="transition-colors hover:text-foreground">
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Réseaux */}
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                onClick={playClick}
                className="rounded-full border border-border/70 p-2.5 text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
              >
                <Icon size={18} />
              </a>
            ))}
            <button
              type="button"
              onClick={scrollTop}
              aria-label={t('footer_back_top')}
              className="ml-1 rounded-full bg-brand/10 p-2.5 text-brand ring-1 ring-brand/20 transition-colors hover:bg-brand hover:text-primary-foreground"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border/40 pt-6 text-sm text-muted-foreground md:flex-row">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Amine Benhammane. {t('footer_rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
