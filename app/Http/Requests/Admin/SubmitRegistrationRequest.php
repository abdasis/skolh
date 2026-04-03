<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Models\AdmissionPeriod;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubmitRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $periodId = $this->input('admission_period_id');

        return [
            'admission_period_id' => ['required', 'integer', 'exists:admission_periods,id'],

            // Data Pribadi
            'full_name' => ['required', 'string', 'max:255'],
            'nik' => [
                'required', 'string', 'size:16',
                Rule::unique('registrations', 'nik')->where('admission_period_id', $periodId),
            ],
            'nisn' => [
                'nullable', 'string', 'size:10',
                Rule::unique('registrations', 'nisn')->where('admission_period_id', $periodId)->whereNotNull('nisn'),
            ],
            'birth_place' => ['required', 'string', 'max:100'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required', 'in:L,P'],
            'religion' => ['required', 'string', 'in:Islam,Kristen,Katolik,Hindu,Buddha,Khonghucu'],
            'citizenship' => ['required', 'string', 'max:50'],
            'address_street' => ['required', 'string'],
            'address_rt' => ['nullable', 'string', 'max:3'],
            'address_rw' => ['nullable', 'string', 'max:3'],
            'address_village' => ['required', 'string', 'max:100'],
            'address_district' => ['required', 'string', 'max:100'],
            'address_city' => ['required', 'string', 'max:100'],
            'address_province' => ['required', 'string', 'max:100'],
            'address_postal_code' => ['nullable', 'string', 'max:5'],
            'living_arrangement' => ['nullable', 'string', 'max:50'],
            'transportation' => ['nullable', 'string', 'max:50'],
            'phone' => ['nullable', 'string', 'max:15'],
            'email' => ['nullable', 'email', 'max:255'],
            'birth_order' => ['nullable', 'integer', 'min:1'],
            'sibling_count' => ['nullable', 'integer', 'min:0'],
            'special_needs' => ['nullable', 'string', 'max:255'],
            'height' => ['nullable', 'integer', 'min:50', 'max:250'],
            'weight' => ['nullable', 'integer', 'min:5', 'max:200'],

            // Data Ayah
            'father_name' => ['required', 'string', 'max:255'],
            'father_nik' => ['nullable', 'string', 'max:16'],
            'father_birth_year' => ['nullable', 'integer', 'min:1900', 'max:' . date('Y')],
            'father_education' => ['nullable', 'string', 'max:20'],
            'father_occupation' => ['nullable', 'string', 'max:100'],
            'father_income' => ['nullable', 'string', 'max:50'],

            // Data Ibu
            'mother_name' => ['required', 'string', 'max:255'],
            'mother_nik' => ['nullable', 'string', 'max:16'],
            'mother_birth_year' => ['nullable', 'integer', 'min:1900', 'max:' . date('Y')],
            'mother_education' => ['nullable', 'string', 'max:20'],
            'mother_occupation' => ['nullable', 'string', 'max:100'],
            'mother_income' => ['nullable', 'string', 'max:50'],

            // Data Wali (opsional)
            'guardian_name' => ['nullable', 'string', 'max:255'],
            'guardian_nik' => ['nullable', 'string', 'max:16'],
            'guardian_birth_year' => ['nullable', 'integer', 'min:1900', 'max:' . date('Y')],
            'guardian_education' => ['nullable', 'string', 'max:20'],
            'guardian_occupation' => ['nullable', 'string', 'max:100'],
            'guardian_income' => ['nullable', 'string', 'max:50'],

            // Data Asal Sekolah
            'previous_school_name' => ['nullable', 'string', 'max:255'],
            'previous_school_npsn' => ['nullable', 'string', 'max:8'],
            'graduation_year' => ['nullable', 'integer', 'min:1990', 'max:' . (date('Y') + 1)],

            // Dokumen (via Spatie Media Library)
            'registration_photo' => ['required', 'image', 'max:2048'],
            'registration_id_document' => ['required', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],

            // Custom fields
            'custom_fields' => ['nullable', 'array'],
            'custom_fields.*' => ['nullable'],
        ];
    }
}
