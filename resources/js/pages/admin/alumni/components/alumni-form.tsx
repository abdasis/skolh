import { Link, type InertiaFormProps } from '@inertiajs/react';
import { FormInput, FormTextarea, FormSelect, FormSubmit, FormLabel, FormImagePicker, type SelectOption } from '@/components/form';
import { Button } from '@/components/ui/button';
import InputError from '@/components/ui/input-error';

interface SocialEntry {
    platform: string;
    url: string;
}

interface EnumOption {
    value: string;
    label: string;
}

export interface AlumniFormData {
    name: string;
    batch: string;
    destination: string;
    quote: string;
    avatar_url: string | null;
    sort_order: number;
    socials: SocialEntry[];
}

interface Props {
    form: InertiaFormProps<AlumniFormData>;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel?: string;
    cancelUrl: string;
    socialPlatformOptions: EnumOption[];
}

const AlumniForm = ({
    form,
    onSubmit,
    submitLabel = 'Simpan',
    cancelUrl,
    socialPlatformOptions,
}: Props) => {
    const { data, setData, errors, processing } = form;

    const platformSelectOptions: SelectOption[] = socialPlatformOptions.map((p) => ({ value: p.value, label: p.label }));

    const addSocial = () => {
        setData('socials', [...data.socials, { platform: '', url: '' }]);
    };

    const removeSocial = (index: number) => {
        setData('socials', data.socials.filter((_, i) => i !== index));
    };

    const updateSocial = (index: number, field: keyof SocialEntry, value: string) => {
        const updated = data.socials.map((s, i) => (i === index ? { ...s, [field]: value } : s));
        setData('socials', updated);
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                    label="Nama Lengkap"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Nama lengkap alumni"
                    error={errors.name}
                    required
                />

                <FormInput
                    label="Angkatan"
                    value={data.batch}
                    onChange={(e) => setData('batch', e.target.value)}
                    placeholder="Contoh: Angkatan ke-5 SDIT Al-Aziz"
                    error={errors.batch}
                    required
                />
            </div>

            <FormInput
                label="Melanjutkan ke"
                value={data.destination}
                onChange={(e) => setData('destination', e.target.value)}
                placeholder="Contoh: Teknik Informatika, Universitas Indonesia"
                error={errors.destination}
                required
            />

            <FormTextarea
                label="Kutipan / Kesan"
                value={data.quote}
                onChange={(e) => setData('quote', e.target.value)}
                placeholder="Tuliskan kesan atau kutipan dari alumni..."
                error={errors.quote}
                required
                rows={4}
            />

            <FormInput
                label="Urutan Tampil"
                type="number"
                value={String(data.sort_order)}
                onChange={(e) => setData('sort_order', Number(e.target.value))}
                placeholder="0"
                error={errors.sort_order}
            />

            <FormImagePicker
                label="Foto Alumni (opsional)"
                value={data.avatar_url}
                onChange={(url) => setData('avatar_url', url)}
                folder="alumni/avatars"
                error={errors.avatar_url}
            />

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <FormLabel>Media Sosial</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={addSocial}>
                        + Tambah Sosmed
                    </Button>
                </div>

                {data.socials.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {data.socials.map((social, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="w-40 shrink-0">
                                    <FormSelect
                                        value={social.platform}
                                        onValueChange={(value) => updateSocial(index, 'platform', value)}
                                        options={platformSelectOptions}
                                        placeholder="Platform"
                                        error={(errors as Record<string, string>)[`socials.${index}.platform`]}
                                    />
                                </div>
                                <div className="flex-1">
                                    <FormInput
                                        value={social.url}
                                        onChange={(e) => updateSocial(index, 'url', e.target.value)}
                                        placeholder="https://..."
                                        error={(errors as Record<string, string>)[`socials.${index}.url`]}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSocial(index)}
                                    className="mt-0.5 text-muted-foreground hover:text-destructive"
                                >
                                    Hapus
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                <InputError message={(errors as Record<string, string>)['socials']} />
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" asChild>
                    <Link href={cancelUrl}>Batal</Link>
                </Button>
                <FormSubmit processing={processing}>{submitLabel}</FormSubmit>
            </div>
        </form>
    );
};

export default AlumniForm;
