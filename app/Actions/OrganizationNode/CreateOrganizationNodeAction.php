<?php

declare(strict_types=1);

namespace App\Actions\OrganizationNode;

use App\Models\OrganizationNode;
use Illuminate\Http\UploadedFile;

final class CreateOrganizationNodeAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): OrganizationNode
    {
        $avatar = $data['avatar'] ?? null;

        $node = OrganizationNode::create([
            'parent_id' => $data['parent_id'] ?? null,
            'teacher_id' => $data['teacher_id'] ?? null,
            'position' => $data['position'],
            'name' => $data['name'] ?? null,
            'nip' => $data['nip'] ?? null,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        if ($avatar instanceof UploadedFile) {
            $node->addMedia($avatar)->toMediaCollection('avatar');
        }

        return $node;
    }
}
