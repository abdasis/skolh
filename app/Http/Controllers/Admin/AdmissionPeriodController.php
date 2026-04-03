<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Admission\CreateAdmissionPeriodAction;
use App\Actions\Admission\UpdateAdmissionPeriodAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAdmissionPeriodRequest;
use App\Http\Requests\Admin\UpdateAdmissionPeriodRequest;
use App\Http\Resources\AdmissionPeriodResource;
use App\Models\AdmissionPeriod;
use App\Repositories\Contracts\AdmissionPeriodRepositoryInterface;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdmissionPeriodController extends Controller
{
    public function __construct(
        private readonly AdmissionPeriodRepositoryInterface $repository,
        private readonly CreateAdmissionPeriodAction $createAction,
        private readonly UpdateAdmissionPeriodAction $updateAction,
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('admin/admission-periods/index', [
            'periods' => AdmissionPeriodResource::collection(
                $this->repository->getPaginated(DatatableRequest::fromRequest($request))
            ),
            'activePeriod' => ($active = $this->repository->findActive()) ? new AdmissionPeriodResource($active) : null,
        ]);
    }

    public function store(StoreAdmissionPeriodRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->route('admin.admission-periods.index')
            ->with('success', 'Periode SPMB berhasil ditambahkan.');
    }

    public function update(UpdateAdmissionPeriodRequest $request, AdmissionPeriod $admissionPeriod): RedirectResponse
    {
        $this->updateAction->handle($admissionPeriod, $request->validated());

        return redirect()->route('admin.admission-periods.index')
            ->with('success', 'Periode SPMB berhasil diperbarui.');
    }
}
