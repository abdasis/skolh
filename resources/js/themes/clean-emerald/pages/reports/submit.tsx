import { store as reportStore } from '@/actions/App/Http/Controllers/ReportController';
import type { ReportCategory } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

type Flash = {
    success?: string;
    reference_code?: string;
};

type Props = {
    flash: Flash;
};

const CATEGORY_OPTIONS: { value: ReportCategory; label: string }[] = [
    { value: 'facilities', label: 'Fasilitas' },
    { value: 'teaching_quality', label: 'Kualitas Pengajaran' },
    { value: 'administration', label: 'Administrasi' },
    { value: 'safety', label: 'Keamanan' },
    { value: 'other', label: 'Lainnya' },
];

const ReportSubmit = () => {
    const { flash } = usePage<Props>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        category: '' as ReportCategory | '',
        subject: '',
        message: '',
        reporter_name: '',
        reporter_contact: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(reportStore.url(), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Kirim Laporan" />

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="relative">
                    <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-emerald-100/60 blur-2xl dark:bg-emerald-900/30" />
                    <div className="absolute top-2 left-32 h-12 w-12 rounded-full bg-teal-100/50 blur-xl dark:bg-teal-900/20" />

                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                            </span>
                            Laporan
                        </span>

                        <div className="mt-3 flex items-start gap-4">
                            <div className="mt-1 flex shrink-0 flex-col items-center gap-1">
                                <div className="h-6 w-0.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                <div className="h-2 w-0.5 rounded-full bg-emerald-300 dark:bg-emerald-600" />
                                <div className="h-1 w-0.5 rounded-full bg-emerald-200 dark:bg-emerald-700" />
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Kirim{' '}
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-emerald-600 dark:text-emerald-400">
                                        Laporan
                                    </span>
                                    <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/50" />
                                </span>
                            </h1>
                        </div>

                        <p className="mt-4 ml-8 text-sm text-gray-500 dark:text-gray-400">
                            Sampaikan laporan, keluhan, atau saran Anda kepada pihak sekolah. Identitas Anda bersifat opsional.
                        </p>
                    </div>

                    {flash?.success && (
                        <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950/50">
                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                {flash.success}
                            </p>
                            {flash?.reference_code && (
                                <div className="mt-3">
                                    <p className="text-xs text-emerald-600 dark:text-emerald-500">Kode referensi laporan Anda:</p>
                                    <p className="mt-1 text-2xl font-bold tracking-widest text-emerald-700 dark:text-emerald-300">
                                        {flash.reference_code}
                                    </p>
                                    <p className="mt-2 text-xs text-emerald-600/80 dark:text-emerald-500/80">
                                        Simpan kode ini untuk memantau status laporan Anda.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Formulir Laporan
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Isi formulir di bawah ini. Laporan akan ditinjau oleh pihak sekolah.
                        </p>

                        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value as ReportCategory)}
                                    className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                >
                                    <option value="">Pilih kategori</option>
                                    {CATEGORY_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Subjek <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                    placeholder="Ringkasan singkat laporan Anda"
                                />
                                {errors.subject && (
                                    <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Pesan / Uraian <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={5}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                    placeholder="Jelaskan laporan Anda secara rinci..."
                                />
                                {errors.message && (
                                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                                )}
                            </div>

                            <div className="border-t border-gray-100 pt-5 dark:border-gray-800">
                                <p className="mb-4 text-xs text-gray-400 dark:text-gray-500">
                                    Informasi berikut bersifat opsional. Anda dapat mengirim laporan secara anonim.
                                </p>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Nama (opsional)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.reporter_name}
                                            onChange={(e) => setData('reporter_name', e.target.value)}
                                            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                            placeholder="Nama Anda"
                                        />
                                        {errors.reporter_name && (
                                            <p className="mt-1 text-xs text-red-500">{errors.reporter_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Kontak (opsional)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.reporter_contact}
                                            onChange={(e) => setData('reporter_contact', e.target.value)}
                                            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                            placeholder="Email atau nomor telepon"
                                        />
                                        {errors.reporter_contact && (
                                            <p className="mt-1 text-xs text-red-500">{errors.reporter_contact}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                            >
                                {processing ? 'Mengirim...' : 'Kirim Laporan'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportSubmit;
