import { useRef, useState } from 'react';
import { Link, type InertiaFormProps } from '@inertiajs/react';
import { FormInput, FormLabel, FormSelect, FormSubmit, type SelectOption } from '@/components/form';
import { Button } from '@/components/ui/button';
import InputError from '@/components/ui/input-error';
import { type TeacherSelectOption } from '@/types';

export interface OrganizationNodeFormData {
    _method?: string;
    position: string;
    parent_id: string;
    teacher_id: string;
    name: string;
    nip: string;
    sort_order: number;
    branch_side: string;
    connector_from: string;
    avatar: File | null;
}

const NONE = '__none__';

interface ParentOption {
    id: number;
    position: string;
    parent_id: number | null;
}

interface Props {
    form: InertiaFormProps<OrganizationNodeFormData>;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel?: string;
    cancelUrl: string;
    teachers: TeacherSelectOption[];
    parentOptions: ParentOption[];
    currentNodeId?: number;
    existingAvatarUrl?: string | null;
}

const OrganizationNodeForm = ({
    form,
    onSubmit,
    submitLabel = 'Simpan',
    cancelUrl,
    teachers,
    parentOptions,
    currentNodeId,
    existingAvatarUrl,
}: Props) => {
    const { data, setData, errors, processing, recentlySuccessful } = form;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(existingAvatarUrl ?? null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('avatar', file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const teacherSelectOptions: SelectOption[] = [
        { value: NONE, label: '— Entri Manual —' },
        ...teachers.map((t) => ({ value: String(t.value), label: t.label })),
    ];

    const parentSelectOptions: SelectOption[] = [
        { value: NONE, label: '— Tidak ada (root) —' },
        ...parentOptions
            .filter((p) => p.id !== currentNodeId)
            .map((p) => ({ value: String(p.id), label: p.position })),
    ];

    const handleTeacherChange = (value: string) => {
        setData('teacher_id', value === NONE ? '' : value);
    };

    const handleParentChange = (value: string) => {
        setData('parent_id', value === NONE ? '' : value);
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                    label="Jabatan"
                    value={data.position}
                    onChange={(e) => setData('position', e.target.value)}
                    placeholder="Contoh: Kepala Sekolah"
                    error={errors.position}
                    required
                />

                <FormInput
                    label="Urutan"
                    type="number"
                    value={String(data.sort_order)}
                    onChange={(e) => setData('sort_order', parseInt(e.target.value, 10) || 0)}
                    placeholder="0"
                    error={errors.sort_order}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormSelect
                    label="Posisi Garis Masuk"
                    value={data.branch_side}
                    onValueChange={(value) => setData('branch_side', value)}
                    options={[
                        { value: 'center', label: 'Bawah dari parent' },
                        { value: 'left', label: 'Kiri dari parent' },
                        { value: 'right', label: 'Kanan dari parent' },
                    ]}
                    placeholder="Pilih posisi garis masuk"
                    error={errors.branch_side}
                />

                <FormSelect
                    label="Posisi Garis Keluar"
                    value={data.connector_from}
                    onValueChange={(value) => setData('connector_from', value)}
                    options={[
                        { value: 'bottom', label: 'Bawah' },
                        { value: 'left', label: 'Kiri' },
                        { value: 'right', label: 'Kanan' },
                        { value: 'top', label: 'Atas' },
                    ]}
                    placeholder="Pilih sisi garis keluar ke children"
                    error={errors.connector_from}
                />
            </div>

            <FormSelect
                label="Node Induk"
                value={data.parent_id === '' ? NONE : data.parent_id}
                onValueChange={handleParentChange}
                options={parentSelectOptions}
                placeholder="Pilih node induk"
                error={errors.parent_id}
            />

            <FormSelect
                label="Guru (opsional)"
                value={data.teacher_id === '' ? NONE : data.teacher_id}
                onValueChange={handleTeacherChange}
                options={teacherSelectOptions}
                placeholder="Pilih guru"
                error={errors.teacher_id}
            />

            {!data.teacher_id && (
                <>
                    <FormInput
                        label="Nama Manual"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Nama jika tidak ada guru yang ditautkan"
                        error={errors.name}
                    />

                    <FormInput
                        label="NIP"
                        value={data.nip}
                        onChange={(e) => setData('nip', e.target.value)}
                        placeholder="Nomor Induk Pegawai"
                        error={errors.nip}
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
                </>
            )}

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

export { OrganizationNodeForm };
