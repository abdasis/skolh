<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Enums\CustomFieldType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomFieldRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'label' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::enum(CustomFieldType::class)],
            'placeholder' => ['nullable', 'string', 'max:255'],
            'is_required' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
            'options' => ['nullable', 'array'],
            'options.*' => ['required', 'string', 'max:255'],
        ];
    }
}
