<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class RegistrationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'admission_period_id' => $this->admission_period_id,
            'registration_number' => $this->registration_number,
            'status' => $this->status->value,
            'full_name' => $this->full_name,
            'nik' => $this->nik,
            'nisn' => $this->nisn,
            'gender' => $this->gender,
            'birth_date' => $this->birth_date?->toDateString(),
            'address_city' => $this->address_city,
            'phone' => $this->phone,
            'created_at' => $this->created_at,
            'admission_period' => $this->whenLoaded('admissionPeriod', fn () => [
                'academic_year' => $this->admissionPeriod->academic_year,
            ]),
        ];
    }
}
