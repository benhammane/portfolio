import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

// Les pages du blog (et les ~94 Ko d'articles de data/posts) sont chargées à la demande :
// elles ne font plus partie du JavaScript téléchargé sur la page d'accueil.
// vite-react-ssg résout ces routes lazy au build (HTML pré-rendu complet) et avant l'hydratation.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: 'blog', lazy: () => import('./pages/BlogList') },
      {
        path: 'blog/:slug',
        lazy: () => import('./pages/BlogPost'),
        // Pré-génère une page HTML statique par article (SEO)
        getStaticPaths: async () => {
          const { publishedPosts } = await import('./data/posts');
          return publishedPosts.map((p) => `/blog/${p.slug}`);
        },
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];
