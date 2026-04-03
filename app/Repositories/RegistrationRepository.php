<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Registration;
use App\Repositories\Contracts\RegistrationRepositoryInterface;
use App\Services\Datatable\DatatableConfig;
use App\Services\Datatable\DatatableRequest;
use App\Services\Datatable\DatatableService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class RegistrationRepository implements RegistrationRepositoryInterface
{
    public function __construct(
        private readonly DatatableService $datatable,
    ) {}

    /** @return LengthAwarePaginator<Registration> */
    public function getPaginated(DatatableRequest $request, ?int $periodId = null): LengthAwarePaginator
    {
        $config = new DatatableConfig(
            searchableColumns: ['full_name', 'nik', 'nisn', 'registration_number'],
            filterableColumns: ['status', 'admission_period_id'],
            sortableColumns: ['full_name', 'registration_number', 'status', 'created_at'],
            defaultSort: ['column' => 'created_at', 'direction' => 'desc'],
        );

        $query = Registration::query()->with('admissionPeriod');

        if ($periodId !== null) {
            $query->where('admission_period_id', $periodId);
        }

        return $this->datatable->paginate($query, $request, $config);
    }

    public function findByRegistrationNumber(string $registrationNumber): ?Registration
    {
        return Registration::query()
            ->with(['admissionPeriod', 'customValues'])
            ->where('registration_number', $registrationNumber)
            ->first();
    }
}
