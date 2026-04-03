<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

final class SaveOrganizationNodeDesignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'nodes' => ['required', 'array', 'min:1'],
            'nodes.*.id' => ['required', 'integer', 'exists:organization_nodes,id'],
            'nodes.*.parent_id' => ['nullable', 'integer', 'exists:organization_nodes,id'],
            'nodes.*.sort_order' => ['required', 'integer', 'min:0'],
            'nodes.*.branch_side' => ['required', 'string', 'in:left,center,right'],
            'nodes.*.connector_from' => ['required', 'string', 'in:top,bottom,left,right'],
            'nodes.*.position_x' => ['nullable', 'numeric'],
            'nodes.*.position_y' => ['nullable', 'numeric'],
        ];
    }
}
