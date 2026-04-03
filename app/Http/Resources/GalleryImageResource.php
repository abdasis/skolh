<?php

namespace App\Http\Resources;

use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/** @mixin GalleryImage */
class GalleryImageResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'gallery_album_id' => $this->gallery_album_id,
            'image' => $this->image,
            'image_url' => Storage::disk('public')->url($this->image),
            'caption' => $this->caption,
            'order' => $this->order,
            'created_at' => $this->created_at,
        ];
    }
}
