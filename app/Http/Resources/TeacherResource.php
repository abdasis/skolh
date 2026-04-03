<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class TeacherResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'nip' => $this->nip,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'subject' => $this->subject,
            'gender' => $this->gender?->value,
            'gender_label' => $this->gender?->name,
            'date_of_birth' => $this->date_of_birth?->toDateString(),
            'joined_at' => $this->joined_at?->toDateString(),
            'status' => $this->status->value,
            'status_label' => $this->status->name,
            'avatar_url' => $this->getFirstMediaUrl('avatar') ?: null,
            'socials' => $this->whenLoaded('socials', fn () => $this->socials->map(fn ($s) => [
                'id' => $s->id,
                'platform' => $s->platform->value,
                'url' => $s->url,
            ])),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
