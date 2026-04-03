<?php

declare(strict_types=1);

namespace App\Actions\Admission;

use App\Models\AdmissionPeriod;
use App\Models\CustomField;
use App\Models\Registration;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

final class SubmitRegistrationAction
{
    /**
     * @param array<string, mixed> $data
     */
    public function handle(AdmissionPeriod $period, array $data): Registration
    {
        return DB::transaction(function () use ($period, $data): Registration {
            $registrationNumber = Registration::generateRegistrationNumber($period->id, $period->academic_year);

            $registration = Registration::create([
                'admission_period_id' => $period->id,
                'registration_number' => $registrationNumber,
                'status' => 'pending',
                ...$this->extractStandardFields($data),
            ]);

            // Simpan dokumen wajib via Spatie Media Library
            if (isset($data['registration_photo']) && $data['registration_photo'] instanceof UploadedFile) {
                $registration->addMedia($data['registration_photo'])
                    ->toMediaCollection('registration_photo');
            }

            if (isset($data['registration_id_document']) && $data['registration_id_document'] instanceof UploadedFile) {
                $registration->addMedia($data['registration_id_document'])
                    ->toMediaCollection('registration_id_document');
            }

            // Simpan nilai custom fields
            if (!empty($data['custom_fields'])) {
                $customFields = CustomField::whereIn('id', array_keys($data['custom_fields']))->get()->keyBy('id');

                foreach ($data['custom_fields'] as $fieldId => $value) {
                    $field = $customFields->get($fieldId);
                    if (!$field) {
                        continue;
                    }

                    // File type custom field
                    if ($field->type->value === 'file' && $value instanceof UploadedFile) {
                        $media = $registration->addMedia($value)
                            ->toMediaCollection("custom_file_{$fieldId}");

                        $registration->customValues()->create([
                            'custom_field_id' => $fieldId,
                            'field_label' => $field->label,
                            'field_type' => $field->type->value,
                            'value' => $media->getUrl(),
                        ]);
                    } else {
                        $registration->customValues()->create([
                            'custom_field_id' => $fieldId,
                            'field_label' => $field->label,
                            'field_type' => $field->type->value,
                            'value' => $value !== null ? (string) $value : null,
                        ]);
                    }
                }
            }

            return $registration->refresh();
        });
    }

    /**
     * Ambil field standar EMIS/DAPODIK dari data array.
     *
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     */
    private function extractStandardFields(array $data): array
    {
        $fields = [
            'full_name', 'nik', 'nisn', 'birth_place', 'birth_date', 'gender', 'religion',
            'citizenship', 'address_street', 'address_rt', 'address_rw', 'address_village',
            'address_district', 'address_city', 'address_province', 'address_postal_code',
            'living_arrangement', 'transportation', 'phone', 'email', 'birth_order',
            'sibling_count', 'special_needs', 'height', 'weight',
            'father_name', 'father_nik', 'father_birth_year', 'father_education',
            'father_occupation', 'father_income',
            'mother_name', 'mother_nik', 'mother_birth_year', 'mother_education',
            'mother_occupation', 'mother_income',
            'guardian_name', 'guardian_nik', 'guardian_birth_year', 'guardian_education',
            'guardian_occupation', 'guardian_income',
            'previous_school_name', 'previous_school_npsn', 'graduation_year',
        ];

        return array_filter(
            array_intersect_key($data, array_flip($fields)),
            fn ($val) => $val !== null || in_array($val, $fields),
        );
    }
}
