<?php

namespace App\Actions\GalleryAlbum;

use App\Models\GalleryAlbum;
use Illuminate\Http\UploadedFile;

class CreateGalleryAlbumAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): GalleryAlbum
    {
        $coverImage = $data['cover_image'] ?? null;
        unset($data['cover_image'], $data['images']);

        if ($coverImage instanceof UploadedFile) {
            $data['cover_image'] = $coverImage->store('gallery-albums/covers', 'public');
        }

        return GalleryAlbum::create($data);
    }
}
