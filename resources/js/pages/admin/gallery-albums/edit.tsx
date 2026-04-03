import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as GalleryAlbumController from '@/actions/App/Http/Controllers/Admin/GalleryAlbumController';
import { GalleryAlbumForm, type GalleryAlbumFormData } from './components/gallery-album-form';
import { type GalleryAlbumResource } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    album: GalleryAlbumResource;
    statuses: EnumOption[];
}

const AdminGalleryAlbumsEdit = ({ album, statuses }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Galeri', href: GalleryAlbumController.index.url() },
            { title: 'Edit Album' },
        ],
    });

    const form = useForm<GalleryAlbumFormData>({
        _method: 'PUT',
        title: album.title,
        description: album.description ?? '',
        cover_image_path: album.cover_image ?? null,
        status: album.status,
        image_paths: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(GalleryAlbumController.update.url({ gallery_album: album.id }));
    };

    return (
        <>
            <Head title="Edit Album Galeri" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Album Galeri</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah informasi album dan kelola foto.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <GalleryAlbumForm
                                form={form}
                                onSubmit={handleSubmit}
                                statuses={statuses}
                                submitLabel="Simpan Perubahan"
                                existingImages={album.images}
                                albumId={album.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminGalleryAlbumsEdit;
