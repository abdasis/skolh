<?php

declare(strict_types=1);

namespace App\Services\Datatable\Concerns;

use Illuminate\Database\Eloquent\Builder;

trait AppliesFilters
{
    /**
     * @template TModel of \Illuminate\Database\Eloquent\Model
     *
     * @param  Builder<TModel>  $query
     * @param  array<string, mixed>  $filters
     * @param  array<int, string>  $allowedColumns
     * @return Builder<TModel>
     */
    protected function applyFilters(Builder $query, array $filters, array $allowedColumns): Builder
    {
        foreach ($filters as $column => $value) {
            if (! in_array($column, $allowedColumns, true)) {
                continue;
            }

            if (is_array($value)) {
                $query->whereIn($column, $value);
            } else {
                $query->where($column, $value);
            }
        }

        return $query;
    }
}
