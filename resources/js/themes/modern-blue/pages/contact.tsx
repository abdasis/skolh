import { store as contactMessageStore } from '@/actions/App/Http/Controllers/ContactMessageController';
import type { ContactPageProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

const Contact = () => {
    const { siteConfig, flash } = usePage<ContactPageProps>().props;
    const identity = siteConfig?.identity;

    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            name: '',
            email: '',
            subject: '',
            message: '',
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(contactMessageStore.url(), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Kontak" />

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
                            Kontak
                        </span>

                        <div className="mt-3 flex items-start gap-4">
                            <div className="mt-1 flex shrink-0 flex-col items-center gap-1">
                                <div className="h-6 w-0.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                <div className="h-2 w-0.5 rounded-full bg-emerald-300 dark:bg-emerald-600" />
                                <div className="h-1 w-0.5 rounded-full bg-emerald-200 dark:bg-emerald-700" />
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Hubungi{' '}
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-emerald-600 dark:text-emerald-400">
                                        Kami
                                    </span>
                                    <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/50" />
                                </span>
                            </h1>
                        </div>

                        <div className="mt-3 flex items-start gap-3">
                            <div className="mt-1 h-4 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                            <p className="text-base text-gray-500 dark:text-gray-400">
                                Silakan hubungi kami untuk informasi lebih
                                lanjut tentang pendaftaran dan program sekolah.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Contact info */}
                        <div>
                            <div className="space-y-6">
                                {identity?.address && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                                            <svg
                                                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Alamat
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                {identity.address}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {identity?.phone && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                                            <svg
                                                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Telepon
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                {identity.phone}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {identity?.email && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                                            <svg
                                                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Email
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                {identity.email}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {identity?.hours && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                                            <svg
                                                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Jam Operasional
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                {identity.hours}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {identity?.map_url && (
                                <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                                    <iframe
                                        src={identity.map_url}
                                        className="h-64 w-full"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Lokasi Sekolah"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Contact form */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Kirim Pesan
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Isi formulir di bawah ini dan kami akan segera
                                menghubungi Anda.
                            </p>

                            {(wasSuccessful || flash?.success) && (
                                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                    {flash?.success ??
                                        'Pesan Anda berhasil dikirim!'}
                                </div>
                            )}

                            <form
                                className="mt-6 space-y-4"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                        placeholder="contoh@email.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Subjek
                                    </label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) =>
                                            setData('subject', e.target.value)
                                        }
                                        className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                        placeholder="Subjek pesan"
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Pesan
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={data.message}
                                        onChange={(e) =>
                                            setData('message', e.target.value)
                                        }
                                        className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                        placeholder="Tulis pesan Anda..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Pesan'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
