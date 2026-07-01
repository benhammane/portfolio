/// <reference types="vite/client" />

declare module '*.mp4' {
  const src: string;
  export default src;
}

// Variables d'environnement Vite (préfixe VITE_ exposé au client)
interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_GA_MEASUREMENT_ID?: string; // ex: G-XXXXXXXXXX
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Types globaux pour l'API gtag (window.gtag / window.dataLayer)
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag(command: 'js', date: Date): void;
    gtag(command: 'config', targetId: string, config?: Record<string, unknown>): void;
    gtag(command: 'event', eventName: string, params?: Record<string, unknown>): void;
    gtag(command: 'set', params: Record<string, unknown>): void;
  }
}
