import {
    index as curriculumIndex,
    show as curriculumShow,
} from '@/actions/App/Http/Controllers/CurriculumController';
import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import { BookOpenIcon } from 'lucide-react';
import { useRef } from 'react';
import { type CurriculumCardResource, type SiteConfig } from '@/types';

const CURRICULA_PALETTE = {
    emerald: {
        gradient:
            'from-emerald-500/10 via-transparent to-transparent dark:from-emerald-500/15',
        iconBg: 'bg-emerald-100 dark:bg-emerald-950',
        iconText: 'text-emerald-600 dark:text-emerald-400',
        numText: 'text-emerald-200 dark:text-emerald-900',
        line: 'bg-emerald-500',
        arrow: 'text-emerald-600 dark:text-emerald-400',
    },
    teal: {
        gradient:
            'from-teal-500/10 via-transparent to-transparent dark:from-teal-500/15',
        iconBg: 'bg-teal-100 dark:bg-teal-950',
        iconText: 'text-teal-600 dark:text-teal-400',
        numText: 'text-teal-200 dark:text-teal-900',
        line: 'bg-teal-500',
        arrow: 'text-teal-600 dark:text-teal-400',
    },
    orange: {
        gradient:
            'from-orange-500/10 via-transparent to-transparent dark:from-orange-500/15',
        iconBg: 'bg-orange-100 dark:bg-orange-950',
        iconText: 'text-orange-600 dark:text-orange-400',
        numText: 'text-orange-200 dark:text-orange-900',
        line: 'bg-orange-500',
        arrow: 'text-orange-600 dark:text-orange-400',
    },
} as const;

const CurriculaHeading = ({
    siteConfig,
}: {
    siteConfig: SiteConfig | null;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                <BookOpenIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Program{' '}
                <span className="relative inline-block">
                    <span className="relative z-10 text-emerald-600 dark:text-emerald-400">
                        Unggulan
                    </span>
                    <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/50" />
                </span>
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                {siteConfig?.sections?.curricula?.heading ??
                    'Kurikulum yang Komprehensif'}
            </h2>
            {siteConfig?.sections?.curricula?.description && (
                <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400">
                    {siteConfig.sections.curricula.description}
                </p>
            )}
        </motion.div>
    );
};

const CurriculaGrid = ({
    curricula,
}: {
    curricula: CurriculumCardResource[];
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <div
            ref={ref}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
            {curricula.map((curriculum, index) => {
                const colors = ['emerald', 'teal', 'orange'] as const;
                const p = CURRICULA_PALETTE[colors[index % colors.length]];
                const num = String(index + 1).padStart(2, '0');
                const IconComponent = (Icons[
                    curriculum.icon as keyof typeof Icons
                ] ?? Icons.BookOpen) as React.ComponentType<{
                    className?: string;
                }>;

                return (
                    <motion.div
                        key={curriculum.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: 'easeOut',
                        }}
                    >
                        <Link
                            href={curriculumShow.url({
                                curriculum: curriculum.slug,
                            })}
                            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                        >
                            {/* Colored top bar */}
                            <div
                                className={`h-1 w-0 ${p.line} transition-all duration-500 ease-out group-hover:w-full`}
                            />

                            {/* Gradient wash */}
                            <div
                                className={`absolute inset-0 bg-linear-to-br ${p.gradient} pointer-events-none`}
                            />

                            {/* Big background number */}
                            <span
                                className={`pointer-events-none absolute top-3 right-4 text-7xl leading-none font-black select-none ${p.numText} transition duration-300 group-hover:opacity-60`}
                            >
                                {num}
                            </span>

                            <div className="relative flex flex-1 flex-col p-6">
                                <div
                                    className={`mt-5 inline-flex rounded-xl p-3 ${p.iconBg} w-fit shadow-sm`}
                                >
                                    <IconComponent
                                        className={`h-6 w-6 ${p.iconText}`}
                                    />
                                </div>

                                <h3 className="mt-4 text-lg leading-snug font-bold text-gray-900 dark:text-white">
                                    {curriculum.name}
                                </h3>

                                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                    {curriculum.description.length > 120
                                        ? curriculum.description.slice(0, 120) +
                                          '...'
                                        : curriculum.description}
                                </p>

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
                    </motion.div>
                );
            })}
        </div>
    );
};

const CurriculaSection = ({
    siteConfig,
    curricula,
}: {
    siteConfig: SiteConfig | null;
    curricula: CurriculumCardResource[];
}) => {
    return (
        <section
            id="program"
            className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <CurriculaHeading siteConfig={siteConfig} />
                <CurriculaGrid curricula={curricula} />
                <div className="mt-10 text-center">
                    <Link
                        href={curriculumIndex.url()}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-emerald-400 to-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(16,185,129,0.35)] hover:brightness-110"
                    >
                        <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />
                        Lihat Semua Kurikulum
                        <Icons.ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CurriculaSection;
