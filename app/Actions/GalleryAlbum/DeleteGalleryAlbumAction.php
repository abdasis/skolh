<?php

namespace App\Actions\GalleryAlbum;

use App\Models\GalleryAlbum;
use Illuminate\Support\Facades\Storage;

class DeleteGalleryAlbumAction
{
    public function handle(GalleryAlbum $album): void
    {
        foreach ($album->images as $image) {
            Storage::disk('public')->delete($image->image);
        }

        if ($album->cover_image) {
            Storage::disk('public')->delete($album->cover_image);
        }

        $album->delete();
    }
}
