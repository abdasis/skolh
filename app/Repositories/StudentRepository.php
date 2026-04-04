<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Enums\RegistrationStatus;
use App\Models\Registration;
use App\Models\Student;
use App\Repositories\Contracts\StudentRepositoryInterface;
use App\Services\Datatable\DatatableConfig;
use App\Services\Datatable\DatatableRequest;
use App\Services\Datatable\DatatableService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

final class StudentRepository implements StudentRepositoryInterface
{
    public function __construct(
        private readonly DatatableService $datatable,
    ) {}

    /**
     * @return LengthAwarePaginator<Student>
     */
    public function getPaginated(DatatableRequest $request): LengthAwarePaginator
    {
        $config = new DatatableConfig(
            searchableColumns: ['full_name', 'nis', 'nisn'],
            filterableColumns: [],
            sortableColumns: ['full_name', 'nis', 'enrollment_year', 'created_at'],
            defaultSort: ['column' => 'created_at', 'direction' => 'desc'],
        );

        $query = Student::query()
            ->filter($request->filters['status'] ?? null);

        return $this->datatable->paginate($query, $request, $config);
    }

    /**
     * @return Collection<int, Registration>
     */
    public function getAcceptedRegistrations(): Collection
    {
        return Registration::query()
            ->where('status', RegistrationStatus::Accepted)
            ->whereDoesntHave('student')
            ->with('admissionPeriod')
            ->get();
    }
}
