import * as Icons from 'lucide-react';
import { NewspaperIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import {
    index as articleIndex,
    show as articleShow,
} from '@/actions/App/Http/Controllers/ArticleController';
import type { ArticleResource, SiteConfig } from '@/types';
import SectionHeader from '../section-header';

const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
    return (first + last).toUpperCase();
};

interface ArticlesSectionProps {
    articles: ArticleResource[];
    articlesTotal: number;
    siteConfig: SiteConfig | null;
}

const ArticlesSection = ({ articles, articlesTotal, siteConfig }: ArticlesSectionProps) => {
    if (siteConfig?.sections?.articles?.enabled === false) {
        return null;
    }

    return (
        <section id="berita" className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <SectionHeader
                        icon={<NewspaperIcon className="h-3.5 w-3.5 text-[#006BFF] dark:text-[#3B8BFF]" />}
                        label="Berita &"
                        accentWord="Kegiatan"
                        heading={siteConfig?.sections?.articles?.heading ?? 'Berita Terbaru'}
                        description={siteConfig?.sections?.articles?.description}
                        align="left"
                    />
                    {articlesTotal > articles.length && (
                        <Link
                            href={articleIndex.url()}
                            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#99C7FF] px-4 py-2 text-sm font-semibold text-[#0052CC] transition hover:bg-[#E6F1FF] dark:border-[#003D99] dark:text-[#3B8BFF] dark:hover:bg-[#001F4D]/50"
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
                                ? new Date(article.published_at).toLocaleDateString('id-ID', {
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
                                        <div className="aspect-[16/9] bg-[#E6F1FF] dark:bg-[#001F4D]/30">
                                            {article.featured_image ? (
                                                <img
                                                    src={article.featured_image}
                                                    alt={article.title}
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <Icons.Newspaper className="h-12 w-12 text-[#99C7FF] dark:text-[#003D99]" />
                                                </div>
                                            )}
                                        </div>
                                        {firstCategory && (
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center rounded-full bg-[#006BFF] px-3 py-1 text-xs font-semibold text-white">
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
                                        <h3 className="mt-3 text-base leading-snug font-bold text-gray-900 transition group-hover:text-[#0052CC] dark:text-white dark:group-hover:text-[#3B8BFF]">
                                            {article.title}
                                        </h3>
                                        {article.excerpt && (
                                            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                                {article.excerpt}
                                            </p>
                                        )}
                                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#CCE3FF] text-[10px] font-bold text-[#0052CC] dark:bg-[#001F4D] dark:text-[#3B8BFF]">
                                                    {initials}
                                                </div>
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    {article.author.name}
                                                </span>
                                            </div>
                                            <Link
                                                href={articleShow({ article: article.slug }).url}
                                                className="flex items-center gap-1 text-xs font-semibold text-[#006BFF] transition hover:text-[#0052CC] dark:text-[#3B8BFF]"
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
