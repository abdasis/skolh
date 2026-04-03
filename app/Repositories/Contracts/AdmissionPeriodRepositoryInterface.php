<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\AdmissionPeriod;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface AdmissionPeriodRepositoryInterface
{
    /** @return Collection<int, AdmissionPeriod> */
    public function getAll(): Collection;

    /** @return LengthAwarePaginator<AdmissionPeriod> */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator;

    public function findActive(): ?AdmissionPeriod;

    public function findOpen(): ?AdmissionPeriod;
}
