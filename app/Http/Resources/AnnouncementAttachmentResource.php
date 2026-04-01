<?php

namespace App\Http\Resources;

use App\Models\AnnouncementAttachment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/** @mixin AnnouncementAttachment */
class AnnouncementAttachmentResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'path' => $this->path,
            'original_name' => $this->original_name,
            'url' => Storage::disk('public')->url($this->path),
            'mime_type' => $this->mime_type,
            'created_at' => $this->created_at,
        ];
    }
}
