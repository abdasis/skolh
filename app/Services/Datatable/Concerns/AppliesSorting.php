<?php

declare(strict_types=1);

namespace App\Services\Datatable\Concerns;

use Illuminate\Database\Eloquent\Builder;

trait AppliesSorting
{
    /**
     * @template TModel of \Illuminate\Database\Eloquent\Model
     *
     * @param  Builder<TModel>  $query
     * @param  array<int, array{column: string, direction: string}>  $sorting
     * @param  array<int, string>  $allowedColumns
     * @param  array{column: string, direction: string}  $defaultSort
     * @return Builder<TModel>
     */
    protected function applySorting(
        Builder $query,
        array $sorting,
        array $allowedColumns,
        array $defaultSort,
    ): Builder {
        $applied = false;

        foreach ($sorting as $sort) {
            if (! in_array($sort['column'], $allowedColumns, true)) {
                continue;
            }

            $direction = strtolower($sort['direction']) === 'asc' ? 'asc' : 'desc';
            $query->orderBy($sort['column'], $direction);
            $applied = true;
        }

        if (! $applied) {
            $query->orderBy($defaultSort['column'], $defaultSort['direction']);
        }

        return $query;
    }
}
