<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Actions\Admission\SubmitRegistrationAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SubmitRegistrationRequest;
use App\Http\Resources\AdmissionPeriodResource;
use App\Http\Resources\CustomFieldResource;
use App\Models\Registration;
use App\Repositories\Contracts\AdmissionPeriodRepositoryInterface;
use App\Repositories\Contracts\RegistrationRepositoryInterface;
use App\Services\RegistrationPdfService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AdmissionController extends Controller
{
    public function __construct(
        private readonly AdmissionPeriodRepositoryInterface $periodRepository,
        private readonly RegistrationRepositoryInterface $registrationRepository,
        private readonly SubmitRegistrationAction $submitAction,
        private readonly RegistrationPdfService $pdfService,
    ) {}

    /**
     * Tampilkan formulir pendaftaran atau halaman tutup jika SPMB tidak aktif.
     */
    public function index(): InertiaResponse
    {
        $period = $this->periodRepository->findOpen();

        if (!$period) {
            $nextPeriod = $this->periodRepository->findActive();

            return Inertia::render('admission/closed', [
                'nextPeriod' => $nextPeriod ? new AdmissionPeriodResource($nextPeriod) : null,
            ]);
        }

        return Inertia::render('admission/register', [
            'period' => new AdmissionPeriodResource($period),
            'customFields' => ['data' => CustomFieldResource::collection($period->customFields)],
        ]);
    }

    /**
     * Simpan data pendaftaran baru.
     */
    public function store(SubmitRegistrationRequest $request): RedirectResponse
    {
        $period = $this->periodRepository->findOpen();

        if (!$period) {
            return redirect()->route('admission.index')
                ->with('error', 'Periode pendaftaran sedang tidak aktif.');
        }

        $registration = $this->submitAction->handle($period, $request->validated() + $request->allFiles());

        return redirect()->route('admission.success', ['registration' => $registration->registration_number]);
    }

    /**
     * Halaman sukses pendaftaran dengan nomor pendaftaran.
     */
    public function success(Registration $registration): InertiaResponse
    {
        $registration->load('admissionPeriod');

        return Inertia::render('admission/success', [
            'registration' => [
                'id' => $registration->id,
                'registration_number' => $registration->registration_number,
                'full_name' => $registration->full_name,
                'status' => $registration->status->value,
                'academic_year' => $registration->admissionPeriod->academic_year,
                'created_at' => $registration->created_at,
            ],
        ]);
    }

    /**
     * Unduh PDF bukti pendaftaran.
     */
    public function downloadPdf(Registration $registration): Response
    {
        return $this->pdfService->generateReceipt($registration);
    }

    /**
     * Tampilkan form cek status pendaftaran.
     */
    public function check(): InertiaResponse
    {
        return Inertia::render('admission/check', [
            'result' => null,
        ]);
    }

    /**
     * Proses cek status berdasarkan nomor pendaftaran.
     */
    public function checkStatus(Request $request): InertiaResponse
    {
        $validated = $request->validate([
            'registration_number' => ['required', 'string'],
        ]);

        $registration = $this->registrationRepository->findByRegistrationNumber($validated['registration_number']);

        return Inertia::render('admission/check', [
            'result' => $registration ? [
                'registration_number' => $registration->registration_number,
                'full_name' => $registration->full_name,
                'status' => $registration->status->value,
                'academic_year' => $registration->admissionPeriod->academic_year,
                'created_at' => $registration->created_at,
            ] : null,
            'not_found' => $registration === null,
            'query' => $validated['registration_number'],
        ]);
    }
}
