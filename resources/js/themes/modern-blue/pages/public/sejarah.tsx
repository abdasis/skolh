import { Head, Link } from '@inertiajs/react';
import PageHero from '@/themes/clean-emerald/components/page-hero';
import { type FacilityCardResource } from '@/types';
import {
    show as facilityShow,
} from '@/actions/App/Http/Controllers/FacilityController';
import * as Icons from 'lucide-react';

interface Props {
    history: string;
    facilities: FacilityCardResource[];
}

const SejarahPage = ({ history, facilities }: Props) => {
    return (
        <>
            <Head title="Sejarah Sekolah" />

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
                        title="Sejarah"
                        highlight="Sekolah"
                        description="Perjalanan panjang kami dalam membangun lembaga pendidikan yang berkualitas."
                    />

                    {!history ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <p className="text-sm text-muted-foreground">
                                Belum ada konten sejarah sekolah.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-12">
                            <div
                                className="prose prose-emerald dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: history,
                                }}
                            />
                        </div>
                    )}

                    {facilities.length > 0 && (
                        <section className="mt-20">
                            <div className="mb-8 border-t border-gray-200 pt-12 dark:border-gray-700">
                                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                    Fasilitas Sekolah
                                </span>
                                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                    Dilengkapi Fasilitas{' '}
                                    <span className="text-emerald-600 dark:text-emerald-400">
                                        Modern
                                    </span>
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                    Seiring pertumbuhan sekolah, fasilitas terus dikembangkan untuk mendukung proses belajar mengajar yang optimal.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {facilities.map((facility) => {
                                    const IconComponent = (Icons[facility.icon as keyof typeof Icons] ?? Icons.Building2) as React.ComponentType<{ className?: string }>;

                                    return (
                                        <Link
                                            key={facility.id}
                                            href={facilityShow({ facility: facility.slug }).url}
                                            className="facility-card group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-900/60"
                                        >
                                            {facility.featured_image_url ? (
                                                <div className="h-40 w-full overflow-hidden">
                                                    <img
                                                        src={facility.featured_image_url}
                                                        alt={facility.title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex h-40 w-full items-center justify-center bg-gray-50 dark:bg-gray-800/40">
                                                    <IconComponent className="h-9 w-9 text-gray-300 dark:text-gray-600" />
                                                </div>
                                            )}

                                            <div className="flex flex-1 flex-col p-4">
                                                <div className="mb-1.5 flex items-center gap-2.5">
                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        <IconComponent className="h-3.5 w-3.5" />
                                                    </div>
                                                    <p className="text-sm font-semibold leading-snug text-gray-800 transition-colors group-hover:text-emerald-600 dark:text-gray-100 dark:group-hover:text-emerald-400">
                                                        {facility.title}
                                                    </p>
                                                </div>
                                                <p className="line-clamp-2 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                                                    {facility.description}
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

export default SejarahPage;
