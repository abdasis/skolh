import { type FormEventHandler, useRef, useState } from 'react';
import { type InertiaFormProps } from '@inertiajs/react';
import { FormIconPicker, FormInput, FormTextarea, FormSelect, FormSubmit, FormLabel, type SelectOption } from '@/components/form';
import { TiptapEditor } from '@/components/tiptap-editor';
import InputError from '@/components/ui/input-error';

export interface FacilityFormData {
    icon: string;
    title: string;
    description: string;
    content: string;
    featured_image: File | null;
    status: string;
}

interface Props {
    form: InertiaFormProps<FacilityFormData>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    submitLabel?: string;
    existingImageUrl?: string | null;
}

const statusOptions: SelectOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'public', label: 'Publik' },
];

export function FacilityForm({ form, onSubmit, submitLabel = 'Simpan', existingImageUrl }: Props) {
    const { data, setData, errors, processing, recentlySuccessful } = form;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl ?? null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setData('featured_image', file);

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
            <FormIconPicker
                label="Icon"
                value={data.icon}
                onChange={(value) => setData('icon', value)}
                error={errors.icon}
                required
            />

            <FormInput
                label="Judul"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Judul fasilitas"
                error={errors.title}
                required
            />

            <FormTextarea
                label="Deskripsi"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Deskripsi singkat fasilitas"
                rows={3}
                error={errors.description}
                required
            />

            <TiptapEditor
                label="Konten"
                content={data.content}
                onChange={(html) => setData('content', html)}
                error={errors.content}
            />

            <div className="grid gap-2">
                <FormLabel htmlFor="featured_image">Gambar Unggulan</FormLabel>
                <input
                    ref={fileInputRef}
                    id="featured_image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
                />
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="mt-1 h-32 w-auto rounded-md object-cover"
                    />
                )}
                <InputError message={errors.featured_image} />
            </div>

            <FormSelect
                label="Status"
                value={data.status}
                onValueChange={(value) => setData('status', value)}
                options={statusOptions}
                placeholder="Pilih status"
                error={errors.status}
                required
            />

            <FormSubmit processing={processing} successful={recentlySuccessful}>
                {submitLabel}
            </FormSubmit>
        </form>
    );
}
