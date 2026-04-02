<?php

declare(strict_types=1);

namespace App\Services\Datatable\Concerns;

use Illuminate\Database\Eloquent\Builder;

trait AppliesSearch
{
    /**
     * @template TModel of \Illuminate\Database\Eloquent\Model
     *
     * @param  Builder<TModel>  $query
     * @param  array<int, string>  $columns
     * @return Builder<TModel>
     */
    protected function applySearch(Builder $query, string $search, array $columns): Builder
    {
        if ($search === '' || $columns === []) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($search, $columns): void {
            foreach ($columns as $column) {
                if (str_contains($column, '.')) {
                    [$relation, $field] = explode('.', $column, 2);
                    $q->orWhereHas($relation, function (Builder $sub) use ($search, $field): void {
                        $sub->where($field, 'like', "%{$search}%");
                    });
                } else {
                    $q->orWhere($column, 'like', "%{$search}%");
                }
            }
        });
    }
}
