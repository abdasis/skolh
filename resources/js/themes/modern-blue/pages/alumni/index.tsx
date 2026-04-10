import PublicAlumniController from '@/actions/App/Http/Controllers/Public/PublicAlumniController';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { type PaginatedAlumni, type SiteConfig } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { GraduationCapIcon, SearchIcon, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const COLOR_PRESETS = [
    { blob: 'bg-yellow-300', ring: 'border-yellow-400', dot: 'bg-yellow-400' },
    { blob: 'bg-[#66ABFF]', ring: 'border-[#3B8BFF]', dot: 'bg-[#3B8BFF]' },
    { blob: 'bg-[#FFF566]', ring: 'border-[#FFF100]', dot: 'bg-[#FFF100]' },
    { blob: 'bg-[#66ABFF]', ring: 'border-[#3B8BFF]', dot: 'bg-[#3B8BFF]' },
];

interface Props {
    alumni: PaginatedAlumni;
    filters: { search: string };
}

const AlumniIndex = ({ alumni, filters }: Props) => {
    const { siteConfig } = usePage<{ siteConfig: SiteConfig | null }>().props;
    const [search, setSearch] = useState(filters.search);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                PublicAlumniController.url(),
                { search: search || undefined, page: 1 },
                { preserveState: true, replace: true },
            );
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    const goToPage = (page: number) => {
        router.get(
            PublicAlumniController.url(),
            { search: search || undefined, page },
            { preserveState: true, replace: true },
        );
    };

    const { current_page, last_page } = alumni.meta;

    const pageNumbers = (() => {
        const pages: (number | 'ellipsis')[] = [];
        if (last_page <= 7) {
            for (let i = 1; i <= last_page; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (current_page > 3) {
                pages.push('ellipsis');
            }
            const start = Math.max(2, current_page - 1);
            const end = Math.min(last_page - 1, current_page + 1);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (current_page < last_page - 2) {
                pages.push('ellipsis');
            }
            pages.push(last_page);
        }
        return pages;
    })();

    return (
        <>
            <Head title={`Alumni - ${siteConfig?.identity?.name ?? ''}`}>
                <meta
                    name="description"
                    content={
                        siteConfig?.sections?.alumni?.description ?? undefined
                    }
                />
                <link rel="canonical" href={PublicAlumniController.url()} />
            </Head>

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                        <GraduationCapIcon className="h-3.5 w-3.5 text-[#006BFF] dark:text-[#3B8BFF]" />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-[#006BFF] dark:text-[#3B8BFF]">
                                Alumni
                            </span>
                            <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-[#CCE3FF] dark:bg-[#002966]/50" />
                        </span>
                    </span>
                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        {siteConfig?.sections?.alumni?.heading ??
                            'Jejak Prestasi Alumni Kami'}
                    </h1>
                    {siteConfig?.sections?.alumni?.description && (
                        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
                            {siteConfig.sections.alumni.description}
                        </p>
                    )}
                </div>

                {/* Search */}
                <div className="mx-auto mt-10 max-w-md">
                    <div className="relative">
                        <SearchIcon className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama, angkatan, atau tujuan..."
                            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-700 shadow-sm transition focus:border-[#3B8BFF] focus:ring-2 focus:ring-[#006BFF]/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                        />
                    </div>
                </div>

                {/* Alumni cards grid */}
                {alumni.data.length === 0 ? (
                    <div className="mt-16 flex flex-col items-center justify-center py-20 text-center">
                        <UserIcon className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                        <p className="mt-4 text-base font-medium text-gray-500 dark:text-gray-400">
                            {search
                                ? 'Tidak ada alumni yang cocok dengan pencarian.'
                                : 'Belum ada data alumni.'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mt-12 grid gap-6 sm:grid-cols-2">
                            {alumni.data.map((alumniItem, index) => {
                                const preset =
                                    COLOR_PRESETS[
                                        index % COLOR_PRESETS.length
                                    ]!;
                                return (
                                    <div
                                        key={alumniItem.id}
                                        className="group relative flex overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#006BFF]/5 dark:bg-gray-900"
                                    >
                                        {/* Left: photo area */}
                                        <div className="relative w-36 shrink-0 overflow-hidden sm:w-44">
                                            <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800" />
                                            <div
                                                className={`absolute -bottom-8 -left-8 h-40 w-40 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] ${preset.blob} opacity-90`}
                                            />
                                            <div
                                                className={`absolute -top-6 -right-6 h-20 w-20 rounded-[60%_40%_45%_55%/50%_60%_40%_50%] ${preset.blob} opacity-40`}
                                            />
                                            <div
                                                className={`absolute bottom-6 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border-4 ${preset.ring} opacity-30`}
                                            />
                                            <div
                                                className={`absolute top-4 left-4 h-2.5 w-2.5 rounded-full ${preset.dot} opacity-60`}
                                            />
                                            <div
                                                className={`absolute top-8 left-7 h-1.5 w-1.5 rounded-full ${preset.dot} opacity-40`}
                                            />
                                            <div
                                                className={`absolute top-5 left-9 h-1 w-1 rounded-full ${preset.dot} opacity-30`}
                                            />
                                            <div className="relative z-10 flex h-full items-end justify-center pt-6 pb-3 pl-3">
                                                <div className="h-28 w-24 overflow-hidden rounded-2xl shadow-lg ring-2 ring-white/60 sm:h-36 sm:w-28">
                                                    {alumniItem.avatar_url ? (
                                                        <img
                                                            src={
                                                                alumniItem.avatar_url
                                                            }
                                                            alt={
                                                                alumniItem.name
                                                            }
                                                            className="h-full w-full object-cover object-top"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                                                            <Icons.User className="h-10 w-10 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: content */}
                                        <div className="flex flex-1 flex-col justify-between p-6 pl-5">
                                            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                                {alumniItem.quote}
                                            </p>
                                            <div className="mt-4">
                                                <p className="inline rounded bg-[#006BFF] px-2 py-0.5 text-sm font-bold text-white">
                                                    {alumniItem.name}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    {alumniItem.batch}
                                                </p>
                                            </div>
                                            <div className="mt-4">
                                                <div className="inline-flex items-center gap-2 rounded-lg bg-[#002966] px-4 py-2 text-xs font-semibold text-white dark:bg-[#003D99]">
                                                    <svg
                                                        className="h-3.5 w-3.5 shrink-0 text-[#66ABFF]"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                                        />
                                                    </svg>
                                                    {alumniItem.destination}
                                                </div>
                                            </div>
                                            {alumniItem.socials.length > 0 && (
                                                <div className="mt-3 flex items-center gap-2">
                                                    {alumniItem.socials.map(
                                                        (social) => (
                                                            <a
                                                                key={social.id}
                                                                href={
                                                                    social.url
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="rounded-md p-1 text-gray-400 transition hover:text-[#006BFF] dark:hover:text-[#3B8BFF]"
                                                                aria-label={
                                                                    social.platform
                                                                }
                                                            >
                                                                <Icons.Link2 className="h-4 w-4" />
                                                            </a>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {last_page > 1 && (
                            <div className="mt-12 flex justify-center">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                text="Sebelumnya"
                                                onClick={() =>
                                                    goToPage(current_page - 1)
                                                }
                                                aria-disabled={
                                                    current_page === 1
                                                }
                                                className={
                                                    current_page === 1
                                                        ? 'pointer-events-none opacity-50'
                                                        : 'cursor-pointer'
                                                }
                                            />
                                        </PaginationItem>
                                        {pageNumbers.map((page, i) =>
                                            page === 'ellipsis' ? (
                                                <PaginationItem
                                                    key={`ellipsis-${i}`}
                                                >
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            ) : (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        isActive={
                                                            page ===
                                                            current_page
                                                        }
                                                        onClick={() =>
                                                            goToPage(page)
                                                        }
                                                        className="cursor-pointer"
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ),
                                        )}
                                        <PaginationItem>
                                            <PaginationNext
                                                text="Berikutnya"
                                                onClick={() =>
                                                    goToPage(current_page + 1)
                                                }
                                                aria-disabled={
                                                    current_page === last_page
                                                }
                                                className={
                                                    current_page === last_page
                                                        ? 'pointer-events-none opacity-50'
                                                        : 'cursor-pointer'
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default AlumniIndex;
