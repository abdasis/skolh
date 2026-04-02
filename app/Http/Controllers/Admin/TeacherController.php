<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Teacher\CreateTeacherAction;
use App\Actions\Teacher\DeleteTeacherAction;
use App\Actions\Teacher\UpdateTeacherAction;
use App\Enums\Gender;
use App\Enums\TeacherStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTeacherRequest;
use App\Http\Requests\Admin\UpdateTeacherRequest;
use App\Http\Resources\TeacherResource;
use App\Models\Teacher;
use App\Repositories\Contracts\TeacherRepositoryInterface;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    public function __construct(
        private readonly TeacherRepositoryInterface $repository,
        private readonly CreateTeacherAction $createAction,
        private readonly UpdateTeacherAction $updateAction,
        private readonly DeleteTeacherAction $deleteAction,
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('admin/teachers/index', [
            'teachers' => TeacherResource::collection($this->repository->getPaginated(DatatableRequest::fromRequest($request))),
            'stats' => $this->repository->getStats(),
            'statusOptions' => collect(TeacherStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->name]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/teachers/create', [
            'statusOptions' => collect(TeacherStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->name]),
            'genderOptions' => collect(Gender::cases())->map(fn ($g) => ['value' => $g->value, 'label' => $g->name]),
        ]);
    }

    public function store(StoreTeacherRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Data guru berhasil ditambahkan.');
    }

    public function edit(Teacher $teacher): Response
    {
        $teacher->load('media');

        return Inertia::render('admin/teachers/edit', [
            'teacher' => new TeacherResource($teacher),
            'statusOptions' => collect(TeacherStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->name]),
            'genderOptions' => collect(Gender::cases())->map(fn ($g) => ['value' => $g->value, 'label' => $g->name]),
        ]);
    }

    public function update(UpdateTeacherRequest $request, Teacher $teacher): RedirectResponse
    {
        $this->updateAction->handle($teacher, $request->validated());

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Data guru berhasil diperbarui.');
    }

    public function destroy(Teacher $teacher): RedirectResponse
    {
        $this->deleteAction->handle($teacher);

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Data guru berhasil dihapus.');
    }
}
