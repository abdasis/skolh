import { Link, type InertiaFormProps } from '@inertiajs/react';
import { FormInput, FormTextarea, FormSubmit, FormImagePicker } from '@/components/form';
import { Button } from '@/components/ui/button';

export interface TestimonialFormData {
    name: string;
    role: string;
    quote: string;
    highlight: string;
    sort_order: number;
    avatar_url: string | null;
}

interface Props {
    form: InertiaFormProps<TestimonialFormData>;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel?: string;
    cancelUrl: string;
}

const TestimonialForm = ({
    form,
    onSubmit,
    submitLabel = 'Simpan',
    cancelUrl,
}: Props) => {
    const { data, setData, errors, processing } = form;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                    label="Nama"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Nama lengkap pemberi testimoni"
                    error={errors.name}
                    required
                />

                <FormInput
                    label="Peran / Jabatan"
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                    placeholder="Contoh: Orang Tua Siswa Kelas 4"
                    error={errors.role}
                    required
                />
            </div>

            <FormTextarea
                label="Isi Testimoni"
                value={data.quote}
                onChange={(e) => setData('quote', e.target.value)}
                placeholder="Tuliskan testimoni lengkap..."
                error={errors.quote}
                required
                rows={4}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                    label="Highlight"
                    value={data.highlight}
                    onChange={(e) => setData('highlight', e.target.value)}
                    placeholder="Contoh: Akhlak & Hafalan Quran"
                    error={errors.highlight}
                    required
                />

                <FormInput
                    label="Urutan Tampil"
                    type="number"
                    value={String(data.sort_order)}
                    onChange={(e) => setData('sort_order', Number(e.target.value))}
                    placeholder="0"
                    error={errors.sort_order}
                />
            </div>

            <FormImagePicker
                label="Foto Profil (opsional)"
                value={data.avatar_url}
                onChange={(url) => setData('avatar_url', url)}
                folder="testimonials/avatars"
                error={errors.avatar_url}
            />

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" asChild>
                    <Link href={cancelUrl}>Batal</Link>
                </Button>
                <FormSubmit processing={processing}>{submitLabel}</FormSubmit>
            </div>
        </form>
    );
};

export default TestimonialForm;
