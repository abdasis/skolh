<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganizationNodeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'position' => $this->position,
            'name' => $this->name,
            'parent_id' => $this->parent_id,
            'teacher_id' => $this->teacher_id,
            'sort_order' => $this->sort_order,
            'branch_side' => $this->branch_side,
            'connector_from' => $this->connector_from,
            'position_x' => $this->position_x,
            'position_y' => $this->position_y,
            'display_name' => $this->teacher?->name ?? $this->name,
            'nip' => $this->teacher?->nip ?? $this->nip,
            'avatar_url' => $this->teacher?->getFirstMediaUrl('avatar') ?: ($this->getFirstMediaUrl('avatar') ?: null),
            'is_broken_link' => $this->teacher_id === null && $this->name === null,
            'socials' => $this->teacher?->socials->map(fn ($s) => [
                'platform' => $s->platform->value,
                'url' => $s->url,
            ]) ?? [],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
