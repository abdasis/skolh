<?php

namespace App\Http\Requests\Admin;

use App\Rules\MaxNavDepth;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateNavigationRequest extends FormRequest
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
        $itemRules = [
            'id' => ['required', 'string', 'max:50'],
            'label' => ['required', 'string', 'max:50'],
            'href' => ['required', 'string', 'max:200'],
            'type' => ['required', 'in:route,anchor,external'],
            'visible' => ['required', 'boolean'],
            'order' => ['required', 'integer', 'min:0'],
        ];

        $rules = [
            'header_items' => ['required', 'array', 'max:50', new MaxNavDepth(3)],

            // Footer (unchanged)
            'footer_groups' => ['required', 'array'],
            'footer_groups.*.title' => ['required', 'string', 'max:50'],
            'footer_groups.*.links' => ['required', 'array'],
            'footer_groups.*.links.*.label' => ['required', 'string', 'max:50'],
            'footer_groups.*.links.*.href' => ['required', 'string', 'max:200'],
            'footer_groups.*.links.*.type' => ['required', 'in:route,anchor,external'],
        ];

        // Level 1
        foreach ($itemRules as $field => $fieldRules) {
            $rules["header_items.*.{$field}"] = $fieldRules;
        }
        $rules['header_items.*.children'] = ['nullable', 'array', 'max:20'];

        // Level 2
        foreach ($itemRules as $field => $fieldRules) {
            $rules["header_items.*.children.*.{$field}"] = $fieldRules;
        }
        $rules['header_items.*.children.*.children'] = ['nullable', 'array', 'max:20'];

        // Level 3
        foreach ($itemRules as $field => $fieldRules) {
            $rules["header_items.*.children.*.children.*.{$field}"] = $fieldRules;
        }
        $rules['header_items.*.children.*.children.*.children'] = ['prohibited'];

        return $rules;
    }
}
