import { useRef, useState } from 'react';
import { Link, type InertiaFormProps } from '@inertiajs/react';
import { FormInput, FormTextarea, FormSelect, FormSubmit, FormLabel, type SelectOption } from '@/components/form';
import { Button } from '@/components/ui/button';
import InputError from '@/components/ui/input-error';

interface EnumOption {
    value: string;
    label: string;
}

interface SocialEntry {
    platform: string;
    url: string;
}

export interface TeacherFormData {
    _method?: string;
    name: string;
    nip: string;
    email: string;
    phone: string;
    address: string;
    subject: string;
    gender: string;
    date_of_birth: string;
    joined_at: string;
    status: string;
    avatar: File | null;
    socials: SocialEntry[];
}

interface Props {
    form: InertiaFormProps<TeacherFormData>;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel?: string;
    cancelUrl: string;
    statusOptions: EnumOption[];
    genderOptions: EnumOption[];
    socialPlatformOptions: EnumOption[];
    existingAvatarUrl?: string | null;
}

const TeacherForm = ({
    form,
    onSubmit,
    submitLabel = 'Simpan',
    cancelUrl,
    statusOptions,
    genderOptions,
    socialPlatformOptions,
    existingAvatarUrl,
}: Props) => {
    const { data, setData, errors, processing, recentlySuccessful } = form;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(existingAvatarUrl ?? null);

    const statusSelectOptions: SelectOption[] = statusOptions.map((s) => ({ value: s.value, label: s.label }));
    const genderSelectOptions: SelectOption[] = genderOptions.map((g) => ({ value: g.value, label: g.label }));
    const platformSelectOptions: SelectOption[] = socialPlatformOptions.map((p) => ({ value: p.value, label: p.label }));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('avatar', file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

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
        <form onSubmit={onSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                    label="Nama Lengkap"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Nama lengkap guru"
                    error={errors.name}
                    required
                />

                <FormInput
                    label="NIP"
                    value={data.nip}
                    onChange={(e) => setData('nip', e.target.value)}
                    placeholder="Nomor Induk Pegawai"
                    error={errors.nip}
                    required
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="alamat@email.com"
                    error={errors.email}
                    required
                />

                <FormInput
                    label="Nomor Telepon"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    error={errors.phone}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                    label="Mata Pelajaran"
                    value={data.subject}
                    onChange={(e) => setData('subject', e.target.value)}
                    placeholder="Contoh: Matematika"
                    error={errors.subject}
                />

                <FormSelect
                    label="Jenis Kelamin"
                    value={data.gender}
                    onValueChange={(value) => setData('gender', value)}
                    options={genderSelectOptions}
                    placeholder="Pilih jenis kelamin"
                    error={errors.gender}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                    label="Tanggal Lahir"
                    type="date"
                    value={data.date_of_birth}
                    onChange={(e) => setData('date_of_birth', e.target.value)}
                    error={errors.date_of_birth}
                />

                <FormInput
                    label="Tanggal Bergabung"
                    type="date"
                    value={data.joined_at}
                    onChange={(e) => setData('joined_at', e.target.value)}
                    error={errors.joined_at}
                />
            </div>

            <FormTextarea
                label="Alamat"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                placeholder="Alamat lengkap"
                rows={3}
                error={errors.address}
            />

            <div className="grid gap-2">
                <FormLabel htmlFor="avatar">Foto Profil</FormLabel>
                <input
                    ref={fileInputRef}
                    id="avatar"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
                />
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="mt-1 h-24 w-24 rounded-full object-cover ring-2 ring-muted"
                    />
                )}
                <InputError message={errors.avatar} />
            </div>

            <FormSelect
                label="Status"
                value={data.status}
                onValueChange={(value) => setData('status', value)}
                options={statusSelectOptions}
                placeholder="Pilih status"
                error={errors.status}
                required
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
                            <div key={index} className="flex gap-2 items-start">
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
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" asChild>
                    <Link href={cancelUrl}>Batal</Link>
                </Button>
                <FormSubmit processing={processing} successful={recentlySuccessful}>
                    {submitLabel}
                </FormSubmit>
            </div>
        </form>
    );
};

export { TeacherForm };
