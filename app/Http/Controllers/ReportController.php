<?php

namespace App\Http\Controllers;

use App\Actions\Report\CreateReportAction;
use App\Http\Requests\StoreReportRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(
        private readonly CreateReportAction $createAction,
    ) {}

    public function create(): Response
    {
        return Inertia::render('reports/submit');
    }

    public function store(StoreReportRequest $request): RedirectResponse
    {
        $report = $this->createAction->handle($request->validated());

        return redirect()->route('reports.create')
            ->with('success', 'Laporan berhasil dikirim.')
            ->with('reference_code', $report->reference_code);
    }
}
