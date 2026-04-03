<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Models\OrganizationNode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UpdateOrganizationNodeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        /** @var OrganizationNode $node */
        $node = $this->route('organization_node');

        return [
            'position' => ['required', 'string', 'max:255'],
            'parent_id' => [
                'nullable',
                'integer',
                'exists:organization_nodes,id',
                Rule::notIn([$node->id]),
            ],
            'teacher_id' => ['nullable', 'integer', 'exists:teachers,id'],
            'name' => ['nullable', 'string', 'max:255'],
            'nip' => ['nullable', 'string', 'max:30'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'sort_order' => ['integer', 'min:0'],
            'branch_side' => ['string', 'in:left,center,right'],
            'connector_from' => ['string', 'in:top,bottom,left,right'],
        ];
    }
}
