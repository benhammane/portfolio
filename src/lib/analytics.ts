/**
 * GA4 — intégration Vite + React + vite-react-ssg
 * - Script injecté dynamiquement (safe SSR/SSG)
 * - send_page_view: false → vues gérées manuellement (SPA, pas de doublons)
 * - En dev : console.log uniquement, aucun hit envoyé à GA
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const IS_DEV = import.meta.env.DEV;

/** Renvoie true uniquement si GA doit envoyer des données. */
function isEnabled(): boolean {
  return typeof window !== 'undefined' && !!GA_ID && !IS_DEV;
}

/**
 * Initialise GA4 et injecte le script gtag.js une seule fois.
 * À appeler dans un useEffect côté client (Layout.tsx).
 */
export function initGA(): void {
  if (typeof window === 'undefined') return;

  if (!GA_ID) {
    if (IS_DEV) console.warn('[GA4] VITE_GA_MEASUREMENT_ID non défini — analytics désactivés');
    return;
  }

  if (IS_DEV) {
    console.info(`[GA4] Mode dev — les events sont loggués mais non envoyés (ID: ${GA_ID})`);
    return;
  }

  // Guard : script déjà présent (hot-reload, StrictMode double-mount…)
  if (document.getElementById('ga4-script')) return;

  // Injection du script async
  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // File d'attente gtag (doit utiliser `arguments`, pas un arrow function)
  window.dataLayer = window.dataLayer || [];
  // @ts-expect-error — GA4 requiert l'objet `arguments` natif
  window.gtag = function gtag() { window.dataLayer.push(arguments); };

  window.gtag('js', new Date());
  // send_page_view: false → on pilote manuellement via trackPageView()
  window.gtag('config', GA_ID, { send_page_view: false });
}

/**
 * Envoie un événement page_view.
 * Appelé automatiquement par usePageTracking à chaque changement de route.
 */
export function trackPageView(path: string, title?: string): void {
  if (IS_DEV) {
    console.info(`[GA4] page_view → ${path}`);
    return;
  }
  if (!isEnabled() || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_location: window.location.origin + path,
    page_title: title ?? document.title,
  });
}

/**
 * Envoie un événement personnalisé GA4.
 *
 * @param action   Nom de l'événement snake_case  (ex: 'cv_download')
 * @param category Catégorie                       (ex: 'engagement')
 * @param label    Label optionnel                 (ex: 'hero_section')
 *
 * @example
 *   trackEvent('cv_download', 'engagement', 'hero')
 *   trackEvent('github_click', 'navigation')
 *   trackEvent('contact_form_submit', 'engagement')
 */
export function trackEvent(action: string, category: string, label?: string): void {
  if (IS_DEV) {
    console.info(`[GA4] event → action=${action}  category=${category}${label ? `  label=${label}` : ''}`);
    return;
  }
  if (!isEnabled() || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    ...(label !== undefined && { event_label: label }),
  });
}

// ─── Événements prédéfinis (API de haut niveau) ───────────────────────────────

/** Clic sur un lien social (GitHub, LinkedIn, Email…). */
export const trackSocialClick = (platform: string) =>
  trackEvent('social_click', 'navigation', platform);

/** Téléchargement du CV. */
export const trackCvDownload = () =>
  trackEvent('cv_download', 'engagement', 'hero');

/** Envoi réussi du formulaire de contact. */
export const trackContactSubmit = () =>
  trackEvent('contact_form_submit', 'engagement');

/** Clic sur un projet (lien démo ou GitHub). */
export const trackProjectClick = (projectName: string) =>
  trackEvent('project_click', 'portfolio', projectName);

/** Clic sur le CTA "Mon agence · WebLocal". */
export const trackAgencyClick = () =>
  trackEvent('agency_click', 'navigation', 'weblocal');
