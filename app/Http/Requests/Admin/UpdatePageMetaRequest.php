<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePageMetaRequest extends FormRequest
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
            'pages' => ['required', 'array'],
            'pages.*.key' => ['required', 'string', 'max:100'],
            'pages.*.title' => ['required', 'string', 'max:200'],
            'pages.*.description' => ['nullable', 'string', 'max:500'],
        ];
    }
}
