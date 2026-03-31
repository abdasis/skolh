<?php

namespace App\Http\Resources;

use App\Models\Curriculum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/** @mixin Curriculum */
class CurriculumResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'year' => $this->year,
            'level' => $this->level,
            'slug' => $this->slug,
            'description' => $this->description,
            'content' => $this->content,
            'icon' => $this->icon,
            'status' => $this->status->value,
            'effective_date' => $this->effective_date?->toDateString(),
            'expired_date' => $this->expired_date?->toDateString(),
            'document' => $this->document,
            'document_url' => $this->document
                ? Storage::disk('public')->url($this->document)
                : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
