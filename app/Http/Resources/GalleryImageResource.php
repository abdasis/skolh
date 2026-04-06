<?php

namespace App\Http\Resources;

use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/** @mixin GalleryImage */
class GalleryImageResource extends JsonResource
{
    private function resolveImageUrl(string $path): string
    {
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'gallery_album_id' => $this->gallery_album_id,
            'image' => $this->image,
            'image_url' => $this->resolveImageUrl($this->image),
            'caption' => $this->caption,
            'order' => $this->order,
            'created_at' => $this->created_at,
        ];
    }
}
