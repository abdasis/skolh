import { Head, Link } from '@inertiajs/react';

interface RegistrationSummary {
    id: number;
    registration_number: string;
    full_name: string;
    status: string;
    academic_year: string;
    created_at: string;
}

interface Props {
    registration: RegistrationSummary;
}

const AdmissionSuccessPage = ({ registration }: Props) => {
    return (
        <>
            <Head title="Pendaftaran Berhasil" />

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="relative text-center">
                    {/* Dekoratif */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-emerald-100/60 blur-3xl dark:bg-emerald-900/30 pointer-events-none" />

                    <div className="relative rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm dark:border-emerald-800 dark:bg-gray-900">
                        <div className="mb-6 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                                <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Pendaftaran Berhasil!
                        </h1>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Terima kasih, {registration.full_name}. Formulir pendaftaran kamu telah kami terima.
                        </p>

                        <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Nomor Pendaftaran
                            </p>
                            <p className="mt-1 text-2xl font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                                {registration.registration_number}
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Tahun Ajaran {registration.academic_year}
                            </p>
                        </div>

                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                            Simpan nomor pendaftaran ini untuk mengecek status pendaftaranmu.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <a
                                href={`/admission/success/${registration.registration_number}/pdf`}
                                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                            >
                                Unduh Bukti PDF
                            </a>
                            <Link
                                href="/admission/check"
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                Cek Status Pendaftaran
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdmissionSuccessPage;
