import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import * as GalleryAlbumController from '@/actions/App/Http/Controllers/GalleryAlbumController';
import { type GalleryAlbumResource } from '@/types';

interface Props {
    album: GalleryAlbumResource;
}

const GalleryShow = ({ album }: Props) => {
    return (
        <>
            <Head title={album.title} />

            <div className="container mx-auto px-4 py-10">
                <div className="mb-6">
                    <Link
                        href={GalleryAlbumController.index.url()}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Galeri
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold">{album.title}</h1>
                    {album.description && (
                        <p className="mt-2 text-muted-foreground">{album.description}</p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground">
                        {album.images.length} foto
                    </p>
                </div>

                {album.images.length === 0 ? (
                    <p className="py-16 text-center text-muted-foreground">
                        Belum ada foto di album ini.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {album.images.map((image) => (
                            <div
                                key={image.id}
                                className="overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/8"
                            >
                                <img
                                    src={image.image_url}
                                    alt={image.caption ?? album.title}
                                    className="aspect-square w-full object-cover"
                                />
                                {image.caption && (
                                    <p className="px-2 py-1.5 text-xs text-muted-foreground">
                                        {image.caption}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default GalleryShow;
