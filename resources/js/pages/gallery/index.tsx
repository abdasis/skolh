import { Head, Link } from '@inertiajs/react';
import { ImageIcon } from 'lucide-react';
import * as GalleryAlbumController from '@/actions/App/Http/Controllers/GalleryAlbumController';
import { type GalleryAlbumResource } from '@/types';

interface Props {
    albums: GalleryAlbumResource[];
}

const GalleryIndex = ({ albums }: Props) => {
    return (
        <>
            <Head title="Galeri Foto" />

            <div className="container mx-auto px-4 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Galeri Foto</h1>
                    <p className="mt-2 text-muted-foreground">
                        Kumpulan foto kegiatan dan momen sekolah.
                    </p>
                </div>

                {albums.length === 0 ? (
                    <p className="py-16 text-center text-muted-foreground">
                        Belum ada album galeri yang tersedia.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {albums.map((album) => (
                            <Link
                                key={album.id}
                                href={GalleryAlbumController.show.url({ galleryAlbum: album.slug })}
                                className="group block overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8 transition-shadow hover:ring-foreground/20"
                            >
                                <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                    {album.cover_image_url ? (
                                        <img
                                            src={album.cover_image_url}
                                            alt={album.title}
                                            className="h-48 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-48 w-full items-center justify-center bg-muted">
                                            <ImageIcon className="h-12 w-12 text-muted-foreground/40" />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h2 className="font-semibold leading-snug group-hover:underline">
                                            {album.title}
                                        </h2>
                                        {album.description && (
                                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                {album.description}
                                            </p>
                                        )}
                                        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <ImageIcon className="h-3.5 w-3.5" />
                                            <span>{album.images_count} foto</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default GalleryIndex;
