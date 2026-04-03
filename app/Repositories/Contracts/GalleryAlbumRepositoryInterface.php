<?php

namespace App\Repositories\Contracts;

use App\Models\GalleryAlbum;
use Illuminate\Support\Collection;

interface GalleryAlbumRepositoryInterface
{
    public function getAll(): Collection;

    public function getPublished(): Collection;

    public function findBySlug(string $slug): ?GalleryAlbum;

    /**
     * @return array{total: int, published: int, draft: int, total_images: int}
     */
    public function getStats(): array;
}
