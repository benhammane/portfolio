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

const queryClient = new QueryClient();

/** Enveloppe commune à toutes les routes (accueil + blog). */
const Layout = () => (
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

export default Layout;
