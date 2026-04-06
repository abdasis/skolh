<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Report\UpdateReportStatusAction;
use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateReportStatusRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use App\Repositories\Contracts\ReportRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(
        private readonly ReportRepositoryInterface $repository,
        private readonly UpdateReportStatusAction $updateStatusAction,
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['status', 'category', 'date_from', 'date_to', 'search']);

        return Inertia::render('admin/reports/index', [
            'reports' => ReportResource::collection($this->repository->getPaginated($filters)),
            'stats' => $this->repository->getStats(),
            'filters' => $filters,
            'statusOptions' => collect(ReportStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->label()]),
        ]);
    }

    public function show(Report $report): Response
    {
        $report->load(['statusHistories.changedBy']);

        return Inertia::render('admin/reports/show', [
            'report' => new ReportResource($report),
            'statusOptions' => collect(ReportStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->label()]),
        ]);
    }

    public function update(UpdateReportStatusRequest $request, Report $report): RedirectResponse
    {
        $this->updateStatusAction->handle(
            $report,
            ReportStatus::from($request->validated('status')),
            $request->validated('note'),
            $request->user(),
        );

        return redirect()->route('admin.reports.show', $report)
            ->with('success', 'Status laporan berhasil diperbarui.');
    }
}
