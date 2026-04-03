<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\AdmissionPeriod;
use App\Repositories\Contracts\AdmissionPeriodRepositoryInterface;
use App\Services\Datatable\DatatableConfig;
use App\Services\Datatable\DatatableRequest;
use App\Services\Datatable\DatatableService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

final class AdmissionPeriodRepository implements AdmissionPeriodRepositoryInterface
{
    public function __construct(
        private readonly DatatableService $datatable,
    ) {}

    /** @return Collection<int, AdmissionPeriod> */
    public function getAll(): Collection
    {
        return AdmissionPeriod::query()
            ->orderByDesc('created_at')
            ->get();
    }

    /** @return LengthAwarePaginator<AdmissionPeriod> */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator
    {
        $config = new DatatableConfig(
            searchableColumns: ['academic_year', 'description'],
            filterableColumns: ['is_active'],
            sortableColumns: ['academic_year', 'start_date', 'end_date', 'created_at'],
            defaultSort: ['column' => 'created_at', 'direction' => 'desc'],
        );

        return $this->datatable->paginate(AdmissionPeriod::query(), $request, $config);
    }

    public function findActive(): ?AdmissionPeriod
    {
        return AdmissionPeriod::query()
            ->active()
            ->first();
    }

    public function findOpen(): ?AdmissionPeriod
    {
        return AdmissionPeriod::query()
            ->open()
            ->with('customFields')
            ->first();
    }
}
