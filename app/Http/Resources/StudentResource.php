<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'registration_id' => $this->registration_id,
            'nis' => $this->nis,
            'nisn' => $this->nisn,
            'nik' => $this->nik,
            'full_name' => $this->full_name,
            'gender' => $this->gender,
            'religion' => $this->religion,
            'citizenship' => $this->citizenship,
            'birth_place' => $this->birth_place,
            'birth_date' => $this->birth_date?->toDateString(),
            'address' => $this->address,
            'phone' => $this->phone,
            'email' => $this->email,
            'special_needs' => $this->special_needs,
            'enrollment_year' => $this->enrollment_year,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'status_color' => $this->status->color(),
            'notes' => $this->notes,
            'father_name' => $this->father_name,
            'father_occupation' => $this->father_occupation,
            'father_phone' => $this->father_phone,
            'mother_name' => $this->mother_name,
            'mother_occupation' => $this->mother_occupation,
            'mother_phone' => $this->mother_phone,
            'guardian_name' => $this->guardian_name,
            'guardian_occupation' => $this->guardian_occupation,
            'guardian_phone' => $this->guardian_phone,
            'photo_url' => $this->photo_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
