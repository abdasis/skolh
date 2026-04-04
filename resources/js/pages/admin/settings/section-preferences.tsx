import { Head, useForm, setLayoutProps } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import type { SiteSections } from '@/types';

interface Props {
    sections: SiteSections;
}

const SECTION_LABELS: Record<string, string> = {
    hero: 'Hero',
    about: 'Tentang',
    agenda: 'Agenda',
    facilities: 'Fasilitas',
    curricula: 'Kurikulum',
    articles: 'Berita',
    testimonials: 'Testimonial',
    alumni: 'Alumni',
    contact: 'Kontak',
};

const SECTIONS_WITH_LIMIT = ['agenda', 'facilities', 'articles', 'testimonials'];

const SectionPreferencesPage = ({ sections }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Preferensi Situs', href: '#' },
            { title: 'Preferensi Seksi', href: '#' },
        ],
    });

    const { data, setData, put, processing } = useForm({ sections });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/settings/section-preferences', { preserveScroll: true });
    };

    const updateSection = (key: string, field: 'enabled' | 'limit', value: boolean | number) => {
        setData('sections', {
            ...data.sections,
            [key]: { ...data.sections[key as keyof SiteSections], [field]: value },
        });
    };

    return (
        <>
            <Head title="Preferensi Seksi" />
            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Preferensi Seksi</h1>
                        <p className="text-sm text-muted-foreground">
                            Aktifkan atau nonaktifkan seksi pada halaman beranda dan atur batas jumlah item yang ditampilkan.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-5 py-4">
                            <p className="text-base font-semibold">Seksi Halaman Beranda</p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="p-5">
                                <div className="divide-y">
                                    {Object.entries(data.sections).map(([key, config]) => (
                                        <div key={key} className="flex items-center justify-between py-3">
                                            <div className="flex items-center gap-3">
                                                <Switch
                                                    checked={config.enabled}
                                                    onCheckedChange={(checked) => updateSection(key, 'enabled', checked)}
                                                />
                                                <Label className="font-medium">
                                                    {SECTION_LABELS[key] ?? key}
                                                </Label>
                                            </div>
                                            {SECTIONS_WITH_LIMIT.includes(key) && (
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-xs text-muted-foreground">Maks. item</Label>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        max={100}
                                                        value={config.limit ?? ''}
                                                        onChange={(e) => updateSection(key, 'limit', parseInt(e.target.value) || 0)}
                                                        className="w-20 text-center"
                                                        disabled={!config.enabled}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
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

export default SectionPreferencesPage;
