import { Head, Link, usePage } from '@inertiajs/react';
import { ImageIcon } from 'lucide-react';
import * as GalleryAlbumController from '@/actions/App/Http/Controllers/GalleryAlbumController';
import { type GalleryAlbumResource, type SiteConfig } from '@/types';

interface Props {
    albums: GalleryAlbumResource[];
}

const GalleryIndex = ({ albums }: Props) => {
    const { siteConfig } = usePage<{ siteConfig: SiteConfig | null }>().props;
    const schoolName = siteConfig?.identity?.name ?? 'SDIT Al-Aziz';

    return (
        <>
            <Head title={`Galeri Foto - ${schoolName}`}>
                <meta
                    name="description"
                    content={`Kumpulan foto kegiatan dan momen ${schoolName}.`}
                />
                <meta
                    property="og:title"
                    content={`Galeri Foto - ${schoolName}`}
                />
                <meta
                    property="og:description"
                    content={`Kumpulan foto kegiatan dan momen ${schoolName}.`}
                />
                <meta property="og:type" content="website" />
                <link
                    rel="canonical"
                    href={GalleryAlbumController.index.url()}
                />
            </Head>

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Page header */}
                <div className="relative">
                    <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-emerald-100/60 blur-2xl dark:bg-emerald-900/30" />
                    <div className="absolute top-2 left-32 h-12 w-12 rounded-full bg-teal-100/50 blur-xl dark:bg-teal-900/20" />

                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                            Galeri Foto
                        </span>

                        <div className="mt-3 flex items-start gap-4">
                            <div className="mt-1 flex shrink-0 flex-col items-center gap-1">
                                <div className="h-6 w-0.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                <div className="h-2 w-0.5 rounded-full bg-emerald-300 dark:bg-emerald-600" />
                                <div className="h-1 w-0.5 rounded-full bg-emerald-200 dark:bg-emerald-700" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Momen &{' '}
                                    <span className="text-emerald-600 dark:text-emerald-400">
                                        Kenangan
                                    </span>
                                </h1>
                                <p className="mt-3 max-w-xl text-base text-gray-600 dark:text-gray-400">
                                    Kumpulan foto kegiatan dan momen berharga
                                    sekolah.
                                </p>
                            </div>
                        </div>
                    </div>
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
                                href={GalleryAlbumController.show.url({
                                    galleryAlbum: album.slug,
                                })}
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
                                        <h2 className="leading-snug font-semibold group-hover:underline">
                                            {album.title}
                                        </h2>
                                        {album.description && (
                                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                {album.description}
                                            </p>
                                        )}
                                        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <ImageIcon className="h-3.5 w-3.5" />
                                            <span>
                                                {album.images_count} foto
                                            </span>
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
