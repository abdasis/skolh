<?php

declare(strict_types=1);

namespace App\Actions\Testimonial;

use App\Models\Testimonial;
use Illuminate\Support\Facades\DB;

final class ReorderTestimonialsAction
{
    /**
     * @param  array<int, int>  $order  Mapping id => sort_order
     */
    public function handle(array $order): void
    {
        DB::transaction(function () use ($order): void {
            foreach ($order as $id => $sortOrder) {
                Testimonial::where('id', $id)->update(['sort_order' => $sortOrder]);
            }
        });
    }
}
