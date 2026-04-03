<?php

namespace App\Repositories;

use App\Models\OrganizationNode;
use App\Repositories\Contracts\OrganizationNodeRepositoryInterface;
use App\Services\Datatable\DatatableConfig;
use App\Services\Datatable\DatatableRequest;
use App\Services\Datatable\DatatableService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class OrganizationNodeRepository implements OrganizationNodeRepositoryInterface
{
    public function __construct(
        private readonly DatatableService $datatable,
    ) {}

    /**
     * @return LengthAwarePaginator<OrganizationNode>
     */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator
    {
        $config = new DatatableConfig(
            searchableColumns: ['position', 'name'],
            filterableColumns: [],
            sortableColumns: ['position', 'sort_order', 'created_at'],
            defaultSort: ['column' => 'sort_order', 'direction' => 'asc'],
        );

        return $this->datatable->paginate(
            OrganizationNode::query()->with('teacher'),
            $request,
            $config,
        );
    }

    /**
     * @return array{total: int, linked: int, manual: int, broken: int}
     */
    public function getStats(): array
    {
        $all = OrganizationNode::all();

        return [
            'total' => $all->count(),
            'linked' => $all->filter(fn (OrganizationNode $n) => $n->teacher_id !== null)->count(),
            'manual' => $all->filter(fn (OrganizationNode $n) => $n->teacher_id === null && $n->name !== null)->count(),
            'broken' => $all->filter(fn (OrganizationNode $n) => $n->teacher_id === null && $n->name === null)->count(),
        ];
    }

    /**
     * @return Collection<int, OrganizationNode>
     */
    public function getAllForTree(): Collection
    {
        return OrganizationNode::with(['teacher.media', 'teacher.socials'])->orderBy('sort_order')->get();
    }

    /**
     * @return Collection<int, OrganizationNode>
     */
    public function getAllForSelect(): Collection
    {
        return OrganizationNode::orderBy('sort_order')->get(['id', 'position', 'parent_id']);
    }

    /**
     * @return Collection<int, OrganizationNode>
     */
    public function getAllForDesign(): Collection
    {
        return OrganizationNode::with(['teacher:id,name,nip', 'media'])
            ->orderBy('sort_order')
            ->get();
    }
}
