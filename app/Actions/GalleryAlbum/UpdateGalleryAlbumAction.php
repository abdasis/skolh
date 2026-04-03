<?php

namespace App\Actions\GalleryAlbum;

use App\Models\GalleryAlbum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UpdateGalleryAlbumAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(GalleryAlbum $album, array $data): GalleryAlbum
    {
        $coverImage = $data['cover_image'] ?? null;
        unset($data['cover_image'], $data['images']);

        if ($coverImage instanceof UploadedFile) {
            if ($album->cover_image) {
                Storage::disk('public')->delete($album->cover_image);
            }
            $data['cover_image'] = $coverImage->store('gallery-albums/covers', 'public');
        }

        $album->update($data);

        return $album;
    }
}
