<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCurriculumRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:50'],
            'year' => ['required', 'integer', 'min:2000', 'max:2100'],
            'level' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'content' => ['nullable', 'string'],
            'icon' => ['required', 'string', 'max:100'],
            'status' => ['required', 'in:active,draft'],
            'effective_date' => ['required', 'date'],
            'expired_date' => ['nullable', 'date', 'after_or_equal:effective_date'],
            'document' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
        ];
    }
}
