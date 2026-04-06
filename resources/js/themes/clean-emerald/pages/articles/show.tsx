import { show as articleShow } from '@/actions/App/Http/Controllers/ArticleController';
import type { ArticleResource, SiteConfig } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';

interface Props {
    article: ArticleResource;
    others: ArticleResource[];
}

const ArticlesShow = ({ article, others }: Props) => {
    const { siteConfig } = usePage<{ siteConfig: SiteConfig | null }>().props;

    const formattedDate = article.published_at
        ? new Date(article.published_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
        : null;

    return (
        <>
            <Head title={`${article.title} - SDIT Al-Aziz`}>
                <meta
                    name="description"
                    content={
                        article.seo?.meta_description ?? article.excerpt ?? ''
                    }
                />
                <meta
                    property="og:title"
                    content={
                        article.seo?.meta_title ??
                        `${article.title} - SDIT Al-Aziz`
                    }
                />
                <meta
                    property="og:description"
                    content={
                        article.seo?.meta_description ?? article.excerpt ?? ''
                    }
                />
                <meta property="og:type" content="article" />
                {article.featured_image_url && (
                    <meta
                        property="og:image"
                        content={article.featured_image_url}
                    />
                )}
                <link
                    rel="canonical"
                    href={window.location.href.split('?')[0]}
                />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 font-[Plus_Jakarta_Sans] sm:px-6 lg:px-8">
                <Link
                    href="/articles"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Artikel
                </Link>

                <div className="mt-8 flex gap-10 lg:items-start">
                    {/* Main content */}
                    <article className="min-w-0 flex-1">
                        {/* Hero image */}
                        {article.featured_image_url && (
                            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-96">
                                <img
                                    src={article.featured_image_url}
                                    alt={article.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                        )}

                        {/* Categories */}
                        {article.categories.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {article.categories.map((category) => (
                                    <span
                                        key={category.id}
                                        className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                    >
                                        <Tag className="h-3 w-3" />
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Header */}
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            {article.title}
                        </h1>

                        {/* Meta */}
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="inline-flex items-center gap-1.5">
                                <User className="h-4 w-4" />
                                {article.author.name}
                            </span>
                            {formattedDate && (
                                <span className="inline-flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    {formattedDate}
                                </span>
                            )}
                        </div>

                        {/* Excerpt */}
                        {article.excerpt && (
                            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                                {article.excerpt}
                            </p>
                        )}

                        {/* Rich-text content */}
                        {article.content && (
                            <div
                                className="prose prose-emerald dark:prose-invert mt-10 max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: article.content,
                                }}
                            />
                        )}
                    </article>

                    {/* Right Sidebar */}
                    <aside className="hidden w-64 shrink-0 lg:block">
                        <div>
                            <span className="bg-emerald-600 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase dark:bg-emerald-500">
                                Artikel Lainnya
                            </span>
                            <div className="h-0.5 w-full bg-emerald-600 dark:bg-emerald-500" />
                        </div>

                        {others.length === 0 ? (
                            <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
                                Belum ada artikel lain.
                            </p>
                        ) : (
                            <ul className="mt-4 space-y-4">
                                {others.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={
                                                articleShow({
                                                    article: item.slug,
                                                }).url
                                            }
                                            className="group flex items-start gap-3"
                                        >
                                            {item.featured_image_url ? (
                                                <div className="mt-0.5 h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                                                    <img
                                                        src={
                                                            item.featured_image_url
                                                        }
                                                        alt={item.title}
                                                        className="h-full w-full object-cover transition group-hover:scale-105"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                    <Tag className="h-5 w-5" />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="line-clamp-2 text-sm leading-snug font-medium text-gray-700 transition group-hover:text-emerald-600 dark:text-gray-300 dark:group-hover:text-emerald-400">
                                                    {item.title}
                                                </p>
                                                {item.published_at && (
                                                    <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                                                        {new Date(
                                                            item.published_at,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            },
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </aside>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: article.title,
                        description: article.excerpt ?? '',
                        author: {
                            '@type': 'Person',
                            name: article.author.name,
                        },
                        ...(article.published_at
                            ? { datePublished: article.published_at }
                            : {}),
                        ...(article.featured_image_url
                            ? { image: article.featured_image_url }
                            : {}),
                        publisher: {
                            '@type': 'EducationalOrganization',
                            name: siteConfig?.identity?.name ?? 'SDIT Al-Aziz',
                        },
                    }),
                }}
            />
        </>
    );
};

export default ArticlesShow;
