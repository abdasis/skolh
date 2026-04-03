<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Admission\ExportRegistrationsAction;
use App\Actions\Admission\UpdateRegistrationStatusAction;
use App\Enums\RegistrationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateRegistrationStatusRequest;
use App\Http\Resources\AdmissionPeriodResource;
use App\Http\Resources\RegistrationDetailResource;
use App\Http\Resources\RegistrationResource;
use App\Models\Registration;
use App\Repositories\Contracts\AdmissionPeriodRepositoryInterface;
use App\Repositories\Contracts\RegistrationRepositoryInterface;
use App\Services\RegistrationPdfService;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class RegistrationController extends Controller
{
    public function __construct(
        private readonly RegistrationRepositoryInterface $repository,
        private readonly AdmissionPeriodRepositoryInterface $periodRepository,
        private readonly UpdateRegistrationStatusAction $updateStatusAction,
        private readonly ExportRegistrationsAction $exportAction,
        private readonly RegistrationPdfService $pdfService,
    ) {}

    public function index(Request $request): InertiaResponse
    {
        $periodId = $request->input('period_id') ? (int) $request->input('period_id') : null;
        $activePeriod = $this->periodRepository->findActive();

        $registrations = $this->repository->getPaginated(
            DatatableRequest::fromRequest($request),
            $periodId ?? $activePeriod?->id,
        );

        $stats = $this->computeStats($periodId ?? $activePeriod?->id);

        return Inertia::render('admin/registrations/index', [
            'registrations' => RegistrationResource::collection($registrations),
            'periods' => ['data' => AdmissionPeriodResource::collection($this->periodRepository->getAll())],
            'activePeriod' => $activePeriod ? new AdmissionPeriodResource($activePeriod) : null,
            'stats' => $stats,
            'statusOptions' => collect(RegistrationStatus::cases())->map(fn ($s) => [
                'value' => $s->value,
                'label' => $s->label(),
            ]),
        ]);
    }

    public function show(Registration $registration): InertiaResponse
    {
        $registration->load(['admissionPeriod', 'customValues']);

        return Inertia::render('admin/registrations/show', [
            'registration' => new RegistrationDetailResource($registration),
            'statusOptions' => collect(RegistrationStatus::cases())->map(fn ($s) => [
                'value' => $s->value,
                'label' => $s->label(),
            ]),
        ]);
    }

    public function updateStatus(UpdateRegistrationStatusRequest $request, Registration $registration): RedirectResponse
    {
        $status = RegistrationStatus::from($request->validated('status'));
        $this->updateStatusAction->handle($registration, $status);

        return back()->with('success', 'Status pendaftaran berhasil diperbarui.');
    }

    public function downloadPdf(Registration $registration): Response
    {
        return $this->pdfService->generateReceipt($registration);
    }

    public function export(Request $request): BinaryFileResponse
    {
        $periodId = $request->input('period_id') ? (int) $request->input('period_id') : null;
        $period = $periodId
            ? $this->periodRepository->getAll()->firstWhere('id', $periodId)
            : $this->periodRepository->findActive();

        if (!$period) {
            abort(404, 'Periode tidak ditemukan.');
        }

        return $this->exportAction->handle($period);
    }

    /** @return array<string, int> */
    private function computeStats(?int $periodId): array
    {
        $query = Registration::query();

        if ($periodId) {
            $query->where('admission_period_id', $periodId);
        }

        return [
            'total' => $query->count(),
            'pending' => (clone $query)->where('status', RegistrationStatus::Pending)->count(),
            'verified' => (clone $query)->where('status', RegistrationStatus::Verified)->count(),
            'accepted' => (clone $query)->where('status', RegistrationStatus::Accepted)->count(),
            'rejected' => (clone $query)->where('status', RegistrationStatus::Rejected)->count(),
        ];
    }
}
