import {
    index as articleIndex,
    show as articleShow,
} from '@/actions/App/Http/Controllers/ArticleController';
import { Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { NewspaperIcon } from 'lucide-react';
import { type SiteConfig } from '@/types';

interface ArticlePreview {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string | null;
    published_at: string | null;
    author: { id: number; name: string };
    categories: { id: number; name: string; slug: string }[];
}

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const ArticlesSection = ({
    siteConfig,
    articles,
    articlesTotal,
}: {
    siteConfig: SiteConfig | null;
    articles: ArticlePreview[];
    articlesTotal: number;
}) => {
    return (
        <section
            id="berita"
            className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                            <NewspaperIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                            Berita &{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-emerald-600 dark:text-emerald-400">
                                    Kegiatan
                                </span>
                                <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/50" />
                            </span>
                        </span>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            {siteConfig?.sections?.articles?.heading ??
                                'Berita Terbaru'}
                        </h2>
                        {siteConfig?.sections?.articles?.description && (
                            <p className="mt-4 max-w-xl text-base text-gray-600 dark:text-gray-400">
                                {siteConfig.sections.articles.description}
                            </p>
                        )}
                    </div>
                    {articlesTotal > articles.length && (
                        <Link
                            href={articleIndex.url()}
                            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                        >
                            Lihat Semua Berita
                            <Icons.ArrowRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>

                {articles.length > 0 && (
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => {
                            const firstCategory = article.categories[0];
                            const formattedDate = article.published_at
                                ? new Date(
                                      article.published_at,
                                  ).toLocaleDateString('id-ID', {
                                      day: 'numeric',
                                      month: 'long',
                                      year: 'numeric',
                                  })
                                : null;
                            const initials = getInitials(article.author.name);

                            return (
                                <article
                                    key={article.id}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:border-gray-800 dark:bg-gray-900 dark:shadow-[0_1px_4px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                                >
                                    <div className="relative overflow-hidden">
                                        <div className="aspect-video bg-emerald-50 dark:bg-emerald-950/30">
                                            {article.featured_image ? (
                                                <img
                                                    src={article.featured_image}
                                                    alt={article.title}
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <Icons.Newspaper className="h-12 w-12 text-emerald-200 dark:text-emerald-800" />
                                                </div>
                                            )}
                                        </div>
                                        {firstCategory && (
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                                                    {firstCategory.name}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        {formattedDate && (
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                                <svg
                                                    className="h-3.5 w-3.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.8}
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                                    />
                                                </svg>
                                                <span>{formattedDate}</span>
                                            </div>
                                        )}
                                        <h3 className="mt-3 text-base leading-snug font-bold text-gray-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                                            {article.title}
                                        </h3>
                                        {article.excerpt && (
                                            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                                {article.excerpt}
                                            </p>
                                        )}
                                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                                    {initials}
                                                </div>
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    {article.author.name}
                                                </span>
                                            </div>
                                            <Link
                                                href={
                                                    articleShow({
                                                        article: article.slug,
                                                    }).url
                                                }
                                                className="flex items-center gap-1 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
                                            >
                                                Baca selengkapnya
                                                <Icons.ArrowRight className="h-3.5 w-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ArticlesSection;
export type { ArticlePreview };
