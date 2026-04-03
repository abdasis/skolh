import { Head } from '@inertiajs/react';
import { OrgChart } from '@/components/org-chart';
import { type OrganizationNodeResource } from '@/types';

interface Props {
    nodes: OrganizationNodeResource[];
}

const PublicOrganizationPage = ({ nodes }: Props) => {
    return (
        <>
            <Head title="Struktur Organisasi" />

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="relative">
                    <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-emerald-100/60 blur-2xl dark:bg-emerald-900/30" />
                    <div className="absolute top-2 left-32 h-12 w-12 rounded-full bg-teal-100/50 blur-xl dark:bg-teal-900/20" />

                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                            </span>
                            Organisasi
                        </span>

                        <div className="mt-3 flex items-start gap-4">
                            <div className="mt-1 flex shrink-0 flex-col items-center gap-1">
                                <div className="h-6 w-0.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                <div className="h-2 w-0.5 rounded-full bg-emerald-300 dark:bg-emerald-600" />
                                <div className="h-1 w-0.5 rounded-full bg-emerald-200 dark:bg-emerald-700" />
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Struktur{' '}
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-emerald-600 dark:text-emerald-400">
                                        Organisasi
                                    </span>
                                    <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/50" />
                                </span>
                            </h1>
                        </div>

                        <div className="mt-3 flex items-start gap-3">
                            <div className="mt-1 h-4 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                            <p className="text-base text-gray-500 dark:text-gray-400">
                                Bagan struktur organisasi sekolah.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <OrgChart nodes={nodes} />
                </div>
            </div>
        </>
    );
};

export default PublicOrganizationPage;
