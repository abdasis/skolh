import { updateThemePreferences } from '@/actions/App/Http/Controllers/Admin/SiteSettingController';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { headerStyles } from '@/themes/clean-emerald/headers';
import { Head, useForm, setLayoutProps } from '@inertiajs/react';
import { Check } from 'lucide-react';

interface Props {
    emeraldHeaderStyle: string;
}

const PreviewStyleOne = () => (
    <div className="flex h-full flex-col">
        {/* Top bar */}
        <div className="flex items-center gap-2 bg-emerald-800 px-3 py-1.5">
            <div className="flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-white/50" />
                <div className="h-1 w-14 rounded bg-white/40" />
            </div>
            <div className="flex items-center gap-1.5 border-l border-white/20 pl-2">
                <div className="h-1 w-1 rounded-full bg-white/50" />
                <div className="h-1 w-10 rounded bg-white/40" />
            </div>
            <div className="ml-auto flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-white/30" />
                <div className="h-2 w-2 rounded-full bg-white/30" />
                <div className="h-2 w-2 rounded-full bg-white/30" />
            </div>
        </div>
        {/* Navbar */}
        <div className="flex flex-1 items-center gap-2 border-b border-gray-100 bg-white px-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-600">
                <div className="h-1.5 w-1.5 rounded-sm bg-white" />
            </div>
            <div className="flex flex-1 items-center gap-2">
                <div className="h-1 w-8 rounded bg-gray-200" />
                <div className="h-1 w-8 rounded bg-gray-200" />
                <div className="h-1 w-8 rounded bg-gray-200" />
                <div className="h-1 w-8 rounded bg-gray-200" />
            </div>
            <div className="h-4 w-14 rounded bg-orange-400" />
        </div>
        {/* Hero placeholder */}
        <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-50 to-white px-3">
            <div className="w-full space-y-1.5">
                <div className="h-2 w-20 rounded bg-emerald-200" />
                <div className="h-3 w-28 rounded bg-emerald-700" />
                <div className="h-1 w-24 rounded bg-gray-200" />
            </div>
        </div>
    </div>
);

const PreviewStyleTwo = () => (
    <div className="flex h-full flex-col">
        {/* Navbar only */}
        <div className="flex items-center gap-2 border-b border-gray-100 bg-white px-3 py-2 shadow-sm">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-600">
                <div className="h-1.5 w-1.5 rounded-sm bg-white" />
            </div>
            <div className="flex flex-1 items-center gap-2">
                <div className="h-1 w-8 rounded bg-gray-200" />
                <div className="h-1 w-8 rounded bg-gray-200" />
                <div className="h-1 w-8 rounded bg-gray-200" />
                <div className="h-1 w-8 rounded bg-gray-200" />
            </div>
            <div className="h-4 w-14 rounded bg-orange-400" />
        </div>
        {/* Hero placeholder */}
        <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 to-white px-3">
            <div className="w-full space-y-1.5">
                <div className="h-2 w-20 rounded bg-emerald-200" />
                <div className="h-3 w-28 rounded bg-emerald-700" />
                <div className="h-1 w-24 rounded bg-gray-200" />
            </div>
        </div>
    </div>
);

const PreviewStyleThree = () => (
    <div className="relative flex h-full flex-col overflow-hidden">
        {/* Hero background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 to-emerald-900" />
        {/* Transparent navbar overlay */}
        <div className="relative z-10 flex items-center gap-2 border-b border-white/10 bg-transparent px-3 py-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/20">
                <div className="h-1.5 w-1.5 rounded-sm bg-white" />
            </div>
            <div className="flex flex-1 items-center gap-2">
                <div className="h-1 w-8 rounded bg-white/50" />
                <div className="h-1 w-8 rounded bg-white/50" />
                <div className="h-1 w-8 rounded bg-white/50" />
                <div className="h-1 w-8 rounded bg-white/50" />
            </div>
            <div className="h-4 w-14 rounded bg-orange-400" />
        </div>
        {/* Hero content */}
        <div className="relative z-10 flex flex-1 items-center px-3">
            <div className="w-full space-y-1.5">
                <div className="h-2 w-20 rounded bg-white/40" />
                <div className="h-3 w-28 rounded bg-white/80" />
                <div className="h-1 w-24 rounded bg-white/30" />
            </div>
        </div>
    </div>
);

const PREVIEWS: Record<string, React.ComponentType> = {
    'style-one': PreviewStyleOne,
    'style-two': PreviewStyleTwo,
    'style-three': PreviewStyleThree,
};

const ThemePreferencesPage = ({ emeraldHeaderStyle }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Preferensi Situs', href: '#' },
            { title: 'Preferensi Tema', href: '#' },
        ],
    });

    const { data, setData, put, processing } = useForm({
        emerald_header_style: emeraldHeaderStyle,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(updateThemePreferences().url, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Preferensi Tema" />
            <div className="flex flex-col gap-4 p-2">
                <div className="px-2">
                    <h1 className="text-xl font-semibold">Preferensi Tema</h1>
                    <p className="text-sm text-muted-foreground">
                        Pilih style header yang akan digunakan di semua halaman publik.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-5 py-4">
                            <p className="text-base font-semibold">Style Header</p>
                            <p className="text-sm text-muted-foreground">
                                Perubahan langsung berlaku setelah disimpan.
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
                                {headerStyles.map((style) => {
                                    const isSelected = data.emerald_header_style === style.key;
                                    const PreviewComponent = PREVIEWS[style.key];

                                    return (
                                        <button
                                            key={style.key}
                                            type="button"
                                            onClick={() => setData('emerald_header_style', style.key)}
                                            className={`group relative flex flex-col overflow-hidden rounded-xl border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                                                isSelected
                                                    ? 'border-emerald-500 shadow-md shadow-emerald-500/10'
                                                    : 'border-border hover:border-emerald-300 hover:shadow-sm'
                                            }`}
                                        >
                                            {/* Badge aktif / terpilih */}
                                            {isSelected && (
                                                <span className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                                                    <Check className="h-2.5 w-2.5" />
                                                    Dipilih
                                                </span>
                                            )}

                                            {/* Preview mockup */}
                                            <div className="h-36 w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
                                                {PreviewComponent && <PreviewComponent />}
                                            </div>

                                            {/* Info */}
                                            <div className={`flex flex-col gap-1 p-3 ${isSelected ? 'bg-emerald-50 dark:bg-emerald-950/20' : 'bg-background'}`}>
                                                <p className="text-sm font-semibold leading-tight">{style.label}</p>
                                                {style.preview && (
                                                    <p className="text-xs text-muted-foreground">{style.preview}</p>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Preferensi'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ThemePreferencesPage;
