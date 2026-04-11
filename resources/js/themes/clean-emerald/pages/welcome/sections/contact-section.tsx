import { store as contactMessageStore } from '@/actions/App/Http/Controllers/ContactMessageController';
import { useForm, usePage } from '@inertiajs/react';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { type SiteConfig } from '@/types';

const ContactSection = ({ siteConfig }: { siteConfig: SiteConfig | null }) => {
    const { flash } = usePage<{
        flash: { success: string | null; error: string | null };
    }>().props;

    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            name: '',
            email: '',
            subject: '',
            message: '',
        });

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(contactMessageStore.url(), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const contactItems = [
        {
            icon: MapPinIcon,
            label: 'Alamat',
            value: siteConfig?.identity?.address ?? '-',
        },
        {
            icon: PhoneIcon,
            label: 'Telepon',
            value: siteConfig?.identity?.phone ?? '-',
        },
        {
            icon: MailIcon,
            label: 'Email',
            value: siteConfig?.identity?.email ?? '-',
        },
        {
            icon: ClockIcon,
            label: 'Jam Operasional',
            value: siteConfig?.identity?.hours ?? '-',
        },
    ];

    return (
        <section
            id="kontak"
            className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                            <MailIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="relative inline-block">
                                <span className="relative z-10 text-emerald-600 dark:text-emerald-400">
                                    Kontak
                                </span>
                                <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/50" />
                            </span>
                        </span>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            {siteConfig?.sections?.contact?.heading ??
                                'Hubungi Kami'}
                        </h2>
                        {siteConfig?.sections?.contact?.description && (
                            <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                                {siteConfig.sections.contact.description}
                            </p>
                        )}

                        <div className="mt-8 space-y-6">
                            {contactItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-start gap-4"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                                        <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {item.label}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Kirim Pesan
                        </h3>
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
                            onSubmit={handleContactSubmit}
                        >
                            <FormField
                                label="Nama Lengkap"
                                type="text"
                                value={data.name}
                                onChange={(v) => setData('name', v)}
                                error={errors.name}
                                placeholder="Masukkan nama lengkap"
                            />
                            <FormField
                                label="Email"
                                type="email"
                                value={data.email}
                                onChange={(v) => setData('email', v)}
                                error={errors.email}
                                placeholder="contoh@email.com"
                            />
                            <FormField
                                label="Subjek"
                                type="text"
                                value={data.subject}
                                onChange={(v) => setData('subject', v)}
                                error={errors.subject}
                                placeholder="Subjek pesan"
                            />
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
        </section>
    );
};

const FormField = ({
    label,
    type,
    value,
    onChange,
    error,
    placeholder,
}: {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder: string;
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
            placeholder={placeholder}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
);

export default ContactSection;
