import { type FormEventHandler } from 'react';
import { type InertiaFormProps } from '@inertiajs/react';
import {
    FormInput,
    FormTextarea,
    FormSelect,
    FormSubmit,
    FormImagePicker,
    type SelectOption,
} from '@/components/form';
import { TiptapEditor } from '@/components/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { type MajorFormData } from '@/types';

interface Props {
    form: InertiaFormProps<MajorFormData>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    submitLabel?: string;
    cancelHref: string;
}

const statusOptions: SelectOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'public', label: 'Publik' },
];

export const MajorForm = ({
    form,
    onSubmit,
    submitLabel = 'Simpan',
    cancelHref,
}: Props) => {
    const { data, setData, errors, processing, recentlySuccessful } = form;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <FormInput
                label="Judul"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Judul jurusan"
                error={errors.title}
                required
            />

            <FormTextarea
                label="Deskripsi"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Deskripsi singkat jurusan"
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

            <FormImagePicker
                label="Gambar Unggulan"
                value={data.featured_image}
                onChange={(url) => setData('featured_image', url)}
                folder="majors"
                error={errors.featured_image}
            />

            <FormSelect
                label="Status"
                value={data.status}
                onValueChange={(value) => setData('status', value)}
                options={statusOptions}
                placeholder="Pilih status"
                error={errors.status}
                required
            />

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" asChild>
                    <Link href={cancelHref}>Batal</Link>
                </Button>
                <FormSubmit
                    processing={processing}
                    successful={recentlySuccessful}
                >
                    {submitLabel}
                </FormSubmit>
            </div>
        </form>
    );
};
