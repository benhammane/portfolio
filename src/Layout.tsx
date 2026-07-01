import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LocaleProvider } from '@/lib/LocaleProvider';
import { ThemeProvider } from '@/lib/ThemeProvider';
import ChatBot from '@/components/ChatBot';
import ScrollProgress from '@/components/fx/ScrollProgress';
import AuroraBackground from '@/components/fx/AuroraBackground';
import Footer from '@/components/Footer';
import { initGA } from '@/lib/analytics';
import { usePageTracking } from '@/hooks/usePageTracking';

const queryClient = new QueryClient();

/** Enveloppe commune à toutes les routes (accueil + blog). */
const Layout = () => {
  // Initialise GA4 une seule fois au montage côté client
  useEffect(() => { initGA(); }, []);

  // Envoie un page_view à chaque changement de route React Router
  usePageTracking();

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AuroraBackground />
            <ScrollProgress />
            <ChatBot />

            <Outlet />

            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
};

export default Layout;
