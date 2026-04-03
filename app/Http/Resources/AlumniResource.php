<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class AlumniResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'batch' => $this->batch,
            'destination' => $this->destination,
            'quote' => $this->quote,
            'avatar_url' => $this->avatar_url,
            'sort_order' => $this->sort_order,
            'socials' => $this->whenLoaded('socials', fn () => $this->socials->map(fn ($social) => [
                'id' => $social->id,
                'platform' => $social->platform->value,
                'url' => $social->url,
            ])->values()->all(), []),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
