<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Registration;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface RegistrationRepositoryInterface
{
    /** @return LengthAwarePaginator<Registration> */
    public function getPaginated(DatatableRequest $request, ?int $periodId = null): LengthAwarePaginator;

    public function findByRegistrationNumber(string $registrationNumber): ?Registration;
}
