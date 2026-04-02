import { type FormEventHandler, useRef, useState } from 'react';
import { type InertiaFormProps } from '@inertiajs/react';
import { FormInput, FormTextarea, FormSelect, FormSubmit, FormLabel, type SelectOption } from '@/components/form';
import { TiptapEditor } from '@/components/tiptap-editor';
import InputError from '@/components/ui/input-error';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface EnumOption {
    value: string;
    label: string;
}

export interface ExtracurricularFormData {
    _method?: string;
    title: string;
    category: string;
    day: string;
    time: string;
    supervisor: string;
    description: string;
    content: string;
    featured_image: File | null;
    status: string;
}

interface Props {
    form: InertiaFormProps<ExtracurricularFormData>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    submitLabel?: string;
    categories: EnumOption[];
    days: EnumOption[];
    statuses: EnumOption[];
    existingImageUrl?: string | null;
}

const ExtracurricularForm = ({
    form,
    onSubmit,
    submitLabel = 'Simpan',
    categories,
    days,
    statuses,
    existingImageUrl,
}: Props) => {
    const { data, setData, errors, processing, recentlySuccessful } = form;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl ?? null);

    const categoryOptions: SelectOption[] = categories.map((c) => ({ value: c.value, label: c.label }));
    const dayOptions: SelectOption[] = days.map((d) => ({ value: d.value, label: d.label }));
    const statusOptions: SelectOption[] = statuses.map((s) => ({ value: s.value, label: s.label }));

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setData('featured_image', file);

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
            <FormInput
                label="Judul"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Nama kegiatan ekstrakurikuler"
                error={errors.title}
                required
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormSelect
                    label="Kategori"
                    value={data.category}
                    onValueChange={(value) => setData('category', value)}
                    options={categoryOptions}
                    placeholder="Pilih kategori"
                    error={errors.category}
                    required
                />

                <FormSelect
                    label="Hari"
                    value={data.day}
                    onValueChange={(value) => setData('day', value)}
                    options={dayOptions}
                    placeholder="Pilih hari"
                    error={errors.day}
                    required
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                    label="Waktu"
                    value={data.time}
                    onChange={(e) => setData('time', e.target.value)}
                    placeholder="08:00 - 10:00"
                    error={errors.time}
                    required
                />

                <FormInput
                    label="Pembina"
                    value={data.supervisor}
                    onChange={(e) => setData('supervisor', e.target.value)}
                    placeholder="Nama pembina / pelatih"
                    error={errors.supervisor}
                    required
                />
            </div>

            <FormTextarea
                label="Deskripsi"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Deskripsi singkat kegiatan"
                rows={3}
                error={errors.description}
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
};

export { ExtracurricularForm };
