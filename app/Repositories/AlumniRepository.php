<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Alumni;
use App\Repositories\Contracts\AlumniRepositoryInterface;
use App\Services\Datatable\DatatableConfig;
use App\Services\Datatable\DatatableRequest;
use App\Services\Datatable\DatatableService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

final class AlumniRepository implements AlumniRepositoryInterface
{
    public function __construct(
        private readonly DatatableService $datatable,
    ) {}

    /**
     * @return LengthAwarePaginator<Alumni>
     */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator
    {
        $config = new DatatableConfig(
            searchableColumns: ['name', 'batch', 'destination'],
            filterableColumns: [],
            sortableColumns: ['name', 'batch', 'sort_order', 'created_at'],
            defaultSort: ['column' => 'sort_order', 'direction' => 'asc'],
        );

        return $this->datatable->paginate(Alumni::query(), $request, $config);
    }

    /**
     * @return Collection<int, Alumni>
     */
    public function forWelcomePage(): Collection
    {
        return Alumni::query()
            ->with('socials')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->limit(4)
            ->get();
    }
}
