import { Head } from '@inertiajs/react';
import { type AdmissionPeriod } from '@/types';

interface Props {
    nextPeriod: AdmissionPeriod | null;
}

const AdmissionClosedPage = ({ nextPeriod }: Props) => {
    return (
        <>
            <Head title="Pendaftaran Belum Dibuka" />

            <div className="relative mx-auto mt-[calc(1.75rem+3.75rem)] max-w-2xl overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
                {/* Dekoratif shapes */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-900/20" />
                    <div className="absolute top-20 right-0 h-32 w-32 rounded-full bg-teal-100/40 blur-2xl dark:bg-teal-900/20" />
                    <div className="absolute bottom-10 left-1/3 h-24 w-24 rounded-full bg-emerald-50/60 blur-2xl dark:bg-emerald-900/10" />
                </div>

                <div className="relative text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                        SPMB
                    </span>

                    <div className="mt-6 flex justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/20">
                            <svg className="h-10 w-10 text-emerald-400 dark:text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Pendaftaran Belum Dibuka
                    </h1>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                        Penerimaan Murid Baru saat ini belum dibuka atau sudah ditutup.
                        Pantau terus informasi dari sekolah untuk jadwal pendaftaran berikutnya.
                    </p>

                    {nextPeriod && (
                        <div className="mt-6 inline-block rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-left dark:border-emerald-800 dark:bg-emerald-950/30">
                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                Periode Berikutnya
                            </p>
                            <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                                Tahun Ajaran {nextPeriod.academic_year}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {nextPeriod.start_date} s.d. {nextPeriod.end_date}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdmissionClosedPage;
