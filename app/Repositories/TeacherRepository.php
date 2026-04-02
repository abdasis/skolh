<?php

namespace App\Repositories;

use App\Enums\TeacherStatus;
use App\Models\Teacher;
use App\Repositories\Contracts\TeacherRepositoryInterface;
use App\Services\Datatable\DatatableConfig;
use App\Services\Datatable\DatatableRequest;
use App\Services\Datatable\DatatableService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TeacherRepository implements TeacherRepositoryInterface
{
    public function __construct(
        private readonly DatatableService $datatable,
    ) {}

    /**
     * @return LengthAwarePaginator<Teacher>
     */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator
    {
        $config = new DatatableConfig(
            searchableColumns: ['name', 'email', 'nip'],
            filterableColumns: ['status', 'gender'],
            sortableColumns: ['name', 'nip', 'joined_at', 'created_at'],
            defaultSort: ['column' => 'created_at', 'direction' => 'desc'],
        );

        return $this->datatable->paginate(Teacher::query()->with('media'), $request, $config);
    }

    /**
     * @return array{total: int, active: int, inactive: int}
     */
    public function getStats(): array
    {
        $all = Teacher::all();

        return [
            'total' => $all->count(),
            'active' => $all->filter(fn (Teacher $t) => $t->status === TeacherStatus::Active)->count(),
            'inactive' => $all->filter(fn (Teacher $t) => $t->status === TeacherStatus::Inactive)->count(),
        ];
    }
}
