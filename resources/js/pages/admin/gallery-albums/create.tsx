import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as GalleryAlbumController from '@/actions/App/Http/Controllers/Admin/GalleryAlbumController';
import { GalleryAlbumForm, type GalleryAlbumFormData } from './components/gallery-album-form';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    statuses: EnumOption[];
}

const AdminGalleryAlbumsCreate = ({ statuses }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Galeri', href: GalleryAlbumController.index.url() },
            { title: 'Tambah Album', href: GalleryAlbumController.create.url() },
        ],
    });

    const form = useForm<GalleryAlbumFormData>({
        title: '',
        description: '',
        cover_image_path: null,
        status: 'draft',
        image_paths: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(GalleryAlbumController.store.url());
    };

    return (
        <>
            <Head title="Tambah Album Galeri" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Album Galeri</h1>
                    <p className="text-sm text-muted-foreground">
                        Buat album baru dan unggah foto.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <GalleryAlbumForm
                                form={form}
                                onSubmit={handleSubmit}
                                statuses={statuses}
                                submitLabel="Buat Album"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminGalleryAlbumsCreate;
