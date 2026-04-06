import { Link } from '@inertiajs/react';
import { type InertiaFormProps } from '@inertiajs/react';
import {
    FormInput,
    FormTextarea,
    FormSelect,
    FormMultiSelect,
    FormDatePicker,
    FormImagePicker,
    FormSubmit,
    type SelectOption,
    type MultiSelectOption,
    formatLocalDate,
    parseLocalDate,
} from '@/components/form';
import { Button } from '@/components/ui/button';
import { TiptapEditor } from '@/components/tiptap-editor';
import {
    type ArticleResource,
    type ArticleStatus,
    type CategoryResource,
} from '@/types';

interface UserOption {
    id: number;
    name: string;
}

export interface ArticleFormData {
    title: string;
    user_id: number | string;
    excerpt: string;
    content: string;
    featured_image_url: string | null;
    status: ArticleStatus;
    published_at: string;
    category_ids: number[];
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    _method?: string;
}

const statusOptions: SelectOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Dipublikasikan' },
];

interface Props {
    form: InertiaFormProps<ArticleFormData>;
    url: string;
    cancelUrl: string;
    users: UserOption[];
    categories: CategoryResource[];
    article?: ArticleResource;
    submitLabel?: string;
}

const ArticleForm = ({
    form,
    url,
    cancelUrl,
    users,
    categories,
    article,
    submitLabel = 'Simpan',
}: Props) => {
    const { data, setData, errors, processing, recentlySuccessful, post } =
        form;

    const userOptions: SelectOption[] = users.map((u) => ({
        value: String(u.id),
        label: u.name,
    }));

    const categoryOptions: MultiSelectOption[] = categories.map((c) => ({
        value: String(c.id),
        label: c.name,
    }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(url, { preserveScroll: true });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Main content */}
            <div className="flex flex-col gap-4">
                <FormInput
                    label="Judul"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Judul artikel"
                    error={errors.title}
                    required
                />

                <FormSelect
                    label="Penulis"
                    value={String(data.user_id)}
                    onValueChange={(val) => setData('user_id', Number(val))}
                    options={userOptions}
                    placeholder="Pilih penulis"
                    error={errors.user_id}
                    required
                />

                <FormTextarea
                    label="Ringkasan"
                    value={data.excerpt}
                    onChange={(e) => setData('excerpt', e.target.value)}
                    placeholder="Ringkasan singkat artikel (maks. 500 karakter)"
                    rows={3}
                    error={errors.excerpt}
                />

                <TiptapEditor
                    label="Konten"
                    content={data.content}
                    onChange={(html) => setData('content', html)}
                    error={errors.content}
                />
            </div>

            {/* Featured image */}
            <FormImagePicker
                label="Featured Image"
                value={data.featured_image_url}
                onChange={(url) => setData('featured_image_url', url)}
                folder="articles/featured"
                error={errors.featured_image_url}
            />

            {/* Categories, status, date */}
            <div className="grid gap-4 sm:grid-cols-2">
                <FormMultiSelect
                    label="Kategori"
                    options={categoryOptions}
                    defaultValue={data.category_ids.map(String)}
                    onValueChange={(vals) =>
                        setData('category_ids', vals.map(Number))
                    }
                    placeholder="Pilih kategori..."
                    error={errors['category_ids']}
                />

                <FormSelect
                    label="Status"
                    value={data.status}
                    onValueChange={(val) =>
                        setData('status', val as ArticleStatus)
                    }
                    options={statusOptions}
                    placeholder="Pilih status"
                    error={errors.status}
                    required
                />

                <FormDatePicker
                    label="Tanggal Publikasi"
                    value={
                        data.published_at
                            ? parseLocalDate(data.published_at)
                            : undefined
                    }
                    onChange={(date) =>
                        setData(
                            'published_at',
                            date ? formatLocalDate(date) : '',
                        )
                    }
                    placeholder="Pilih tanggal (opsional)"
                    error={errors.published_at}
                />
            </div>

            {/* SEO section */}
            <div className="flex flex-col gap-4 rounded-xl border p-4">
                <div>
                    <p className="text-sm font-medium">SEO Metadata</p>
                    <p className="text-xs text-muted-foreground">
                        Opsional — digunakan untuk meta tags di halaman publik
                    </p>
                </div>

                <FormInput
                    label="Meta Title"
                    value={data.meta_title}
                    onChange={(e) => setData('meta_title', e.target.value)}
                    placeholder="Judul untuk mesin pencari (maks. 160 karakter)"
                    error={errors.meta_title}
                />

                <FormTextarea
                    label="Meta Description"
                    value={data.meta_description}
                    onChange={(e) =>
                        setData('meta_description', e.target.value)
                    }
                    placeholder="Deskripsi singkat untuk mesin pencari (maks. 320 karakter)"
                    rows={2}
                    error={errors.meta_description}
                />

                <FormInput
                    label="Meta Keywords"
                    value={data.meta_keywords}
                    onChange={(e) => setData('meta_keywords', e.target.value)}
                    placeholder="kata-kunci, dipisah, koma"
                    error={errors.meta_keywords}
                />

                {data.featured_image_url && (
                    <div className="grid gap-1">
                        <p className="text-sm font-medium">OG Image</p>
                        <p className="text-xs text-muted-foreground">
                            Otomatis menggunakan featured image.
                        </p>
                        <img
                            src={data.featured_image_url}
                            alt="OG image preview"
                            className="h-20 w-auto rounded-lg object-cover"
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" asChild>
                    <Link href={cancelUrl}>Batal</Link>
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

export { ArticleForm };
