import { useState } from 'react';
import { Head, router, setLayoutProps } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { activate } from '@/actions/App/Http/Controllers/Admin/ThemeController';
import type { Theme } from '@/types';
import { CheckCircle2, ImageIcon, Search, XCircle } from 'lucide-react';

interface Props {
    themes: Theme[];
}

const ThemesIndex = ({ themes }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Manajemen Tema', href: '#' },
        ],
    });

    const [search, setSearch] = useState('');

    const filtered = themes.filter(
        (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.author.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase()),
    );

    const handleActivate = (slug: string) => {
        router.post(activate(slug).url, {}, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Manajemen Tema" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Tema</h1>
                        <p className="text-sm text-muted-foreground">
                            Pilih dan aktifkan tema untuk tampilan publik website.
                        </p>
                    </div>
                </div>

                <div className="px-2">
                    <div className="relative max-w-sm">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari tema..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                <div className="px-2">
                    {filtered.length === 0 ? (
                        <div className="overflow-hidden rounded-2xl bg-linear-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="flex flex-col items-center justify-center py-16">
                                    <p className="text-sm text-muted-foreground">
                                        {search ? 'Tidak ada tema yang sesuai pencarian.' : 'Tidak ada tema yang ditemukan.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                            {filtered.map((theme) => (
                                <div
                                    key={theme.slug}
                                    className={`overflow-hidden rounded-2xl bg-linear-to-b from-muted/60 to-muted/30 p-1 ring-1 ${theme.isActive ? 'ring-primary/50' : 'ring-foreground/8'}`}
                                >
                                    {/* Preview image di outer wrapper */}
                                    <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                                        {theme.preview ? (
                                            <img
                                                src={theme.preview}
                                                alt={`Preview ${theme.name}`}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                            </div>
                                        )}

                                        {theme.isActive && (
                                            <div className="absolute top-2 right-2">
                                                <Badge variant="default" className="bg-primary text-primary-foreground text-xs font-semibold">
                                                    Aktif
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info + action di inner wrapper */}
                                    <div className="mt-1 overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                        <div className="p-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-semibold leading-tight">{theme.name}</p>
                                                <Badge variant="outline" className="shrink-0 text-xs">
                                                    v{theme.version}
                                                </Badge>
                                            </div>
                                            <p className="mt-0.5 text-xs text-muted-foreground">{theme.author}</p>
                                            <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{theme.description}</p>

                                            {!theme.isValid && (
                                                <div className="mt-2 rounded-md border border-red-200 bg-red-50 p-2 dark:border-red-900 dark:bg-red-950/30">
                                                    <div className="flex items-center gap-1 text-xs font-medium text-red-700 dark:text-red-400">
                                                        <XCircle className="h-3.5 w-3.5 shrink-0" />
                                                        Tema tidak valid
                                                    </div>
                                                    <p className="mt-0.5 text-xs text-red-600 dark:text-red-500">
                                                        Hilang: {theme.missingPages.join(', ')}
                                                    </p>
                                                </div>
                                            )}

                                            {theme.isValid && !theme.isActive && (
                                                <div className="mt-2 flex items-center gap-1 text-xs text-green-600 dark:text-green-500">
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                    Siap digunakan
                                                </div>
                                            )}

                                            <div className="mt-3">
                                                {theme.isActive ? (
                                                    <Button variant="outline" className="w-full h-8 text-xs" disabled>
                                                        Sedang Aktif
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="w-full h-8 text-xs"
                                                        disabled={!theme.isValid}
                                                        onClick={() => handleActivate(theme.slug)}
                                                    >
                                                        Aktifkan Tema
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ThemesIndex;
