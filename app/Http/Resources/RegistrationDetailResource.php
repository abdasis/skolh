<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class RegistrationDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'admission_period_id' => $this->admission_period_id,
            'registration_number' => $this->registration_number,
            'status' => $this->status->value,
            // Data Pribadi
            'full_name' => $this->full_name,
            'nik' => $this->nik,
            'nisn' => $this->nisn,
            'birth_place' => $this->birth_place,
            'birth_date' => $this->birth_date?->toDateString(),
            'gender' => $this->gender,
            'religion' => $this->religion,
            'citizenship' => $this->citizenship,
            'address_street' => $this->address_street,
            'address_rt' => $this->address_rt,
            'address_rw' => $this->address_rw,
            'address_village' => $this->address_village,
            'address_district' => $this->address_district,
            'address_city' => $this->address_city,
            'address_province' => $this->address_province,
            'address_postal_code' => $this->address_postal_code,
            'living_arrangement' => $this->living_arrangement,
            'transportation' => $this->transportation,
            'phone' => $this->phone,
            'email' => $this->email,
            'birth_order' => $this->birth_order,
            'sibling_count' => $this->sibling_count,
            'special_needs' => $this->special_needs,
            'height' => $this->height,
            'weight' => $this->weight,
            // Data Ayah
            'father_name' => $this->father_name,
            'father_nik' => $this->father_nik,
            'father_birth_year' => $this->father_birth_year,
            'father_education' => $this->father_education,
            'father_occupation' => $this->father_occupation,
            'father_income' => $this->father_income,
            // Data Ibu
            'mother_name' => $this->mother_name,
            'mother_nik' => $this->mother_nik,
            'mother_birth_year' => $this->mother_birth_year,
            'mother_education' => $this->mother_education,
            'mother_occupation' => $this->mother_occupation,
            'mother_income' => $this->mother_income,
            // Data Wali
            'guardian_name' => $this->guardian_name,
            'guardian_nik' => $this->guardian_nik,
            'guardian_birth_year' => $this->guardian_birth_year,
            'guardian_education' => $this->guardian_education,
            'guardian_occupation' => $this->guardian_occupation,
            'guardian_income' => $this->guardian_income,
            // Data Sekolah
            'previous_school_name' => $this->previous_school_name,
            'previous_school_npsn' => $this->previous_school_npsn,
            'graduation_year' => $this->graduation_year,
            // Relasi
            'custom_values' => $this->whenLoaded('customValues', fn () =>
                $this->customValues->map(fn ($cv) => [
                    'id' => $cv->id,
                    'custom_field_id' => $cv->custom_field_id,
                    'field_label' => $cv->field_label,
                    'field_type' => $cv->field_type,
                    'value' => $cv->value,
                ])->values()->all()
            ),
            'photo_url' => $this->getFirstMediaUrl('registration_photo'),
            'admission_period' => $this->whenLoaded('admissionPeriod', fn () => new AdmissionPeriodResource($this->admissionPeriod)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
