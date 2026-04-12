import {
    index as curriculumIndex,
    show as curriculumShow,
} from '@/actions/App/Http/Controllers/CurriculumController';
import PageHero from '@/themes/clean-emerald/components/page-hero';
import {
    type CurriculumCardResource,
    type CurriculumResource,
    type SiteConfig,
} from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { ArrowLeft, BookOpen, Calendar, Download } from 'lucide-react';

interface Props {
    curriculum: CurriculumResource;
    others: CurriculumCardResource[];
}

const CurriculaShow = ({ curriculum, others }: Props) => {
    const { siteConfig } = usePage<{ siteConfig: SiteConfig | null }>().props;

    const IconComponent = (Icons[curriculum.icon as keyof typeof Icons] ??
        Icons.BookOpen) as React.ComponentType<{
        className?: string;
    }>;

    const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
    const excerpt = curriculum.content
        ? stripHtml(curriculum.content).slice(0, 160)
        : curriculum.description.slice(0, 160);

    return (
        <>
            <Head title={`${curriculum.name} - SDIT Al-Aziz`}>
                <meta name="description" content={excerpt} />
                <meta
                    property="og:title"
                    content={`${curriculum.name} - SDIT Al-Aziz`}
                />
                <meta property="og:description" content={excerpt} />
                <meta property="og:type" content="article" />
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

            <div className="mx-auto max-w-7xl px-4 py-12 font-[Plus_Jakarta_Sans] sm:px-6 lg:px-8">
                <Link
                    href={curriculumIndex.url()}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Kurikulum
                </Link>

                <div className="mt-8 flex gap-10 lg:items-start">
                    {/* Main content */}
                    <article className="min-w-0 flex-1">
                        <PageHero
                            badge={`${curriculum.level} · ${curriculum.year}`}
                            title=""
                            highlight={curriculum.name}
                            description={curriculum.description}
                        />

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="h-4 w-4" />
                                Tahun {curriculum.year}
                            </span>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                {curriculum.level}
                            </span>
                        </div>

                        {curriculum.content && (
                            <div
                                className="prose prose-emerald dark:prose-invert mt-10 max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: curriculum.content,
                                }}
                            />
                        )}

                        {curriculum.document_url && (
                            <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
                                <a
                                    href={curriculum.document_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                                >
                                    <Download className="h-4 w-4" />
                                    Unduh Dokumen Kurikulum
                                </a>
                            </section>
                        )}
                    </article>

                    {/* Right Sidebar */}
                    <aside className="hidden w-64 shrink-0 lg:block">
                        <div>
                            <span className="bg-emerald-600 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase dark:bg-emerald-500">
                                Kurikulum Lainnya
                            </span>
                            <div className="h-0.5 w-full bg-emerald-600 dark:bg-emerald-500" />
                        </div>

                        {others.length === 0 ? (
                            <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
                                Belum ada kurikulum lain.
                            </p>
                        ) : (
                            <ul className="mt-4 space-y-4">
                                {others.map((item) => {
                                    const ItemIcon = (Icons[
                                        item.icon as keyof typeof Icons
                                    ] ?? BookOpen) as React.ComponentType<{
                                        className?: string;
                                    }>;
                                    return (
                                        <li key={item.id}>
                                            <Link
                                                href={
                                                    curriculumShow({
                                                        curriculum: item.slug,
                                                    }).url
                                                }
                                                className="group flex items-start gap-3"
                                            >
                                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:group-hover:bg-emerald-900/50">
                                                    <ItemIcon className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="line-clamp-2 text-sm leading-snug font-medium text-gray-700 transition group-hover:text-emerald-600 dark:text-gray-300 dark:group-hover:text-emerald-400">
                                                        {item.name}
                                                    </p>
                                                    <p className="mt-0.5 line-clamp-2 text-[11px] text-gray-400 dark:text-gray-500">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
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
                        headline: curriculum.name,
                        description: excerpt,
                        datePublished: curriculum.effective_date,
                        dateModified: curriculum.updated_at,
                        publisher: {
                            '@type': 'Organization',
                            name: siteConfig?.identity?.name ?? 'SDIT Al-Aziz',
                        },
                    }),
                }}
            />
        </>
    );
};

export default CurriculaShow;
