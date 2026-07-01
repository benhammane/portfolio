import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Index from './pages/Index';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import { posts } from './data/posts';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: 'blog', element: <BlogList /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        // Pré-génère une page HTML statique par article (SEO)
        getStaticPaths: () => posts.map((p) => `/blog/${p.slug}`),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];
