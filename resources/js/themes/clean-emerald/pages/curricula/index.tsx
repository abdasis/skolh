import {
    index as curriculumIndex,
    show as curriculumShow,
} from '@/actions/App/Http/Controllers/CurriculumController';
import { type CurriculumCardResource } from '@/types';
import { Head, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';

interface Props {
    curricula: CurriculumCardResource[];
}

const CurriculumIndex = ({ curricula }: Props) => {
    return (
        <>
            <Head title="Kurikulum - SDIT Al-Aziz">
                <meta
                    name="description"
                    content="Kurikulum komprehensif SDIT Al-Aziz untuk membentuk generasi unggul berakhlak mulia."
                />
                <meta property="og:title" content="Kurikulum - SDIT Al-Aziz" />
                <meta
                    property="og:description"
                    content="Kurikulum komprehensif SDIT Al-Aziz untuk membentuk generasi unggul berakhlak mulia."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={curriculumIndex.url()} />
            </Head>

            <div className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Page header */}
                    <div className="text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                            Program Unggulan
                        </span>
                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Kurikulum yang Komprehensif
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400">
                            Program pendidikan yang dirancang untuk
                            mengembangkan potensi siswa secara menyeluruh.
                        </p>
                    </div>

                    {/* Grid */}
                    {curricula.length === 0 ? (
                        <div className="mt-16 flex flex-col items-center justify-center py-20 text-center">
                            <div className="inline-flex rounded-2xl bg-emerald-50 p-6 dark:bg-emerald-950/30">
                                <Icons.BookOpen className="h-10 w-10 text-emerald-400" />
                            </div>
                            <p className="mt-4 text-base font-medium text-gray-500 dark:text-gray-400">
                                Belum ada kurikulum yang dipublikasikan.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {curricula.map((curriculum, index) => {
                                const colors = [
                                    'emerald',
                                    'teal',
                                    'orange',
                                ] as const;
                                const color = colors[index % colors.length];
                                const palette = {
                                    emerald: {
                                        gradient:
                                            'from-emerald-500/10 via-transparent to-transparent dark:from-emerald-500/15',
                                        iconBg: 'bg-emerald-100 dark:bg-emerald-950',
                                        iconText:
                                            'text-emerald-600 dark:text-emerald-400',
                                        numText:
                                            'text-emerald-200 dark:text-emerald-900',
                                        line: 'bg-emerald-500',
                                        arrow: 'text-emerald-600 dark:text-emerald-400',
                                    },
                                    teal: {
                                        gradient:
                                            'from-teal-500/10 via-transparent to-transparent dark:from-teal-500/15',
                                        iconBg: 'bg-teal-100 dark:bg-teal-950',
                                        iconText:
                                            'text-teal-600 dark:text-teal-400',
                                        numText:
                                            'text-teal-200 dark:text-teal-900',
                                        line: 'bg-teal-500',
                                        arrow: 'text-teal-600 dark:text-teal-400',
                                    },
                                    orange: {
                                        gradient:
                                            'from-orange-500/10 via-transparent to-transparent dark:from-orange-500/15',
                                        iconBg: 'bg-orange-100 dark:bg-orange-950',
                                        iconText:
                                            'text-orange-600 dark:text-orange-400',
                                        numText:
                                            'text-orange-200 dark:text-orange-900',
                                        line: 'bg-orange-500',
                                        arrow: 'text-orange-600 dark:text-orange-400',
                                    },
                                };
                                const p = palette[color];
                                const num = String(index + 1).padStart(2, '0');
                                const IconComponent = (Icons[
                                    curriculum.icon as keyof typeof Icons
                                ] ?? Icons.BookOpen) as React.ComponentType<{
                                    className?: string;
                                }>;

                                return (
                                    <Link
                                        key={curriculum.id}
                                        href={
                                            curriculumShow({
                                                curriculum: curriculum.slug,
                                            }).url
                                        }
                                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                                    >
                                        {/* Colored top bar */}
                                        <div
                                            className={`h-1 w-0 ${p.line} transition-all duration-500 ease-out group-hover:w-full`}
                                        />

                                        {/* Gradient wash */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${p.gradient} pointer-events-none`}
                                        />

                                        {/* Big background number */}
                                        <span
                                            className={`pointer-events-none absolute top-3 right-4 text-7xl leading-none font-black select-none ${p.numText} transition duration-300 group-hover:opacity-60`}
                                        >
                                            {num}
                                        </span>

                                        <div className="relative flex flex-1 flex-col p-6">
                                            {/* Icon */}
                                            <div
                                                className={`mt-5 inline-flex rounded-xl p-3 ${p.iconBg} w-fit shadow-sm`}
                                            >
                                                <IconComponent
                                                    className={`h-6 w-6 ${p.iconText}`}
                                                />
                                            </div>

                                            {/* Title */}
                                            <h2 className="mt-4 text-lg leading-snug font-bold text-gray-900 dark:text-white">
                                                {curriculum.name}
                                            </h2>

                                            {/* Desc */}
                                            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                                {curriculum.description.length >
                                                120
                                                    ? curriculum.description.slice(
                                                          0,
                                                          120,
                                                      ) + '…'
                                                    : curriculum.description}
                                            </p>

                                            {/* Footer link */}
                                            <div className="mt-6 flex items-center gap-1.5 border-t border-gray-100 pt-4 dark:border-gray-800">
                                                <span
                                                    className={`text-xs font-semibold ${p.arrow} transition-all duration-200 group-hover:underline`}
                                                >
                                                    Selengkapnya
                                                </span>
                                                <svg
                                                    className={`h-3.5 w-3.5 ${p.arrow} transition-transform duration-200 group-hover:translate-x-1`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2.5}
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CurriculumIndex;
