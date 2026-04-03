<?php

namespace App\Actions\GalleryAlbum;

use App\Models\GalleryAlbum;

class CreateGalleryAlbumAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): GalleryAlbum
    {
        $coverImagePath = $data['cover_image_path'] ?? null;
        unset($data['cover_image_path'], $data['image_paths']);

        if ($coverImagePath) {
            $data['cover_image'] = $coverImagePath;
        }

        return GalleryAlbum::create($data);
    }
}
