import {
    index as articleIndex,
    show as articleShow,
} from '@/actions/App/Http/Controllers/ArticleController';
import type { ArticleResource, CategoryResource } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Newspaper,
    Tag,
    User,
} from 'lucide-react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface PaginatedArticles {
    data: ArticleResource[];
    links: PaginationLink[];
    meta: PaginationMeta;
}

interface Props {
    articles: PaginatedArticles;
    categories: CategoryResource[];
    selectedCategory: string | null;
}

const formatDate = (date: string | null): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const formatDateShort = (date: string | null): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const ArticlesIndex = ({ articles, categories, selectedCategory }: Props) => {
    const allArticles = articles.data;
    const featured = allArticles[0] ?? null;
    const masonryArticles = allArticles.slice(1, 7);
    const latestArticles = allArticles.slice(7);

    return (
        <>
            <Head title="Artikel">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 pb-20 font-[Plus_Jakarta_Sans] sm:px-6 lg:px-8">
                {/* Page header */}
                <div className="py-10 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:bg-emerald-900/30 dark:text-emerald-400">
                        <Newspaper className="h-3.5 w-3.5" />
                        Berita & Artikel
                    </span>
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Informasi Terkini
                    </h1>
                    <p className="mx-auto mt-3 max-w-xl text-base text-gray-500 dark:text-gray-400">
                        Temukan berita, kegiatan, dan artikel terbaru dari
                        sekolah kami.
                    </p>
                </div>

                {/* Category filter */}
                {categories.length > 0 && (
                    <div className="mb-10 flex flex-wrap justify-center gap-2">
                        <Link
                            href={articleIndex.url()}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                                !selectedCategory
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400'
                            }`}
                        >
                            Semua
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`${articleIndex.url()}?category=${cat.slug}`}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                                    selectedCategory === cat.slug
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400'
                                }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                )}

                {allArticles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-24 text-gray-400 dark:text-gray-600">
                        <Newspaper className="h-16 w-16 opacity-30" />
                        <p className="text-lg font-medium">
                            Belum ada artikel.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* ── Featured Post ── */}
                        {featured && (
                            <section>
                                <div className="mb-6">
                                    <span className="bg-emerald-600 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase dark:bg-emerald-500">
                                        Featured
                                    </span>
                                    <div className="h-0.5 w-full bg-emerald-600 dark:bg-emerald-500" />
                                </div>

                                <Link
                                    href={
                                        articleShow({ article: featured.slug })
                                            .url
                                    }
                                    className="group relative flex flex-col overflow-hidden rounded-3xl bg-gray-900 ring-1 ring-transparent transition-[background-color,ring-color] duration-300 hover:bg-gray-800 hover:ring-emerald-500/30 lg:h-[480px] lg:flex-row"
                                >
                                    {/* Image */}
                                    <div className="relative h-64 w-full shrink-0 overflow-hidden lg:h-full lg:w-3/5">
                                        {featured.featured_image_url ? (
                                            <img
                                                src={
                                                    featured.featured_image_url
                                                }
                                                alt={featured.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-emerald-900/40">
                                                <Newspaper className="h-20 w-20 text-emerald-700/50" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-gray-900/20 to-gray-900 lg:block" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent lg:hidden" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative flex flex-1 flex-col justify-center p-8 lg:p-12">
                                        {/* Categories */}
                                        {featured.categories.length > 0 && (
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {featured.categories.map(
                                                    (cat) => (
                                                        <span
                                                            key={cat.id}
                                                            className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300"
                                                        >
                                                            <Tag className="h-3 w-3" />
                                                            {cat.name}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        )}

                                        <h2 className="text-2xl leading-tight font-extrabold text-white transition-colors duration-300 group-hover:text-emerald-300 sm:text-3xl lg:text-4xl">
                                            {featured.title}
                                        </h2>

                                        {featured.excerpt && (
                                            <p className="mt-4 line-clamp-3 text-base leading-relaxed text-gray-300">
                                                {featured.excerpt}
                                            </p>
                                        )}

                                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                            <span className="inline-flex items-center gap-1.5">
                                                <User className="h-4 w-4" />
                                                {featured.author.name}
                                            </span>
                                            {featured.published_at && (
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(
                                                        featured.published_at,
                                                    )}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-8">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-emerald-400">
                                                Baca Selengkapnya
                                                <ChevronRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </section>
                        )}

                        {/* ── Masonry Grid ── */}
                        {masonryArticles.length > 0 && (
                            <section>
                                <div className="mb-6">
                                    <span className="bg-emerald-600 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase dark:bg-emerald-500">
                                        Pilihan
                                    </span>
                                    <div className="h-0.5 w-full bg-emerald-600 dark:bg-emerald-500" />
                                </div>

                                {/* Masonry via CSS columns */}
                                <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
                                    {masonryArticles.map((article, i) => {
                                        const isLarge = i === 0 || i === 3;
                                        return (
                                            <div
                                                key={article.id}
                                                className="mb-5 break-inside-avoid"
                                            >
                                                <Link
                                                    href={
                                                        articleShow({
                                                            article:
                                                                article.slug,
                                                        }).url
                                                    }
                                                    className="group block overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)] ring-1 ring-gray-100 transition hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:bg-gray-900 dark:ring-gray-800"
                                                >
                                                    {/* Image */}
                                                    <div
                                                        className={`relative overflow-hidden ${isLarge ? 'aspect-[4/3]' : 'aspect-[16/9]'}`}
                                                    >
                                                        {article.featured_image_url ? (
                                                            <img
                                                                src={
                                                                    article.featured_image_url
                                                                }
                                                                alt={
                                                                    article.title
                                                                }
                                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-emerald-50 dark:bg-emerald-950/30">
                                                                <Newspaper className="h-10 w-10 text-emerald-200 dark:text-emerald-800" />
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                                        {article
                                                            .categories[0] && (
                                                            <div className="absolute top-3 left-3">
                                                                <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                                                                    {
                                                                        article
                                                                            .categories[0]
                                                                            .name
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Body */}
                                                    <div className="p-5">
                                                        <h3
                                                            className={`leading-snug font-bold text-gray-900 transition group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 ${isLarge ? 'text-lg' : 'text-base'}`}
                                                        >
                                                            {article.title}
                                                        </h3>
                                                        {article.excerpt && (
                                                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                                                {
                                                                    article.excerpt
                                                                }
                                                            </p>
                                                        )}
                                                        <div className="mt-4 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                                                            <span className="inline-flex items-center gap-1">
                                                                <User className="h-3 w-3" />
                                                                {
                                                                    article
                                                                        .author
                                                                        .name
                                                                }
                                                            </span>
                                                            {article.published_at && (
                                                                <>
                                                                    <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                                                                    <span className="inline-flex items-center gap-1">
                                                                        <Calendar className="h-3 w-3" />
                                                                        {formatDateShort(
                                                                            article.published_at,
                                                                        )}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* ── Latest Articles (list) ── */}
                        {latestArticles.length > 0 && (
                            <section>
                                <div className="mb-6">
                                    <span className="bg-emerald-600 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase dark:bg-emerald-500">
                                        Terbaru
                                    </span>
                                    <div className="h-0.5 w-full bg-emerald-600 dark:bg-emerald-500" />
                                </div>

                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {latestArticles.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={
                                                articleShow({
                                                    article: article.slug,
                                                }).url
                                            }
                                            className="group flex items-start gap-5 py-5 transition"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-36">
                                                {article.featured_image_url ? (
                                                    <img
                                                        src={
                                                            article.featured_image_url
                                                        }
                                                        alt={article.title}
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-emerald-50 dark:bg-emerald-950/30">
                                                        <Newspaper className="h-8 w-8 text-emerald-200 dark:text-emerald-800" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="min-w-0 flex-1">
                                                {article.categories[0] && (
                                                    <span className="mb-1.5 inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                                                        <Tag className="h-2.5 w-2.5" />
                                                        {
                                                            article
                                                                .categories[0]
                                                                .name
                                                        }
                                                    </span>
                                                )}
                                                <h3 className="line-clamp-2 text-base leading-snug font-bold text-gray-900 transition group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                                                    {article.title}
                                                </h3>
                                                {article.excerpt && (
                                                    <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                                                        {article.excerpt}
                                                    </p>
                                                )}
                                                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                                                    <span className="inline-flex items-center gap-1">
                                                        <User className="h-3 w-3" />
                                                        {article.author.name}
                                                    </span>
                                                    {article.published_at && (
                                                        <>
                                                            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                                                            <span className="inline-flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {formatDateShort(
                                                                    article.published_at,
                                                                )}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <ChevronRight className="mt-1 hidden h-5 w-5 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-emerald-500 sm:block dark:text-gray-600 dark:group-hover:text-emerald-400" />
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ── Pagination ── */}
                        {articles.meta.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-4">
                                {articles.links.map((link, i) => {
                                    const isFirst = i === 0;
                                    const isLast =
                                        i === articles.links.length - 1;

                                    if (!link.url) {
                                        return (
                                            <span
                                                key={i}
                                                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300 dark:text-gray-600"
                                            >
                                                {isFirst ? (
                                                    <ChevronLeft className="h-4 w-4" />
                                                ) : isLast ? (
                                                    <ChevronRight className="h-4 w-4" />
                                                ) : (
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                )}
                                            </span>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${
                                                link.active
                                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                                                    : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400'
                                            }`}
                                        >
                                            {isFirst ? (
                                                <ChevronLeft className="h-4 w-4" />
                                            ) : isLast ? (
                                                <ChevronRight className="h-4 w-4" />
                                            ) : (
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ArticlesIndex;
