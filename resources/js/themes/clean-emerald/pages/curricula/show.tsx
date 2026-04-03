import { Head, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { ArrowLeft, Calendar, Download } from 'lucide-react';

import { type CurriculumResource } from '@/types';

interface Props {
    curriculum: CurriculumResource;
}

const CurriculaShow = ({ curriculum }: Props) => {
    const IconComponent = (Icons[curriculum.icon as keyof typeof Icons] ?? Icons.BookOpen) as React.ComponentType<{
        className?: string;
    }>;

    const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
    const excerpt = curriculum.content ? stripHtml(curriculum.content).slice(0, 160) : curriculum.description.slice(0, 160);

    return (
        <>
            <Head title={curriculum.name}>
                <meta name="description" content={excerpt} />
                <meta property="og:title" content={`${curriculum.name} - SDIT Al-Aziz`} />
                <meta property="og:description" content={excerpt} />
                <meta property="og:type" content="article" />
                <link rel="canonical" href={window.location.href.split('?')[0]} />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-white font-[Plus_Jakarta_Sans] text-gray-900 dark:bg-gray-950 dark:text-gray-100">
                <div className="border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
                    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>

                <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                    <header className="flex items-start gap-4">
                        <div className="inline-flex shrink-0 rounded-xl bg-emerald-600 p-3 text-white">
                            <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                {curriculum.name}
                            </h1>
                            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">{curriculum.description}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="inline-flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Tahun {curriculum.year}
                                </span>
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                    {curriculum.level}
                                </span>
                            </div>
                        </div>
                    </header>

                    {curriculum.content && (
                        <div
                            className="prose prose-emerald mt-10 max-w-none dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: curriculum.content }}
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
                            name: 'SDIT Al-Aziz',
                        },
                    }),
                }}
            />
        </>
    );
};

export default CurriculaShow;
