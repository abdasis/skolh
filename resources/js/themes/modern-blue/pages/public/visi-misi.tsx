import { Head, Link } from '@inertiajs/react';
import PageHero from '@/themes/clean-emerald/components/page-hero';
import { type CurriculumCardResource } from '@/types';
import {
    show as curriculumShow,
} from '@/actions/App/Http/Controllers/CurriculumController';
import * as Icons from 'lucide-react';

interface Props {
    vision: string;
    mission: string;
    curricula: CurriculumCardResource[];
}

const VisiMisiPage = ({ vision, mission, curricula }: Props) => {
    const isEmpty = !vision && !mission;

    return (
        <>
            <Head title="Visi & Misi" />

            <div className="relative min-h-screen overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-900/20" />
                    <div className="absolute top-16 right-0 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl dark:bg-teal-900/15" />
                    <div className="absolute top-1/2 left-1/3 h-56 w-56 rounded-full bg-emerald-50/60 blur-2xl dark:bg-emerald-950/20" />
                    <div className="absolute right-1/3 bottom-24 h-64 w-64 rounded-full bg-teal-100/30 blur-3xl dark:bg-teal-900/10" />
                    <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-900/15" />
                </div>

                <div className="relative mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <PageHero
                        badge="Tentang Kami"
                        title="Visi &"
                        highlight="Misi"
                        description="Landasan nilai dan arah perjalanan kami dalam mendidik generasi masa depan."
                    />

                    {isEmpty ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <p className="text-sm text-muted-foreground">
                                Belum ada konten visi dan misi.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-12 space-y-6">
                            {vision && (
                                <section className="rounded-2xl border border-gray-100 bg-white px-8 py-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] dark:border-white/[0.06] dark:bg-white/[0.03]">
                                    <h2 className="mb-4 text-xs font-semibold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                                        Visi
                                    </h2>
                                    <blockquote className="border-l-[3px] border-emerald-400/60 pl-5 dark:border-emerald-600/50">
                                        <p className="text-xl leading-relaxed font-medium text-gray-800 italic dark:text-gray-100">
                                            {vision}
                                        </p>
                                    </blockquote>
                                </section>
                            )}

                            {mission && (
                                <section className="rounded-2xl border border-gray-100 bg-white px-8 py-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] dark:border-white/[0.06] dark:bg-white/[0.03]">
                                    <h2 className="mb-4 text-xs font-semibold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                                        Misi
                                    </h2>
                                    <div
                                        className="prose prose-emerald dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: mission,
                                        }}
                                    />
                                </section>
                            )}
                        </div>
                    )}

                    {curricula.length > 0 && (
                        <section className="mt-16">
                            <div className="mb-8 border-t border-gray-100 pt-12 dark:border-white/[0.06]">
                                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                    Kurikulum
                                </span>
                                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                    Kurikulum yang{' '}
                                    <span className="text-emerald-600 dark:text-emerald-400">
                                        Kami Terapkan
                                    </span>
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                    Visi dan misi kami diwujudkan melalui kurikulum terpadu yang dirancang untuk membentuk generasi unggul dan berakhlak mulia.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {curricula.map((curriculum) => {
                                    const IconComponent = (Icons[curriculum.icon as keyof typeof Icons] ?? Icons.BookOpen) as React.ComponentType<{ className?: string }>;

                                    return (
                                        <Link
                                            key={curriculum.id}
                                            href={curriculumShow({ curriculum: curriculum.slug }).url}
                                            className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-[0_1px_8px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-px hover:border-emerald-200/80 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:border-emerald-800/60"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:group-hover:bg-emerald-900/50">
                                                <IconComponent className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold leading-snug text-gray-800 transition-colors group-hover:text-emerald-600 dark:text-gray-100 dark:group-hover:text-emerald-400">
                                                    {curriculum.name}
                                                </p>
                                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                                                    {curriculum.description}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
};

export default VisiMisiPage;
