import * as Icons from 'lucide-react';
import { BookOpenIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import {
    index as curriculumIndex,
    show as curriculumShow,
} from '@/actions/App/Http/Controllers/CurriculumController';
import type { CurriculumCardResource, SiteConfig } from '@/types';
import SectionHeader from '../section-header';

const CURRICULUM_PALETTE = {
    emerald: {
        gradient: 'from-[#E6F1FF]0/10 via-transparent to-transparent dark:from-[#E6F1FF]0/15',
        iconBg: 'bg-[#CCE3FF] dark:bg-[#001F4D]',
        iconText: 'text-[#006BFF] dark:text-[#3B8BFF]',
        numText: 'text-[#99C7FF] dark:text-[#002966]',
        line: 'bg-[#E6F1FF]0',
        arrow: 'text-[#006BFF] dark:text-[#3B8BFF]',
    },
    teal: {
        gradient: 'from-[#006BFF]/10 via-transparent to-transparent dark:from-[#006BFF]/15',
        iconBg: 'bg-[#CCE3FF] dark:bg-[#001F4D]',
        iconText: 'text-[#006BFF] dark:text-[#3B8BFF]',
        numText: 'text-[#99C7FF] dark:text-[#002966]',
        line: 'bg-[#006BFF]',
        arrow: 'text-[#006BFF] dark:text-[#3B8BFF]',
    },
    orange: {
        gradient: 'from-[#FFF100]/10 via-transparent to-transparent dark:from-[#FFF100]/15',
        iconBg: 'bg-[#FFFBCC] dark:bg-[#332D00]',
        iconText: 'text-[#E6D900] dark:text-[#FFF100]',
        numText: 'text-[#FFF799] dark:text-[#4D4500]',
        line: 'bg-[#FFF100]',
        arrow: 'text-[#E6D900] dark:text-[#FFF100]',
    },
} as const;

const CURRICULUM_COLORS = ['emerald', 'teal', 'orange'] as const;

interface CurriculaSectionProps {
    curricula: CurriculumCardResource[];
    siteConfig: SiteConfig | null;
}

const CurriculaSection = ({ curricula, siteConfig }: CurriculaSectionProps) => {
    if (curricula.length === 0 || siteConfig?.sections?.curricula?.enabled === false) {
        return null;
    }

    return (
        <section id="program" className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    icon={<BookOpenIcon className="h-3.5 w-3.5 text-[#006BFF] dark:text-[#3B8BFF]" />}
                    label="Program"
                    accentWord="Unggulan"
                    heading={siteConfig?.sections?.curricula?.heading ?? 'Kurikulum yang Komprehensif'}
                    description={siteConfig?.sections?.curricula?.description}
                />

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {curricula.map((curriculum, index) => {
                        const color = CURRICULUM_COLORS[index % CURRICULUM_COLORS.length];
                        const p = CURRICULUM_PALETTE[color];
                        const num = String(index + 1).padStart(2, '0');
                        const IconComponent = (Icons[
                            curriculum.icon as keyof typeof Icons
                        ] ?? Icons.BookOpen) as React.ComponentType<{ className?: string }>;

                        return (
                            <Link
                                key={curriculum.id}
                                href={curriculumShow.url({ curriculum: curriculum.slug })}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                            >
                                <div className={`h-1 w-0 ${p.line} transition-all duration-500 ease-out group-hover:w-full`} />
                                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} pointer-events-none`} />
                                <span className={`pointer-events-none absolute top-3 right-4 text-7xl leading-none font-black select-none ${p.numText} transition duration-300 group-hover:opacity-60`}>
                                    {num}
                                </span>

                                <div className="relative flex flex-1 flex-col p-6">
                                    <div className={`mt-5 inline-flex rounded-xl p-3 ${p.iconBg} w-fit shadow-sm`}>
                                        <IconComponent className={`h-6 w-6 ${p.iconText}`} />
                                    </div>

                                    <h3 className="mt-4 text-lg leading-snug font-bold text-gray-900 dark:text-white">
                                        {curriculum.name}
                                    </h3>

                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                        {curriculum.description.length > 120
                                            ? curriculum.description.slice(0, 120) + '…'
                                            : curriculum.description}
                                    </p>

                                    <div className="mt-6 flex items-center gap-1.5 border-t border-gray-100 pt-4 dark:border-gray-800">
                                        <span className={`text-xs font-semibold ${p.arrow} transition-all duration-200 group-hover:underline`}>
                                            Selengkapnya
                                        </span>
                                        <svg
                                            className={`h-3.5 w-3.5 ${p.arrow} transition-transform duration-200 group-hover:translate-x-1`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2.5}
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href={curriculumIndex.url()}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-[#3B8BFF] to-[#006BFF] px-7 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,107,255,0.3)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,107,255,0.35)] hover:brightness-110"
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
