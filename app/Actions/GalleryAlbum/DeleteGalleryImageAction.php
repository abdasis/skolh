<?php

namespace App\Actions\GalleryAlbum;

use App\Models\GalleryImage;
use Illuminate\Support\Facades\Storage;

class DeleteGalleryImageAction
{
    public function handle(GalleryImage $image): void
    {
        Storage::disk('public')->delete($image->image);
        $image->delete();
    }
}
