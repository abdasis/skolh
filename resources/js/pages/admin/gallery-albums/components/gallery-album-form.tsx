import { type FormEventHandler } from 'react';
import { type InertiaFormProps } from '@inertiajs/react';
import { FormInput, FormTextarea, FormSelect, FormSubmit, FormLabel, type SelectOption, FormImagePicker, FormMultiImagePicker } from '@/components/form';
import InputError from '@/components/ui/input-error';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';
import * as GalleryAlbumController from '@/actions/App/Http/Controllers/Admin/GalleryAlbumController';

interface EnumOption {
    value: string;
    label: string;
}

export interface GalleryAlbumFormData {
    _method?: string;
    title: string;
    description: string;
    cover_image_path: string | null;
    status: string;
    image_paths: string[];
}

interface ExistingImage {
    id: number;
    image_url: string;
    caption: string | null;
}

interface Props {
    form: InertiaFormProps<GalleryAlbumFormData>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    submitLabel?: string;
    statuses: EnumOption[];
    existingImages?: ExistingImage[];
    albumId?: number;
}

const GalleryAlbumForm = ({
    form,
    onSubmit,
    submitLabel = 'Simpan',
    statuses,
    existingImages = [],
    albumId,
}: Props) => {
    const { data, setData, errors, processing, recentlySuccessful } = form;

    const statusOptions: SelectOption[] = statuses.map((s) => ({ value: s.value, label: s.label }));

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <FormInput
                label="Judul Album"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Nama album galeri"
                error={errors.title}
                required
            />

            <FormTextarea
                label="Deskripsi"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Deskripsi singkat album"
                rows={3}
                error={errors.description}
            />

            <FormImagePicker
                label="Foto Sampul"
                value={data.cover_image_path}
                onChange={(url) => setData('cover_image_path', url)}
                folder="gallery-albums/covers"
                error={errors.cover_image_path}
            />

            <FormMultiImagePicker
                label="Tambah Foto"
                value={data.image_paths}
                onChange={(urls) => setData('image_paths', urls)}
                folder={albumId ? `gallery-albums/${albumId}` : 'gallery-albums/temp'}
                error={errors['image_paths']}
            />

            {existingImages.length > 0 && albumId && (
                <div className="grid gap-2">
                    <FormLabel>Foto di Album</FormLabel>
                    <div className="flex flex-wrap gap-2">
                        {existingImages.map((img) => (
                            <div key={img.id} className="group relative">
                                <img
                                    src={img.image_url}
                                    alt={img.caption ?? 'Foto galeri'}
                                    className="h-20 w-20 rounded-md object-cover ring-1 ring-foreground/10"
                                />
                                <Link
                                    href={`/admin/gallery-images/${img.id}`}
                                    method="delete"
                                    as="button"
                                    className="absolute -right-1.5 -top-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground ring-1 ring-background group-hover:flex"
                                    onClick={(e) => {
                                        if (!confirm('Hapus foto ini?')) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                    <Link href={GalleryAlbumController.index.url()}>Batal</Link>
                </Button>
                <FormSubmit processing={processing} successful={recentlySuccessful}>
                    {submitLabel}
                </FormSubmit>
            </div>
        </form>
    );
};

export { GalleryAlbumForm };
