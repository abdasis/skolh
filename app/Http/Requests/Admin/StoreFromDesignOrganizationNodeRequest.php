<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Models\OrganizationNode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

final class StoreFromDesignOrganizationNodeRequest extends FormRequest
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
            'branch_side' => ['string', 'in:left,center,right'],
            'connector_from' => ['string', 'in:top,bottom,left,right'],
            'position_x' => ['nullable', 'numeric'],
            'position_y' => ['nullable', 'numeric'],
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
