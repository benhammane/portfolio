import { useParams, Link, Navigate } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useLocale } from '@/lib/LocaleProvider';
import BlogHeader from '@/components/BlogHeader';
import { getPost, formatDate, type Block } from '@/data/posts';
import { SITE_URL, SITE_NAME } from '@/config';

const RenderBlock = ({ block }: { block: Block }) => {
  switch (block.type) {
    case 'h':
      return <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight">{block.text}</h2>;
    case 'quote':
      return (
        <blockquote className="my-8 border-l-2 border-brand pl-5 text-lg italic text-foreground/90">
          {block.text}
        </blockquote>
      );
    case 'list':
      return (
        <ul className="my-4 space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-4 leading-relaxed text-muted-foreground">{block.text}</p>;
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const { t, locale } = useLocale();
  const post = getPost(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <>
      <Head>
        <html lang={locale} />
        <title>{`${post.title} — ${SITE_NAME}`}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <link rel="canonical" href={url} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { '@type': 'Person', name: SITE_NAME },
            keywords: post.tags.join(', '),
            url,
          })}
        </script>
      </Head>

      <BlogHeader />

      <main className="relative min-h-screen px-6 pb-24 pt-28">
        <article className="container mx-auto max-w-2xl">
          {/* Fil d'ariane / retour */}
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft size={15} /> {t('blog_back')}
          </Link>

          {/* En-tête d'article */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar size={14} />{formatDate(post.date, locale)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} />{post.readMinutes} {t('blog_min')}</span>
            </div>
          </motion.header>

          {/* Couverture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`relative mt-8 h-52 overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br ${post.gradient} sm:h-64`}
          >
            <div className="absolute inset-0 bg-noise opacity-[0.05]" />
          </motion.div>

          {/* Corps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 text-[1.05rem]"
          >
            {post.content.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}
          </motion.div>

          {/* CTA fin d'article */}
          <div className="mt-14 rounded-3xl glass border-gradient p-8 text-center">
            <p className="font-display text-lg font-semibold">{t('blog_cta_text')}</p>
            <Link
              to="/#contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-medium text-primary-foreground transition-transform active:scale-95 glow-sm"
            >
              {t('blog_cta_btn')}
              <ArrowRight size={17} />
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPost;
