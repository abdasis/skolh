import { FormInput } from '@/components/form/form-input';
import { FormImagePicker } from '@/components/form/form-image-picker';
import type { SiteCta } from '@/types';

interface CtaSectionProps {
    data: Omit<SiteCta, 'image_url'>;
    ctaImageUrl: string | null;
    errors: Partial<Record<string, string>>;
    onChange: (cta: Omit<SiteCta, 'image_url'>) => void;
    onImageChange: (url: string | null) => void;
}

const CtaSection = ({
    data,
    ctaImageUrl,
    errors,
    onChange,
    onImageChange,
}: CtaSectionProps) => {
    const update = (field: keyof Omit<SiteCta, 'image_url'>, value: string) => {
        onChange({ ...data, [field]: value || null });
    };

    return (
        <div className="rounded-xl border bg-card p-6">
            <div className="mb-6">
                <h2 className="text-base font-semibold">Banner CTA</h2>
                <p className="text-sm text-muted-foreground">
                    Konten banner ajakan bertindak di bagian bawah halaman
                    beranda.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <FormImagePicker
                        label="Gambar CTA"
                        value={ctaImageUrl}
                        onChange={onImageChange}
                        folder="site"
                    />
                </div>

                <FormInput
                    label="Subjudul"
                    value={data.subtitle ?? ''}
                    onChange={(e) => update('subtitle', e.target.value)}
                    placeholder="cth: Sekolah Dasar Islam Terpadu"
                    error={errors['cta.subtitle']}
                />

                <FormInput
                    label="Judul"
                    value={data.title ?? ''}
                    onChange={(e) => update('title', e.target.value)}
                    placeholder="cth: Bergabung bersama kami"
                    error={errors['cta.title']}
                />

                <FormInput
                    label="Label Tombol"
                    value={data.button_label ?? ''}
                    onChange={(e) => update('button_label', e.target.value)}
                    placeholder="cth: Daftar Sekarang"
                    error={errors['cta.button_label']}
                />

                <FormInput
                    label="URL Tombol"
                    value={data.button_href ?? ''}
                    onChange={(e) => update('button_href', e.target.value)}
                    placeholder="cth: #kontak atau /admission"
                    error={errors['cta.button_href']}
                />
            </div>
        </div>
    );
};

export { CtaSection };
