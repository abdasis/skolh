export interface GalleryImageResource {
    id: number;
    gallery_album_id: number;
    image: string;
    image_url: string;
    caption: string | null;
    order: number;
    created_at: string;
}

export interface GalleryAlbumResource {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    cover_image: string | null;
    cover_image_url: string | null;
    status: string;
    images_count: number;
    images: GalleryImageResource[];
    created_at: string;
    updated_at: string;
}

export interface GalleryAlbumStats {
    total: number;
    published: number;
    draft: number;
    total_images: number;
}
