<?php

namespace App\Repositories;

use App\Enums\GalleryAlbumStatus;
use App\Models\GalleryAlbum;
use App\Models\GalleryImage;
use App\Repositories\Contracts\GalleryAlbumRepositoryInterface;
use Illuminate\Support\Collection;

class GalleryAlbumRepository implements GalleryAlbumRepositoryInterface
{
    public function getAll(): Collection
    {
        return GalleryAlbum::withCount('images')->latest()->get();
    }

    public function getPublished(): Collection
    {
        return GalleryAlbum::published()->withCount('images')->latest()->get();
    }

    public function findBySlug(string $slug): ?GalleryAlbum
    {
        return GalleryAlbum::where('slug', $slug)->first();
    }

    /**
     * @return array{total: int, published: int, draft: int, total_images: int}
     */
    public function getStats(): array
    {
        $all = GalleryAlbum::all();

        return [
            'total' => $all->count(),
            'published' => $all->filter(fn (GalleryAlbum $a) => $a->status === GalleryAlbumStatus::Published)->count(),
            'draft' => $all->filter(fn (GalleryAlbum $a) => $a->status === GalleryAlbumStatus::Draft)->count(),
            'total_images' => GalleryImage::count(),
        ];
    }
}
