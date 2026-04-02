<?php

namespace App\Repositories\Contracts;

use App\Models\Teacher;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface TeacherRepositoryInterface
{
    /**
     * @return LengthAwarePaginator<Teacher>
     */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator;

    /**
     * @return array{total: int, active: int, inactive: int}
     */
    public function getStats(): array;
}
