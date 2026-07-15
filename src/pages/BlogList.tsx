import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { useLocale } from '@/lib/LocaleProvider';
import BlogHeader from '@/components/BlogHeader';
import { posts, formatDate } from '@/data/posts';
import { SITE_URL } from '@/config';

const BlogList = () => {
  const { t, locale } = useLocale();

  return (
    <>
      <Head>
        <html lang={locale} />
        <title>Blog — Amine Benhammane | Développeur Web</title>
        <meta name="description" content={t('blog_sub')} />
        <meta property="og:title" content="Blog — Amine Benhammane" />
        <meta property="og:description" content={t('blog_sub')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
      </Head>

      <BlogHeader />

      <main className="relative min-h-screen px-6 pb-24 pt-32">
        <div className="container mx-auto">
          {/* En-tête */}
          <div className="mb-14 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center justify-center gap-3"
            >
              <span className="h-px w-8 bg-brand/60" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand">{t('blog_eyebrow')}</span>
              <span className="h-px w-8 bg-brand/60" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              {t('blog_title')} <span className="text-gradient-animated">{t('blog_highlight')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mx-auto mt-5 max-w-2xl text-muted-foreground"
            >
              {t('blog_sub')}
            </motion.p>
          </div>

          {/* Grille d'articles */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`} className="flex h-full flex-col overflow-hidden rounded-3xl glass">
                  {/* Couverture */}
                  <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${post.gradient}`}>
                    <div className="absolute inset-0 bg-noise opacity-[0.04]" />
                    <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-full bg-background/70 px-2.5 py-1 text-xs font-medium backdrop-blur-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-grow flex-col p-6">
                    <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Calendar size={12} />{formatDate(post.date, locale)}</span>
                      <span className="inline-flex items-center gap-1"><Clock size={12} />{post.readMinutes} {t('blog_min')}</span>
                    </div>
                    <h2 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-brand">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-grow text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                      {t('blog_read')}
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogList;
