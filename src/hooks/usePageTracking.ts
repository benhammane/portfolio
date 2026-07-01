import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

/**
 * Écoute les changements de route React Router et envoie un page_view GA4.
 * À utiliser dans Layout.tsx (à l'intérieur du contexte Router).
 */
export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  // location.key change à chaque navigation, même si pathname identique (refresh)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);
}
