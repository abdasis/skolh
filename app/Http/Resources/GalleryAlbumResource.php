<?php

namespace App\Http\Resources;

use App\Models\GalleryAlbum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/** @mixin GalleryAlbum */
class GalleryAlbumResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'cover_image' => $this->cover_image,
            'cover_image_url' => $this->cover_image ? Storage::disk('public')->url($this->cover_image) : null,
            'status' => $this->status->value,
            'images_count' => $this->whenCounted('images', fn () => $this->images_count, fn () => $this->whenLoaded('images', fn () => $this->images->count())),
            'images' => GalleryImageResource::collection($this->whenLoaded('images')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
