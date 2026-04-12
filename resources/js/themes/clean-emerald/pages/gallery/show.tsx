import { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import * as GalleryAlbumController from '@/actions/App/Http/Controllers/GalleryAlbumController';
import { type GalleryAlbumResource, type SiteConfig } from '@/types';

interface Props {
    album: GalleryAlbumResource;
}

const GalleryShow = ({ album }: Props) => {
    const { siteConfig } = usePage<{ siteConfig: SiteConfig | null }>().props;
    const schoolName = siteConfig?.identity?.name ?? 'SDIT Al-Aziz';

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const isOpen = selectedIndex !== null;
    const images = album.images;

    const closeLightbox = () => setSelectedIndex(null);

    const goToPrev = () => {
        if (selectedIndex === null || selectedIndex === 0) return;
        setSelectedIndex(selectedIndex - 1);
    };

    const goToNext = () => {
        if (selectedIndex === null || selectedIndex === images.length - 1)
            return;
        setSelectedIndex(selectedIndex + 1);
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex]);

    const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

    return (
        <>
            <Head title={`${album.title} - ${schoolName}`}>
                <meta
                    name="description"
                    content={
                        album.description ??
                        `Album foto ${album.title} dari ${schoolName}.`
                    }
                />
                <meta
                    property="og:title"
                    content={`${album.title} - ${schoolName}`}
                />
                <meta
                    property="og:description"
                    content={
                        album.description ??
                        `Album foto ${album.title} dari ${schoolName}.`
                    }
                />
                <meta property="og:type" content="website" />
                {album.cover_image_url && (
                    <meta property="og:image" content={album.cover_image_url} />
                )}
                <link
                    rel="canonical"
                    href={window.location.href.split('?')[0]}
                />
            </Head>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <Link
                    href={GalleryAlbumController.index.url()}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Galeri
                </Link>

                <div className="mt-8 mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        {album.title}
                    </h1>
                    {album.description && (
                        <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
                            {album.description}
                        </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {album.images.length} foto
                    </p>
                </div>

                {images.length === 0 ? (
                    <p className="py-16 text-center text-muted-foreground">
                        Belum ada foto di album ini.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {images.map((image, index) => (
                            <button
                                key={image.id}
                                type="button"
                                onClick={() => setSelectedIndex(index)}
                                className="group overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/8 transition-all hover:ring-foreground/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            >
                                <img
                                    src={image.image_url}
                                    alt={image.caption ?? album.title}
                                    className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                                />
                                {image.caption && (
                                    <p className="px-2 py-1.5 text-left text-xs text-muted-foreground">
                                        {image.caption}
                                    </p>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {isOpen && selectedImage && (
                /* Backdrop */
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedImage.caption ?? album.title}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
                    onClick={closeLightbox}
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                        aria-label="Tutup"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Prev button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrev();
                        }}
                        disabled={selectedIndex === 0}
                        className="absolute left-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Foto sebelumnya"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    {/* Image container — stop click from closing */}
                    <div
                        className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.image_url}
                            alt={selectedImage.caption ?? album.title}
                            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                        />
                        <div className="mt-3 flex w-full items-center justify-between px-1">
                            {selectedImage.caption ? (
                                <p className="text-sm text-white/80">
                                    {selectedImage.caption}
                                </p>
                            ) : (
                                <span />
                            )}
                            <span className="ml-auto text-sm text-white/60 tabular-nums">
                                {selectedIndex + 1} / {images.length}
                            </span>
                        </div>
                    </div>

                    {/* Next button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        disabled={selectedIndex === images.length - 1}
                        className="absolute right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Foto selanjutnya"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>
            )}
        </>
    );
};

export default GalleryShow;
