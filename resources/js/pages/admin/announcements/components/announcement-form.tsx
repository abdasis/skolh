import { useRef } from 'react';
import { type InertiaFormProps } from '@inertiajs/react';
import {
    FormInput,
    FormTextarea,
    FormSelect,
    FormMultiSelect,
    FormDatePicker,
    FormLabel,
    FormSubmit,
    type SelectOption,
    type MultiSelectOption,
    formatLocalDate,
    parseLocalDate,
} from '@/components/form';
import { Button } from '@/components/ui/button';
import { TiptapEditor } from '@/components/tiptap-editor';
import InputError from '@/components/ui/input-error';
import { type CategoryResource, type AnnouncementAttachmentResource } from '@/types';
import { Link, router } from '@inertiajs/react';
import * as AnnouncementAttachmentController from '@/actions/App/Http/Controllers/Admin/AnnouncementAttachmentController';

export interface AnnouncementFormData {
    title: string;
    excerpt: string;
    content: string;
    status: string;
    published_at: string;
    expired_at: string;
    category_ids: string[];
    attachments: File[];
    _method?: string;
}

const statusOptions: SelectOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Dipublikasikan' },
];

interface Props {
    form: InertiaFormProps<AnnouncementFormData>;
    url: string;
    cancelUrl: string;
    categories: CategoryResource[];
    existingAttachments?: AnnouncementAttachmentResource[];
    submitLabel?: string;
}

const AnnouncementForm = ({ form, url, cancelUrl, categories, existingAttachments = [], submitLabel = 'Simpan' }: Props) => {
    const { data, setData, errors, processing, recentlySuccessful, post } = form;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const categoryOptions: MultiSelectOption[] = categories.map((c) => ({
        value: String(c.id),
        label: c.name,
    }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(url, { forceFormData: true, preserveScroll: true });
    };

    const handleDeleteAttachment = (attachment: AnnouncementAttachmentResource) => {
        router.delete(AnnouncementAttachmentController.destroy.url({ attachment: attachment.id }), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
            <FormInput
                label="Judul"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Judul pengumuman"
                error={errors.title}
                required
            />

            <FormTextarea
                label="Ringkasan"
                value={data.excerpt}
                onChange={(e) => setData('excerpt', e.target.value)}
                placeholder="Ringkasan singkat pengumuman (maks. 500 karakter)"
                rows={3}
                error={errors.excerpt}
                required
            />

            <TiptapEditor
                label="Konten"
                content={data.content}
                onChange={(html) => setData('content', html)}
                error={errors.content}
            />

            <FormMultiSelect
                label="Kategori"
                options={categoryOptions}
                defaultValue={data.category_ids}
                onValueChange={(vals) => setData('category_ids', vals)}
                placeholder="Pilih kategori..."
                error={errors['category_ids']}
                required
            />

            <FormSelect
                label="Status"
                value={data.status}
                onValueChange={(val) => setData('status', val)}
                options={statusOptions}
                placeholder="Pilih status"
                error={errors.status}
                required
            />

            <div className="grid gap-2 sm:grid-cols-2">
                <FormDatePicker
                    label="Tanggal Publikasi"
                    value={data.published_at ? parseLocalDate(data.published_at) : undefined}
                    onChange={(date) => setData('published_at', date ? formatLocalDate(date) : '')}
                    placeholder="Pilih tanggal"
                    error={errors.published_at}
                />
                <FormDatePicker
                    label="Tanggal Kedaluwarsa"
                    value={data.expired_at ? parseLocalDate(data.expired_at) : undefined}
                    onChange={(date) => setData('expired_at', date ? formatLocalDate(date) : '')}
                    placeholder="Pilih tanggal (opsional)"
                    error={errors.expired_at}
                />
            </div>

            <div className="grid gap-2">
                <FormLabel htmlFor="attachments">Lampiran</FormLabel>
                <input
                    ref={fileInputRef}
                    id="attachments"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        setData('attachments', files);
                    }}
                    className="text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
                />
                <p className="text-xs text-muted-foreground">PDF, JPG, JPEG, PNG — maks. 5MB per file</p>
                <InputError message={errors.attachments} />
            </div>

            {existingAttachments.length > 0 && (
                <div className="grid gap-2">
                    <FormLabel htmlFor="existing-attachments">Lampiran Tersimpan</FormLabel>
                    <ul className="space-y-1">
                        {existingAttachments.map((att) => (
                            <li key={att.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                                <a
                                    href={att.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-emerald-600 hover:underline truncate"
                                >
                                    {att.original_name}
                                </a>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteAttachment(att)}
                                    className="ml-3 shrink-0 text-xs text-red-500 hover:text-red-700"
                                >
                                    Hapus
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex justify-end gap-2">
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

export { AnnouncementForm };
