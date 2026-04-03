<?php

namespace App\Http\Controllers\Admin;

use App\Actions\GalleryAlbum\DeleteGalleryImageAction;
use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;

class GalleryImageController extends Controller
{
    public function __construct(
        private readonly DeleteGalleryImageAction $deleteAction,
    ) {}

    public function destroy(GalleryImage $galleryImage): RedirectResponse
    {
        $albumId = $galleryImage->gallery_album_id;

        $this->deleteAction->handle($galleryImage);

        return redirect()->route('admin.gallery-albums.edit', $albumId)
            ->with('success', 'Foto berhasil dihapus.');
    }
}
