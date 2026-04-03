<?php

namespace App\Repositories\Contracts;

use App\Models\OrganizationNode;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface OrganizationNodeRepositoryInterface
{
    /**
     * @return LengthAwarePaginator<OrganizationNode>
     */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator;

    /**
     * @return array{total: int, linked: int, manual: int, broken: int}
     */
    public function getStats(): array;

    /**
     * @return Collection<int, OrganizationNode>
     */
    public function getAllForTree(): Collection;

    /**
     * @return Collection<int, OrganizationNode>
     */
    public function getAllForSelect(): Collection;

    /**
     * @return Collection<int, OrganizationNode>
     */
    public function getAllForDesign(): Collection;
}
