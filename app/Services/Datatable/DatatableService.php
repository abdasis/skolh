<?php

declare(strict_types=1);

namespace App\Services\Datatable;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

final class DatatableService
{
    use Concerns\AppliesFilters;
    use Concerns\AppliesSearch;
    use Concerns\AppliesSorting;

    /**
     * @template TModel of \Illuminate\Database\Eloquent\Model
     *
     * @param  Builder<TModel>  $query
     * @return LengthAwarePaginator<TModel>
     */
    public function paginate(
        Builder $query,
        DatatableRequest $request,
        DatatableConfig $config,
    ): LengthAwarePaginator {
        $perPage = max(1, min($request->perPage, $config->maxPerPage));

        $this->applySearch($query, $request->search, $config->searchableColumns);
        $this->applyFilters($query, $request->filters, $config->filterableColumns);
        $this->applySorting($query, $request->sorting, $config->sortableColumns, $config->defaultSort);

        return $query->paginate($perPage)->withQueryString();
    }
}
