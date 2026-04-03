import { Head, useForm } from '@inertiajs/react';

interface RegistrationResult {
    registration_number: string;
    full_name: string;
    status: string;
    academic_year: string;
    created_at: string;
}

interface Props {
    result: RegistrationResult | null;
    not_found?: boolean;
    query?: string;
}

const STATUS_LABELS: Record<string, string> = {
    pending: 'Menunggu Verifikasi',
    verified: 'Terverifikasi',
    accepted: 'Diterima',
    rejected: 'Ditolak',
};

const STATUS_COLORS: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
    verified: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    rejected: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
};

const AdmissionCheckPage = ({ result, not_found, query }: Props) => {
    const { data, setData, post, processing } = useForm({
        registration_number: query ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admission/check');
    };

    return (
        <>
            <Head title="Cek Status Pendaftaran" />

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-lg px-4 py-16 sm:px-6 lg:px-8">
                <div className="relative">
                    <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-900/20" />

                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                            SPMB
                        </span>
                        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Cek Status Pendaftaran
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Masukkan nomor pendaftaran untuk melihat status terkini.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
                            <input
                                type="text"
                                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                                placeholder="contoh: SPMB-2026-0001"
                                value={data.registration_number}
                                onChange={e => setData('registration_number', e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors"
                            >
                                Cek
                            </button>
                        </form>

                        {not_found && (
                            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                                    Nomor pendaftaran tidak ditemukan.
                                </p>
                                <p className="mt-1 text-xs text-red-600 dark:text-red-500">
                                    Pastikan nomor yang dimasukkan benar dan coba lagi.
                                </p>
                            </div>
                        )}

                        {result && (
                            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Nomor Pendaftaran
                                        </p>
                                        <p className="mt-0.5 text-lg font-bold text-emerald-600 dark:text-emerald-400 tracking-wide">
                                            {result.registration_number}
                                        </p>
                                    </div>
                                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_COLORS[result.status] ?? ''}`}>
                                        {STATUS_LABELS[result.status] ?? result.status}
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Nama</p>
                                        <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">{result.full_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Tahun Ajaran</p>
                                        <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">{result.academic_year}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdmissionCheckPage;
