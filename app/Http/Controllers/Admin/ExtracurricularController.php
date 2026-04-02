<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Extracurricular\CreateExtracurricularAction;
use App\Actions\Extracurricular\DeleteExtracurricularAction;
use App\Actions\Extracurricular\UpdateExtracurricularAction;
use App\Enums\DayOfWeek;
use App\Enums\ExtracurricularCategory;
use App\Enums\ExtracurricularStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreExtracurricularRequest;
use App\Http\Requests\Admin\UpdateExtracurricularRequest;
use App\Http\Resources\ExtracurricularResource;
use App\Models\Extracurricular;
use App\Repositories\Contracts\ExtracurricularRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExtracurricularController extends Controller
{
    public function __construct(
        private readonly ExtracurricularRepositoryInterface $repository,
        private readonly CreateExtracurricularAction $createAction,
        private readonly UpdateExtracurricularAction $updateAction,
        private readonly DeleteExtracurricularAction $deleteAction,
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'category']);

        return Inertia::render('admin/extracurriculars/index', [
            'extracurriculars' => ExtracurricularResource::collection($this->repository->getAll()),
            'stats' => $this->repository->getStats(),
            'filters' => $filters,
            'categories' => collect(ExtracurricularCategory::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
            'statuses' => collect(ExtracurricularStatus::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/extracurriculars/create', [
            'categories' => collect(ExtracurricularCategory::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
            'days' => collect(DayOfWeek::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
            'statuses' => collect(ExtracurricularStatus::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
        ]);
    }

    public function store(StoreExtracurricularRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->route('admin.extracurriculars.index')
            ->with('success', 'Ekstrakurikuler berhasil ditambahkan.');
    }

    public function edit(Extracurricular $extracurricular): Response
    {
        return Inertia::render('admin/extracurriculars/edit', [
            'extracurricular' => new ExtracurricularResource($extracurricular),
            'categories' => collect(ExtracurricularCategory::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
            'days' => collect(DayOfWeek::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
            'statuses' => collect(ExtracurricularStatus::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
        ]);
    }

    public function update(UpdateExtracurricularRequest $request, Extracurricular $extracurricular): RedirectResponse
    {
        $this->updateAction->handle($extracurricular, $request->validated());

        return redirect()->route('admin.extracurriculars.index')
            ->with('success', 'Ekstrakurikuler berhasil diperbarui.');
    }

    public function destroy(Extracurricular $extracurricular): RedirectResponse
    {
        $this->deleteAction->handle($extracurricular);

        return redirect()->route('admin.extracurriculars.index')
            ->with('success', 'Ekstrakurikuler berhasil dihapus.');
    }
}
