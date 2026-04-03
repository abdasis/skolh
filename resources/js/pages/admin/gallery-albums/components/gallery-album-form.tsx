import { type FormEventHandler, useRef, useState } from 'react';
import { type InertiaFormProps } from '@inertiajs/react';
import { FormInput, FormTextarea, FormSelect, FormSubmit, FormLabel, type SelectOption } from '@/components/form';
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
    cover_image: File | null;
    status: string;
    images: File[];
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
    existingCoverUrl?: string | null;
    existingImages?: ExistingImage[];
    albumId?: number;
}

const GalleryAlbumForm = ({
    form,
    onSubmit,
    submitLabel = 'Simpan',
    statuses,
    existingCoverUrl,
    existingImages = [],
    albumId,
}: Props) => {
    const { data, setData, errors, processing, recentlySuccessful } = form;
    const coverInputRef = useRef<HTMLInputElement>(null);
    const imagesInputRef = useRef<HTMLInputElement>(null);
    const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(existingCoverUrl ?? null);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

    const statusOptions: SelectOption[] = statuses.map((s) => ({ value: s.value, label: s.label }));

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('cover_image', file);
        if (file) {
            setCoverPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setData('images', files);
        setNewImagePreviews(files.map((f) => URL.createObjectURL(f)));
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
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

            <div className="grid gap-2">
                <FormLabel htmlFor="cover_image">Foto Sampul</FormLabel>
                <input
                    ref={coverInputRef}
                    id="cover_image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleCoverChange}
                    className="text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
                />
                {coverPreviewUrl && (
                    <img
                        src={coverPreviewUrl}
                        alt="Preview sampul"
                        className="mt-1 h-32 w-auto rounded-md object-cover"
                    />
                )}
                <InputError message={errors.cover_image} />
            </div>

            <div className="grid gap-2">
                <FormLabel htmlFor="images">Tambah Foto</FormLabel>
                <input
                    ref={imagesInputRef}
                    id="images"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleImagesChange}
                    className="text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
                />
                {newImagePreviews.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2">
                        {newImagePreviews.map((url, i) => (
                            <img
                                key={i}
                                src={url}
                                alt={`Preview ${i + 1}`}
                                className="h-20 w-20 rounded-md object-cover ring-1 ring-foreground/10"
                            />
                        ))}
                    </div>
                )}
                <InputError message={errors['images']} />
            </div>

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

            <FormSubmit processing={processing} successful={recentlySuccessful}>
                {submitLabel}
            </FormSubmit>
        </form>
    );
};

export { GalleryAlbumForm };
