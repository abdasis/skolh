import {
    index as announcementIndex,
    show as announcementShow,
} from '@/actions/App/Http/Controllers/AnnouncementController';
import type { AnnouncementCardResource } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';

interface Props {
    announcements: AnnouncementCardResource[];
}

const AnnouncementIndex = ({ announcements }: Props) => {
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const formatDate = (dateString: string | null) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatDateShort = (dateString: string | null) => {
        if (!dateString) return null;
        const d = new Date(dateString);
        return {
            day: d.getDate().toString().padStart(2, '0'),
            month: d.toLocaleDateString('id-ID', { month: 'short' }),
        };
    };

    return (
        <>
            <Head title="Pengumuman - SDIT Al-Aziz">
                <meta
                    name="description"
                    content="Informasi dan pengumuman resmi dari SDIT Al-Aziz."
                />
                <meta property="og:title" content="Pengumuman - SDIT Al-Aziz" />
                <meta
                    property="og:description"
                    content="Informasi dan pengumuman resmi dari SDIT Al-Aziz."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={announcementIndex.url()} />
            </Head>

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Page header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div className="relative">
                        {/* Decorative background shapes */}
                        <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-emerald-100/60 blur-2xl dark:bg-emerald-900/30" />
                        <div className="absolute top-2 left-32 h-12 w-12 rounded-full bg-teal-100/50 blur-xl dark:bg-teal-900/20" />

                        <div className="relative">
                            {/* Badge with pulse dot */}
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                </span>
                                Pengumuman
                            </span>

                            {/* Heading with vertical accent line */}
                            <div className="mt-3 flex items-start gap-4">
                                <div className="mt-1 flex shrink-0 flex-col items-center gap-1">
                                    <div className="h-6 w-0.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                    <div className="h-2 w-0.5 rounded-full bg-emerald-300 dark:bg-emerald-600" />
                                    <div className="h-1 w-0.5 rounded-full bg-emerald-200 dark:bg-emerald-700" />
                                </div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Pengumuman{' '}
                                    <span className="relative inline-block">
                                        <span className="relative z-10 text-emerald-600 dark:text-emerald-400">
                                            Terbaru
                                        </span>
                                        <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/50" />
                                    </span>
                                </h1>
                            </div>

                            {/* Description with separator line */}
                            <div className="mt-3 flex items-start gap-3">
                                <div className="mt-1 h-4 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                                <p className="text-base text-gray-500 dark:text-gray-400">
                                    Informasi dan pengumuman resmi dari SDIT
                                    Al-Aziz.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* View toggle */}
                    <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800/60">
                        <button
                            type="button"
                            onClick={() => setView('grid')}
                            aria-label="Tampilan grid"
                            className={[
                                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200',
                                view === 'grid'
                                    ? 'bg-white text-emerald-700 shadow-sm dark:bg-gray-700 dark:text-emerald-400'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                            ].join(' ')}
                        >
                            <LayoutGrid className="h-3.5 w-3.5" />
                            Grid
                        </button>
                        <button
                            type="button"
                            onClick={() => setView('list')}
                            aria-label="Tampilan list"
                            className={[
                                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200',
                                view === 'list'
                                    ? 'bg-white text-emerald-700 shadow-sm dark:bg-gray-700 dark:text-emerald-400'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                            ].join(' ')}
                        >
                            <List className="h-3.5 w-3.5" />
                            List
                        </button>
                    </div>
                </div>

                {/* Empty state */}
                {announcements.length === 0 && (
                    <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
                            <Calendar className="h-7 w-7 text-gray-400" />
                        </div>
                        <p className="text-base font-semibold text-gray-500 dark:text-gray-400">
                            Belum ada pengumuman yang diterbitkan.
                        </p>
                    </div>
                )}

                {/* Grid view */}
                {announcements.length > 0 && view === 'grid' && (
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {announcements.map((item) => (
                            <Link
                                key={item.id}
                                href={
                                    announcementShow({
                                        announcement: item.slug,
                                    }).url
                                }
                                className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-xs transition-all duration-200 dark:border-gray-800 dark:bg-gray-900"
                            >
                                {/* Top accent bar — 80% wide, centered, appears on hover */}
                                <div className="absolute top-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-emerald-500 transition-all duration-300 ease-out group-hover:w-4/5 dark:bg-emerald-400" />

                                <div className="flex flex-1 flex-col p-5">
                                    {/* Categories */}
                                    {item.categories.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.categories.map((cat) => (
                                                <span
                                                    key={cat.id}
                                                    className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                                                >
                                                    {cat.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h2 className="mt-3 text-sm leading-snug font-semibold text-gray-800 transition-colors duration-200 group-hover:text-emerald-700 dark:text-gray-100 dark:group-hover:text-emerald-400">
                                        {item.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                                        {item.excerpt}
                                    </p>

                                    {/* Footer */}
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500">
                                            <Calendar className="h-3 w-3" />
                                            <span>
                                                {formatDate(
                                                    item.published_at,
                                                ) ?? '—'}
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-500 transition-colors duration-200 group-hover:text-emerald-600 dark:text-emerald-400">
                                            Baca
                                            <svg
                                                className="h-3 w-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* List view */}
                {announcements.length > 0 && view === 'list' && (
                    <div className="mt-10 flex flex-col gap-4">
                        {announcements.map((item) => {
                            const short = formatDateShort(item.published_at);
                            return (
                                <Link
                                    key={item.id}
                                    href={
                                        announcementShow({
                                            announcement: item.slug,
                                        }).url
                                    }
                                    className="group flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-gray-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:border-gray-800 dark:bg-gray-900 dark:shadow-[0_1px_4px_rgba(0,0,0,0.2)] dark:hover:border-gray-700 dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                                >
                                    {/* Date box */}
                                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-emerald-600 text-white dark:bg-emerald-700">
                                        {short ? (
                                            <>
                                                <span className="text-xl leading-none font-extrabold">
                                                    {short.day}
                                                </span>
                                                <span className="mt-0.5 text-[10px] font-medium text-emerald-200 uppercase">
                                                    {short.month}
                                                </span>
                                            </>
                                        ) : (
                                            <Calendar className="h-6 w-6 text-emerald-200/70" />
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        {item.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.categories.map((cat) => (
                                                    <span
                                                        key={cat.id}
                                                        className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                                                    >
                                                        {cat.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <h2 className="mt-1.5 text-base leading-snug font-bold text-gray-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                                            {item.title}
                                        </h2>
                                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                            {item.excerpt}
                                        </p>
                                    </div>
                                    {/* Arrow */}
                                    <div className="shrink-0 self-center">
                                        <svg
                                            className="h-5 w-5 text-gray-300 transition group-hover:text-emerald-600 dark:text-gray-600 dark:group-hover:text-emerald-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default AnnouncementIndex;
