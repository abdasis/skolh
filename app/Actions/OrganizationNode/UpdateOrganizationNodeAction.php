<?php

declare(strict_types=1);

namespace App\Actions\OrganizationNode;

use App\Models\OrganizationNode;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\ValidationException;

final class UpdateOrganizationNodeAction
{
    /**
     * @param  array<string, mixed>  $data
     *
     * @throws ValidationException
     */
    public function handle(OrganizationNode $node, array $data): OrganizationNode
    {
        $parentId = $data['parent_id'] ?? null;

        if ($parentId !== null) {
            $descendantIds = $this->collectDescendantIds($node);

            if (in_array((int) $parentId, $descendantIds, strict: true)) {
                throw ValidationException::withMessages([
                    'parent_id' => ['The selected parent would create a circular reference.'],
                ]);
            }
        }

        $avatar = $data['avatar'] ?? null;

        $node->update([
            'parent_id' => $parentId,
            'teacher_id' => $data['teacher_id'] ?? null,
            'position' => $data['position'],
            'name' => $data['name'] ?? null,
            'nip' => $data['nip'] ?? null,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        if ($avatar instanceof UploadedFile) {
            $node->addMedia($avatar)->toMediaCollection('avatar');
        }

        return $node->refresh();
    }

    /**
     * @return array<int, int>
     */
    private function collectDescendantIds(OrganizationNode $node): array
    {
        $ids = [];

        foreach ($node->children as $child) {
            $ids[] = $child->id;
            $ids = array_merge($ids, $this->collectDescendantIds($child));
        }

        return $ids;
    }
}
