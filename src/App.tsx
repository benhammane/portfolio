import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LocaleProvider } from "@/lib/LocaleProvider";
import { ThemeProvider } from "@/lib/ThemeProvider";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocaleProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <ChatBot />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>


        </TooltipProvider>
      </ThemeProvider>
    </LocaleProvider>
  </QueryClientProvider>
);

export default App;
