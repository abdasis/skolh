import { type InertiaFormProps } from '@inertiajs/react';
import { FormInput, FormTextarea, FormSubmit } from '@/components/form';

export interface CategoryFormData {
    name: string;
    description: string;
}

interface Props {
    form: InertiaFormProps<CategoryFormData & { _method?: string }>;
    url: string;
    submitLabel?: string;
}

const CategoryForm = ({ form, url, submitLabel = 'Simpan' }: Props) => {
    const { data, setData, errors, processing, recentlySuccessful, post } = form;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(url, { preserveScroll: true });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormInput
                label="Nama"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Nama kategori"
                error={errors.name}
                required
            />
            <FormTextarea
                label="Deskripsi"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Deskripsi singkat (opsional)"
                rows={3}
                error={errors.description}
            />
            <FormSubmit processing={processing} successful={recentlySuccessful}>
                {submitLabel}
            </FormSubmit>
        </form>
    );
};

export { CategoryForm };
