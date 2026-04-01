import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Paperclip } from 'lucide-react';

import { type AnnouncementResource } from '@/types';

interface Props {
    announcement: AnnouncementResource;
}

const AnnouncementShow = ({ announcement }: Props) => {
    const publishedDate = announcement.published_at
        ? new Date(announcement.published_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
        : null;

    const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
    const excerpt = stripHtml(announcement.content ?? '').slice(0, 160);

    return (
        <>
            <Head title={announcement.title}>
                <meta name="description" content={excerpt} />
                <meta property="og:title" content={`${announcement.title} - SDIT Al-Aziz`} />
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
                    <header className="mb-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            {announcement.title}
                        </h1>
                        {publishedDate && (
                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={announcement.published_at!}>{publishedDate}</time>
                            </div>
                        )}
                        {announcement.categories.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {announcement.categories.map((cat) => (
                                    <span
                                        key={cat.id}
                                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    <div
                        className="prose prose-emerald max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: announcement.content ?? '' }}
                    />

                    {announcement.attachments.length > 0 && (
                        <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Lampiran</h2>
                            <ul className="space-y-2">
                                {announcement.attachments.map((att) => (
                                    <li key={att.id}>
                                        <a
                                            href={att.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                                        >
                                            <Paperclip className="h-4 w-4" />
                                            {att.original_name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
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
                        headline: announcement.title,
                        description: excerpt,
                        datePublished: announcement.published_at,
                        dateModified: announcement.updated_at,
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

export default AnnouncementShow;
