<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Alumni;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface AlumniRepositoryInterface
{
    /**
     * @return LengthAwarePaginator<Alumni>
     */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator;

    /**
     * @return Collection<int, Alumni>
     */
    public function forWelcomePage(): Collection;
}
