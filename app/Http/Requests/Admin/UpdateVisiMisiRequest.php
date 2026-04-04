<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateVisiMisiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'vision' => ['required', 'string', 'min:1'],
            'mission' => ['required', 'string', 'min:1'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'vision.required' => 'Visi tidak boleh kosong.',
            'vision.min' => 'Visi tidak boleh kosong.',
            'mission.required' => 'Misi tidak boleh kosong.',
            'mission.min' => 'Misi tidak boleh kosong.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'vision' => trim((string) $this->input('vision', '')),
            'mission' => trim((string) $this->input('mission', '')),
        ]);
    }
}
