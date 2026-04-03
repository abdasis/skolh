<?php

declare(strict_types=1);

namespace App\Actions\Alumni;

use App\Models\Alumni;
use Illuminate\Support\Facades\DB;

final class ReorderAlumniAction
{
    /**
     * @param  array<int, int>  $order  Mapping id => sort_order
     */
    public function handle(array $order): void
    {
        DB::transaction(function () use ($order): void {
            foreach ($order as $id => $sortOrder) {
                Alumni::where('id', $id)->update(['sort_order' => $sortOrder]);
            }
        });
    }
}
