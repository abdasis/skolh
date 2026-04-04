<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Registration;
use App\Models\Student;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface StudentRepositoryInterface
{
    /**
     * @return LengthAwarePaginator<Student>
     */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator;

    /**
     * @return Collection<int, Registration>
     */
    public function getAcceptedRegistrations(): Collection;
}
