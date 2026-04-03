<?php

namespace App\Actions\GalleryAlbum;

use App\Models\GalleryAlbum;
use Illuminate\Support\Facades\Storage;

class UpdateGalleryAlbumAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(GalleryAlbum $album, array $data): GalleryAlbum
    {
        $coverImagePath = $data['cover_image_path'] ?? null;
        unset($data['cover_image_path'], $data['image_paths']);

        if ($coverImagePath && $coverImagePath !== $album->cover_image) {
            if ($album->cover_image) {
                Storage::disk('public')->delete($album->cover_image);
            }
            $data['cover_image'] = $coverImagePath;
        }

        $album->update($data);

        return $album;
    }
}
