<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Curriculum\CreateCurriculumAction;
use App\Actions\Curriculum\DeleteCurriculumAction;
use App\Actions\Curriculum\UpdateCurriculumAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCurriculumRequest;
use App\Http\Requests\Admin\UpdateCurriculumRequest;
use App\Http\Resources\CurriculumResource;
use App\Models\Curriculum;
use App\Repositories\Contracts\CurriculumRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CurriculumController extends Controller
{
    public function __construct(
        private readonly CurriculumRepositoryInterface $repository,
        private readonly CreateCurriculumAction $createAction,
        private readonly UpdateCurriculumAction $updateAction,
        private readonly DeleteCurriculumAction $deleteAction,
    ) {}

    public function index(): Response
    {
        $curricula = $this->repository->getAll();
        $stats = $this->repository->getStats();

        return Inertia::render('admin/curricula/index', [
            'curricula' => CurriculumResource::collection($curricula),
            'stats' => $stats,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/curricula/create');
    }

    public function store(StoreCurriculumRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->route('admin.curricula.index')
            ->with('success', 'Kurikulum berhasil dibuat.');
    }

    public function edit(Curriculum $curriculum): Response
    {
        return Inertia::render('admin/curricula/edit', [
            'curriculum' => new CurriculumResource($curriculum),
        ]);
    }

    public function update(UpdateCurriculumRequest $request, Curriculum $curriculum): RedirectResponse
    {
        $this->updateAction->handle($curriculum, $request->validated());

        return redirect()->route('admin.curricula.index')
            ->with('success', 'Kurikulum berhasil diperbarui.');
    }

    public function destroy(Curriculum $curriculum): RedirectResponse
    {
        $this->deleteAction->handle($curriculum);

        return redirect()->route('admin.curricula.index')
            ->with('success', 'Kurikulum berhasil dihapus.');
    }
}
