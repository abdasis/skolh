import { Head, useForm, setLayoutProps } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import type { SiteHero, SiteAbout } from '@/types';

interface Props {
    hero: SiteHero;
    about: SiteAbout;
    heroBgImageUrl: string | null;
    heroSideImageUrl: string | null;
}

const WelcomeContentPage = ({ hero, about, heroBgImageUrl, heroSideImageUrl }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Preferensi Situs', href: '#' },
            { title: 'Konten Beranda', href: '#' },
        ],
    });

    const { data, setData, post, processing, errors } = useForm<{
        hero: {
            subtitle: string;
            title: string;
            title_accent: string;
            description: string;
            badge_text: string;
            cta_buttons: { label: string; href: string; variant: string }[];
            stats: { value: string; label: string }[];
        };
        about: {
            heading: string;
            paragraphs: string[];
            feature_cards: { icon: string; title: string; description: string; stat_value: string; stat_label: string }[];
        };
        hero_bg_image: File | null;
        hero_side_image: File | null;
        _method: string;
    }>({
        hero: {
            subtitle: hero.subtitle ?? '',
            title: hero.title ?? '',
            title_accent: hero.title_accent ?? '',
            description: hero.description ?? '',
            badge_text: hero.badge_text ?? '',
            cta_buttons: hero.cta_buttons ?? [],
            stats: hero.stats ?? [],
        },
        about: {
            heading: about.heading ?? '',
            paragraphs: about.paragraphs ?? [],
            feature_cards: about.feature_cards ?? [],
        },
        hero_bg_image: null,
        hero_side_image: null,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings/welcome-content', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const updateStat = (index: number, field: 'value' | 'label', value: string) => {
        const stats = [...data.hero.stats];
        stats[index] = { ...stats[index], [field]: value };
        setData('hero', { ...data.hero, stats });
    };

    const addStat = () => {
        if (data.hero.stats.length < 6) {
            setData('hero', { ...data.hero, stats: [...data.hero.stats, { value: '', label: '' }] });
        }
    };

    const removeStat = (index: number) => {
        const stats = data.hero.stats.filter((_, i) => i !== index);
        setData('hero', { ...data.hero, stats });
    };

    const updateCtaButton = (index: number, field: string, value: string) => {
        const buttons = [...data.hero.cta_buttons];
        buttons[index] = { ...buttons[index], [field]: value };
        setData('hero', { ...data.hero, cta_buttons: buttons });
    };

    const addCtaButton = () => {
        if (data.hero.cta_buttons.length < 3) {
            setData('hero', { ...data.hero, cta_buttons: [...data.hero.cta_buttons, { label: '', href: '', variant: 'primary' }] });
        }
    };

    const removeCtaButton = (index: number) => {
        const buttons = data.hero.cta_buttons.filter((_, i) => i !== index);
        setData('hero', { ...data.hero, cta_buttons: buttons });
    };

    const updateParagraph = (index: number, value: string) => {
        const paragraphs = [...data.about.paragraphs];
        paragraphs[index] = value;
        setData('about', { ...data.about, paragraphs });
    };

    return (
        <>
            <Head title="Konten Beranda" />
            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Konten Beranda</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola konten seksi hero dan tentang pada halaman beranda.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-5 py-4">
                            <p className="text-base font-semibold">Seksi Hero</p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="space-y-4 p-5">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Subtitle</Label>
                                        <Input
                                            value={data.hero.subtitle}
                                            onChange={(e) => setData('hero', { ...data.hero, subtitle: e.target.value })}
                                            placeholder="Pendekatan Baru dalam"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Badge Text</Label>
                                        <Input
                                            value={data.hero.badge_text}
                                            onChange={(e) => setData('hero', { ...data.hero, badge_text: e.target.value })}
                                            placeholder="Lingkungan Belajar Islami"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Judul</Label>
                                        <Input
                                            value={data.hero.title}
                                            onChange={(e) => setData('hero', { ...data.hero, title: e.target.value })}
                                            placeholder="Pendidikan Islam"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Judul Aksen (warna berbeda)</Label>
                                        <Input
                                            value={data.hero.title_accent}
                                            onChange={(e) => setData('hero', { ...data.hero, title_accent: e.target.value })}
                                            placeholder="Terpadu"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Deskripsi</Label>
                                    <Textarea
                                        value={data.hero.description}
                                        onChange={(e) => setData('hero', { ...data.hero, description: e.target.value })}
                                        rows={3}
                                        placeholder="Deskripsi singkat..."
                                    />
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Gambar Background</Label>
                                        {heroBgImageUrl && (
                                            <img src={heroBgImageUrl} alt="Background saat ini" className="h-24 w-full rounded border object-cover" />
                                        )}
                                        <Input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={(e) => setData('hero_bg_image', e.target.files?.[0] ?? null)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Gambar Samping</Label>
                                        {heroSideImageUrl && (
                                            <img src={heroSideImageUrl} alt="Gambar samping saat ini" className="h-24 w-full rounded border object-cover" />
                                        )}
                                        <Input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={(e) => setData('hero_side_image', e.target.files?.[0] ?? null)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Label>Tombol CTA (maks. 3)</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addCtaButton} disabled={data.hero.cta_buttons.length >= 3}>
                                            Tambah
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        {data.hero.cta_buttons.map((btn, i) => (
                                            <div key={i} className="flex items-center gap-2 rounded border p-3">
                                                <Input
                                                    value={btn.label}
                                                    onChange={(e) => updateCtaButton(i, 'label', e.target.value)}
                                                    placeholder="Label"
                                                    className="flex-1"
                                                />
                                                <Input
                                                    value={btn.href}
                                                    onChange={(e) => updateCtaButton(i, 'href', e.target.value)}
                                                    placeholder="URL / #anchor"
                                                    className="flex-1"
                                                />
                                                <select
                                                    value={btn.variant}
                                                    onChange={(e) => updateCtaButton(i, 'variant', e.target.value)}
                                                    className="rounded border px-2 py-1.5 text-sm"
                                                >
                                                    <option value="primary">Primary</option>
                                                    <option value="secondary">Secondary</option>
                                                </select>
                                                <Button type="button" variant="ghost" size="sm" onClick={() => removeCtaButton(i)}>
                                                    Hapus
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Label>Statistik (maks. 6)</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addStat} disabled={data.hero.stats.length >= 6}>
                                            Tambah
                                        </Button>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {data.hero.stats.map((stat, i) => (
                                            <div key={i} className="flex items-center gap-2 rounded border p-2">
                                                <Input
                                                    value={stat.value}
                                                    onChange={(e) => updateStat(i, 'value', e.target.value)}
                                                    placeholder="500+"
                                                    className="w-24"
                                                />
                                                <Input
                                                    value={stat.label}
                                                    onChange={(e) => updateStat(i, 'label', e.target.value)}
                                                    placeholder="Siswa Aktif"
                                                    className="flex-1"
                                                />
                                                <Button type="button" variant="ghost" size="sm" onClick={() => removeStat(i)}>
                                                    Hapus
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-5 py-4">
                            <p className="text-base font-semibold">Seksi Tentang</p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="space-y-4 p-5">
                                <div className="space-y-2">
                                    <Label>Judul Seksi</Label>
                                    <Input
                                        value={data.about.heading}
                                        onChange={(e) => setData('about', { ...data.about, heading: e.target.value })}
                                        placeholder="Pendidikan Berkualitas dengan Nilai-Nilai Islam"
                                    />
                                    {errors['about.heading'] && <p className="text-sm text-destructive">{errors['about.heading']}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Paragraf</Label>
                                    <div className="space-y-2">
                                        {data.about.paragraphs.map((paragraph, i) => (
                                            <Textarea
                                                key={i}
                                                value={paragraph}
                                                onChange={(e) => updateParagraph(i, e.target.value)}
                                                rows={3}
                                                placeholder={`Paragraf ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default WelcomeContentPage;
