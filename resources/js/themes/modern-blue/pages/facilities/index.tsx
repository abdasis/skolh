import {
    index as facilityIndex,
    show as facilityShow,
} from '@/actions/App/Http/Controllers/FacilityController';
import { type FacilityCardResource } from '@/types';
import { Head, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';

interface Props {
    facilities: FacilityCardResource[];
}

const FacilityIndex = ({ facilities }: Props) => {
    return (
        <>
            <Head title="Fasilitas Sekolah - SDIT Al-Aziz">
                <meta
                    name="description"
                    content="Fasilitas lengkap dan modern SDIT Al-Aziz untuk mendukung proses belajar mengajar yang optimal."
                />
                <meta
                    property="og:title"
                    content="Fasilitas Sekolah - SDIT Al-Aziz"
                />
                <meta
                    property="og:description"
                    content="Fasilitas lengkap dan modern SDIT Al-Aziz untuk mendukung proses belajar mengajar yang optimal."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={facilityIndex.url()} />
            </Head>

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Page header */}
                <div className="relative">
                    <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-emerald-100/60 blur-2xl dark:bg-emerald-900/30" />
                    <div className="absolute top-2 left-32 h-12 w-12 rounded-full bg-teal-100/50 blur-xl dark:bg-teal-900/20" />

                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                            Fasilitas Sekolah
                        </span>

                        <div className="mt-3 flex items-start gap-4">
                            <div className="mt-1 flex shrink-0 flex-col items-center gap-1">
                                <div className="h-6 w-0.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                <div className="h-2 w-0.5 rounded-full bg-emerald-300 dark:bg-emerald-600" />
                                <div className="h-1 w-0.5 rounded-full bg-emerald-200 dark:bg-emerald-700" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Lingkungan Belajar{' '}
                                    <span className="text-emerald-600 dark:text-emerald-400">
                                        yang Nyaman
                                    </span>
                                </h1>
                                <p className="mt-3 max-w-xl text-base text-gray-600 dark:text-gray-400">
                                    Fasilitas lengkap dan modern untuk mendukung
                                    proses belajar mengajar yang optimal di SDIT
                                    Al-Aziz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {facilities.length === 0 ? (
                    <div className="mt-16 flex flex-col items-center justify-center py-20 text-center">
                        <div className="inline-flex rounded-2xl bg-emerald-50 p-6 dark:bg-emerald-950/30">
                            <Icons.Building2 className="h-10 w-10 text-emerald-400" />
                        </div>
                        <p className="mt-4 text-base font-medium text-gray-500 dark:text-gray-400">
                            Belum ada fasilitas yang dipublikasikan.
                        </p>
                    </div>
                ) : (
                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {facilities.map((facility) => {
                            const IconComponent = (Icons[
                                facility.icon as keyof typeof Icons
                            ] ?? Icons.Building2) as React.ComponentType<{
                                className?: string;
                            }>;

                            return (
                                <Link
                                    key={facility.id}
                                    href={
                                        facilityShow({
                                            facility: facility.slug,
                                        }).url
                                    }
                                    className="group relative overflow-hidden rounded-2xl bg-emerald-600 p-5 text-white transition duration-300 hover:-translate-y-1 dark:bg-emerald-700"
                                >
                                    {/* Decorative curved lines - top right */}
                                    <svg
                                        className="pointer-events-none absolute -top-3 -right-3 h-20 w-20 text-emerald-500/30"
                                        fill="none"
                                        viewBox="0 0 80 80"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path d="M80 0 C80 44.18 44.18 80 0 80" />
                                        <path d="M80 12 C80 49.56 49.56 80 12 80" />
                                        <path d="M80 24 C80 54.93 54.93 80 24 80" />
                                    </svg>

                                    {/* Decorative circle - bottom left */}
                                    <div className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full border-2 border-emerald-500/20" />
                                    <div className="pointer-events-none absolute -bottom-3 -left-3 h-14 w-14 rounded-full border-2 border-emerald-500/15" />

                                    {/* Diagonal accent line */}
                                    <div className="pointer-events-none absolute top-0 right-12 h-full w-px origin-top rotate-12 bg-linear-to-b from-emerald-400/20 via-emerald-400/10 to-transparent" />

                                    <div className="relative">
                                        <div className="inline-flex rounded-xl bg-white/15 p-3">
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>

                                        <h2 className="mt-4 text-sm font-bold text-white">
                                            {facility.title}
                                        </h2>
                                        <p className="mt-1 text-xs text-emerald-100/70">
                                            {facility.description}
                                        </p>

                                        <div className="mt-4 h-px w-0 bg-linear-to-r from-white/40 to-transparent transition-all duration-300 group-hover:w-full" />
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

export default FacilityIndex;
