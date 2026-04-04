<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:100'],
            'nis' => ['nullable', 'string', 'max:20', Rule::unique('students', 'nis')->ignore($this->route('student'))],
            'nisn' => ['nullable', 'string', 'max:10'],
            'nik' => ['nullable', 'string', 'max:16'],
            'gender' => ['required', 'in:L,P'],
            'religion' => ['nullable', 'string', 'max:20'],
            'citizenship' => ['nullable', 'string', 'max:50'],
            'birth_place' => ['nullable', 'string', 'max:100'],
            'birth_date' => ['nullable', 'date'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:15'],
            'email' => ['nullable', 'email', 'max:150'],
            'special_needs' => ['nullable', 'string', 'max:100'],
            'enrollment_year' => ['required', 'integer', 'min:2000', 'max:2100'],
            'status' => ['required', 'in:active,graduated,transferred,dropped_out'],
            'notes' => ['nullable', 'string'],
            'father_name' => ['nullable', 'string', 'max:100'],
            'father_occupation' => ['nullable', 'string', 'max:100'],
            'father_phone' => ['nullable', 'string', 'max:15'],
            'mother_name' => ['nullable', 'string', 'max:100'],
            'mother_occupation' => ['nullable', 'string', 'max:100'],
            'mother_phone' => ['nullable', 'string', 'max:15'],
            'guardian_name' => ['nullable', 'string', 'max:100'],
            'guardian_occupation' => ['nullable', 'string', 'max:100'],
            'guardian_phone' => ['nullable', 'string', 'max:15'],
            'photo_url' => ['nullable', 'string', 'url'],
        ];
    }
}
