<?php

namespace App\Actions\GalleryAlbum;

use App\Models\GalleryAlbum;
use App\Models\GalleryImage;

class StoreGalleryImageAction
{
    public function handle(GalleryAlbum $album, string $path, ?string $caption = null): GalleryImage
    {
        $order = (int) $album->images()->max('order') + 1;

        return $album->images()->create([
            'image' => $path,
            'caption' => $caption,
            'order' => $order,
        ]);
    }
}
