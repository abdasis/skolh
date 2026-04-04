<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSchoolHistoryRequest extends FormRequest
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
            'history' => ['required', 'string', 'min:1'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'history.required' => 'Sejarah sekolah tidak boleh kosong.',
            'history.min' => 'Sejarah sekolah tidak boleh kosong.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'history' => trim((string) $this->input('history', '')),
        ]);
    }
}
