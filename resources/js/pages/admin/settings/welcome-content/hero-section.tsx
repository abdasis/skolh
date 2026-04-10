import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/form-input';
import { FormTextarea } from '@/components/form/form-textarea';
import { FormImagePicker } from '@/components/form/form-image-picker';
import type { CtaButton, HeroStat } from '@/types';

interface HeroData {
    subtitle: string;
    title: string;
    title_accent: string;
    description: string;
    badge_text: string;
    cta_buttons: CtaButton[];
    stats: HeroStat[];
}

interface HeroSectionProps {
    data: HeroData;
    heroBgImageUrl: string | null;
    heroSideImageUrl: string | null;
    errors: Partial<Record<string, string>>;
    onChange: (hero: HeroData) => void;
    onBgImageChange: (url: string | null) => void;
    onSideImageChange: (url: string | null) => void;
}

const HeroSection = ({
    data,
    heroBgImageUrl,
    heroSideImageUrl,
    errors,
    onChange,
    onBgImageChange,
    onSideImageChange,
}: HeroSectionProps) => {
    const updateCtaButton = (index: number, field: string, value: string) => {
        const buttons = [...data.cta_buttons];
        buttons[index] = { ...buttons[index], [field]: value };
        onChange({ ...data, cta_buttons: buttons });
    };

    const addCtaButton = () => {
        if (data.cta_buttons.length < 3) {
            onChange({
                ...data,
                cta_buttons: [
                    ...data.cta_buttons,
                    { label: '', href: '', variant: 'primary' },
                ],
            });
        }
    };

    const removeCtaButton = (index: number) => {
        onChange({
            ...data,
            cta_buttons: data.cta_buttons.filter((_, i) => i !== index),
        });
    };

    const updateStat = (
        index: number,
        field: 'value' | 'label',
        value: string,
    ) => {
        const stats = [...data.stats];
        stats[index] = { ...stats[index], [field]: value };
        onChange({ ...data, stats });
    };

    const addStat = () => {
        if (data.stats.length < 6) {
            onChange({
                ...data,
                stats: [...data.stats, { value: '', label: '' }],
            });
        }
    };

    const removeStat = (index: number) => {
        onChange({ ...data, stats: data.stats.filter((_, i) => i !== index) });
    };

    return (
        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
            <div className="px-5 py-4">
                <p className="text-base font-semibold">Bagian Hero</p>
                <p className="text-sm text-muted-foreground">
                    Konten utama yang tampil paling atas halaman beranda.
                </p>
            </div>
            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                <div className="space-y-5 p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput
                            label="Subtitle"
                            value={data.subtitle}
                            onChange={(e) =>
                                onChange({ ...data, subtitle: e.target.value })
                            }
                            placeholder="Pendekatan Baru dalam"
                            error={errors['hero.subtitle']}
                        />
                        <FormInput
                            label="Badge Gambar Samping"
                            value={data.badge_text}
                            onChange={(e) =>
                                onChange({
                                    ...data,
                                    badge_text: e.target.value,
                                })
                            }
                            placeholder="Lingkungan Belajar Islami"
                            description="Teks kecil di bawah gambar samping hero."
                            error={errors['hero.badge_text']}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput
                            label="Judul"
                            value={data.title}
                            onChange={(e) =>
                                onChange({ ...data, title: e.target.value })
                            }
                            placeholder="Pendidikan Islam"
                            error={errors['hero.title']}
                        />
                        <FormInput
                            label="Judul Aksen"
                            value={data.title_accent}
                            onChange={(e) =>
                                onChange({
                                    ...data,
                                    title_accent: e.target.value,
                                })
                            }
                            placeholder="Terpadu"
                            description="Ditampilkan dengan warna berbeda setelah judul."
                            error={errors['hero.title_accent']}
                        />
                    </div>

                    <FormTextarea
                        label="Deskripsi"
                        value={data.description}
                        onChange={(e) =>
                            onChange({ ...data, description: e.target.value })
                        }
                        rows={3}
                        placeholder="Deskripsi singkat tentang sekolah..."
                        error={errors['hero.description']}
                    />

                    <div className="grid gap-6 sm:grid-cols-2">
                        <FormImagePicker
                            label="Gambar Background"
                            value={heroBgImageUrl}
                            onChange={onBgImageChange}
                            folder="site"
                            error={errors.hero_bg_image_url}
                            previewClassName="h-28 w-full"
                        />
                        <FormImagePicker
                            label="Gambar Samping"
                            value={heroSideImageUrl}
                            onChange={onSideImageChange}
                            folder="site"
                            error={errors.hero_side_image_url}
                            previewClassName="h-28 w-full"
                        />
                    </div>

                    {/* CTA Buttons */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">
                                    Tombol CTA
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Maks. 3 tombol. Tampil di bawah deskripsi
                                    hero.
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addCtaButton}
                                disabled={data.cta_buttons.length >= 3}
                            >
                                Tambah Tombol
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {data.cta_buttons.length === 0 && (
                                <p className="rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
                                    Belum ada tombol.
                                </p>
                            )}
                            {data.cta_buttons.map((btn, i) => (
                                <div
                                    key={i}
                                    className="flex items-end gap-2 rounded-lg border bg-muted/20 p-3"
                                >
                                    <FormInput
                                        label="Label"
                                        value={btn.label}
                                        onChange={(e) =>
                                            updateCtaButton(
                                                i,
                                                'label',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Daftar Sekarang"
                                        className="flex-1"
                                    />
                                    <FormInput
                                        label="URL / Anchor"
                                        value={btn.href}
                                        onChange={(e) =>
                                            updateCtaButton(
                                                i,
                                                'href',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="#kontak"
                                        className="flex-1"
                                    />
                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium">
                                            Gaya
                                        </p>
                                        <select
                                            value={btn.variant}
                                            onChange={(e) =>
                                                updateCtaButton(
                                                    i,
                                                    'variant',
                                                    e.target.value,
                                                )
                                            }
                                            className="h-9 rounded-md border bg-background px-2 py-1 text-sm"
                                        >
                                            <option value="primary">
                                                Primary
                                            </option>
                                            <option value="secondary">
                                                Secondary
                                            </option>
                                        </select>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeCtaButton(i)}
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Statistik</p>
                                <p className="text-xs text-muted-foreground">
                                    Maks. 6. Tampil di bawah tombol CTA.
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addStat}
                                disabled={data.stats.length >= 6}
                            >
                                Tambah Statistik
                            </Button>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {data.stats.length === 0 && (
                                <p className="col-span-2 rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
                                    Belum ada statistik.
                                </p>
                            )}
                            {data.stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="flex items-end gap-2 rounded-lg border bg-muted/20 p-2"
                                >
                                    <FormInput
                                        label="Nilai"
                                        value={stat.value}
                                        onChange={(e) =>
                                            updateStat(
                                                i,
                                                'value',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="500+"
                                        className="w-24"
                                    />
                                    <FormInput
                                        label="Label"
                                        value={stat.label}
                                        onChange={(e) =>
                                            updateStat(
                                                i,
                                                'label',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Siswa Aktif"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeStat(i)}
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { HeroSection };
