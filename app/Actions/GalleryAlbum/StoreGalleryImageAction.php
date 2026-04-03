<?php

namespace App\Actions\GalleryAlbum;

use App\Models\GalleryAlbum;
use App\Models\GalleryImage;
use Illuminate\Http\UploadedFile;

class StoreGalleryImageAction
{
    public function handle(GalleryAlbum $album, UploadedFile $file, ?string $caption = null): GalleryImage
    {
        $path = $file->store('gallery-albums/'.$album->id, 'public');
        $order = (int) $album->images()->max('order') + 1;

        return $album->images()->create([
            'image' => $path,
            'caption' => $caption,
            'order' => $order,
        ]);
    }
}
