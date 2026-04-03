<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Models\OrganizationNode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

final class StoreOrganizationNodeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'position' => ['required', 'string', 'max:255'],
            'parent_id' => ['nullable', 'integer', 'exists:organization_nodes,id'],
            'teacher_id' => ['nullable', 'integer', 'exists:teachers,id'],
            'name' => ['nullable', 'string', 'max:255'],
            'nip' => ['nullable', 'string', 'max:30'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'sort_order' => ['integer', 'min:0'],
            'branch_side' => ['string', 'in:left,center,right'],
            'connector_from' => ['string', 'in:top,bottom,left,right'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                if ($this->input('parent_id') === null) {
                    $rootExists = OrganizationNode::whereNull('parent_id')->exists();

                    if ($rootExists) {
                        $validator->errors()->add('parent_id', 'A root node already exists. Please select a parent.');
                    }
                }
            },
        ];
    }
}
