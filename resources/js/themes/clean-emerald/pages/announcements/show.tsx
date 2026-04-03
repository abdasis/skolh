import {
    index as announcementIndex,
    show as announcementShow,
} from '@/actions/App/Http/Controllers/AnnouncementController';
import {
    type AnnouncementCardResource,
    type AnnouncementResource,
} from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Paperclip } from 'lucide-react';

interface Props {
    announcement: AnnouncementResource;
    latest: AnnouncementCardResource[];
    related: AnnouncementCardResource[];
}

const AnnouncementShow = ({ announcement, latest, related }: Props) => {
    const publishedDate = announcement.published_at
        ? new Date(announcement.published_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
        : null;

    const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
    const excerpt = stripHtml(announcement.content ?? '').slice(0, 160);

    const formatDateShort = (dateString: string | null) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <>
            <Head title={announcement.title}>
                <meta name="description" content={excerpt} />
                <meta
                    property="og:title"
                    content={`${announcement.title} - SDIT Al-Aziz`}
                />
                <meta property="og:description" content={excerpt} />
                <meta property="og:type" content="article" />
                <link
                    rel="canonical"
                    href={window.location.href.split('?')[0]}
                />
            </Head>

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <Link
                    href={announcementIndex.url()}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Pengumuman
                </Link>

                <div className="mt-8 flex gap-10 lg:items-start">
                    {/* Main content */}
                    <article className="min-w-0 flex-1">
                        <header className="mb-8">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                {announcement.title}
                            </h1>
                            {publishedDate && (
                                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Calendar className="h-4 w-4" />
                                    <time dateTime={announcement.published_at!}>
                                        {publishedDate}
                                    </time>
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
                            className="prose prose-emerald dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: announcement.content ?? '',
                            }}
                        />

                        {announcement.attachments.length > 0 && (
                            <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    Lampiran
                                </h2>
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

                    {/* Right Sidebar */}
                    <aside className="hidden w-64 shrink-0 lg:block">
                        {/* Pengumuman Terbaru */}
                        <div className="mb-8">
                            {/* Section header */}
                            <div>
                                <span className="bg-gray-900 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase dark:bg-gray-100 dark:text-gray-900">
                                    Terbaru
                                </span>
                                <div className="h-0.5 w-full bg-gray-900 dark:bg-gray-100" />
                            </div>
                            <ul className="mt-4 space-y-4">
                                {latest.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={
                                                announcementShow({
                                                    announcement: item.slug,
                                                }).url
                                            }
                                            className="group block"
                                        >
                                            <p className="line-clamp-2 text-sm leading-snug font-medium text-gray-700 transition group-hover:text-emerald-600 dark:text-gray-300 dark:group-hover:text-emerald-400">
                                                {item.title}
                                            </p>
                                            <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
                                                <Clock className="h-3 w-3" />
                                                <span>
                                                    {formatDateShort(
                                                        item.published_at,
                                                    ) ?? '—'}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pengumuman Terkait */}
                        {related.length > 0 && (
                            <div>
                                {/* Section header */}
                                <div className="flex items-center gap-0">
                                    <span className="bg-gray-900 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase dark:bg-gray-100 dark:text-gray-900">
                                        Terkait
                                    </span>
                                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                                </div>
                                <ul className="mt-4 space-y-4">
                                    {related.map((item) => (
                                        <li key={item.id}>
                                            <Link
                                                href={
                                                    announcementShow({
                                                        announcement: item.slug,
                                                    }).url
                                                }
                                                className="group block"
                                            >
                                                <p className="line-clamp-2 text-sm leading-snug font-medium text-gray-700 transition group-hover:text-emerald-600 dark:text-gray-300 dark:group-hover:text-emerald-400">
                                                    {item.title}
                                                </p>
                                                {item.categories.length > 0 && (
                                                    <div className="mt-1.5 flex flex-wrap gap-1">
                                                        {item.categories.map(
                                                            (cat) => (
                                                                <span
                                                                    key={cat.id}
                                                                    className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                                                >
                                                                    {cat.name}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
