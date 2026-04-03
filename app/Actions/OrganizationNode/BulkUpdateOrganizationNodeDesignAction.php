<?php

declare(strict_types=1);

namespace App\Actions\OrganizationNode;

use App\Models\OrganizationNode;
use Illuminate\Support\Facades\DB;

final class BulkUpdateOrganizationNodeDesignAction
{
    /**
     * @param  array<int, array{id: int, parent_id: int|null, sort_order: int, branch_side: string, connector_from: string, position_x: float|null, position_y: float|null}>  $nodes
     */
    public function handle(array $nodes): void
    {
        $ids = array_column($nodes, 'id');
        $models = OrganizationNode::whereIn('id', $ids)->get()->keyBy('id');

        DB::transaction(function () use ($nodes, $models) {
            foreach ($nodes as $item) {
                $model = $models->get($item['id']);

                if (! $model) {
                    continue;
                }

                $model->update([
                    'parent_id' => $item['parent_id'],
                    'sort_order' => $item['sort_order'],
                    'branch_side' => $item['branch_side'],
                    'connector_from' => $item['connector_from'],
                    'position_x' => $item['position_x'] ?? null,
                    'position_y' => $item['position_y'] ?? null,
                ]);
            }
        });
    }
}
