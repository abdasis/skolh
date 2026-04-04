<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSectionPreferencesRequest extends FormRequest
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
            'sections' => ['required', 'array'],
            'sections.*.enabled' => ['required', 'boolean'],
            'sections.*.limit' => ['nullable', 'integer', 'min:1', 'max:100'],
        ];
    }
}
