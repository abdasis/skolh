<?php

declare(strict_types=1);

namespace App\Actions\Admission;

use App\Models\CustomField;
use Illuminate\Support\Facades\DB;

final class ReorderCustomFieldsAction
{
    /**
     * @param array<int, array{id: int, sort_order: int}> $order
     */
    public function handle(array $order): void
    {
        DB::transaction(function () use ($order) {
            foreach ($order as $item) {
                CustomField::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
            }
        });
    }
}
