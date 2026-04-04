<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Student\ConvertFromSpmbAction;
use App\Actions\Student\CreateStudentAction;
use App\Actions\Student\DeleteStudentAction;
use App\Actions\Student\UpdateStudentAction;
use App\Enums\StudentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ConvertFromSpmbRequest;
use App\Http\Requests\Admin\StoreStudentRequest;
use App\Http\Requests\Admin\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Repositories\Contracts\StudentRepositoryInterface;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function __construct(
        private readonly StudentRepositoryInterface $repository,
        private readonly CreateStudentAction $createAction,
        private readonly UpdateStudentAction $updateAction,
        private readonly DeleteStudentAction $deleteAction,
        private readonly ConvertFromSpmbAction $convertAction,
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('admin/students/index', [
            'students' => StudentResource::collection(
                $this->repository->getPaginated(DatatableRequest::fromRequest($request))
            ),
            'filters' => [
                'search' => $request->input('search'),
                'status' => $request->input('status'),
            ],
        ]);
    }

    public function acceptedRegistrations(): JsonResponse
    {
        $registrations = $this->repository->getAcceptedRegistrations();

        return response()->json([
            'data' => $registrations->map(fn ($reg) => [
                'id' => $reg->id,
                'registration_number' => $reg->registration_number,
                'full_name' => $reg->full_name,
                'academic_year' => $reg->admissionPeriod?->academic_year ?? '-',
            ])->values()->all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/students/create', [
            'statusOptions' => collect(StudentStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->label()]),
        ]);
    }

    public function store(StoreStudentRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->route('admin.students.index')
            ->with('success', 'Data siswa berhasil ditambahkan.');
    }

    public function convertFromSpmb(ConvertFromSpmbRequest $request): RedirectResponse
    {
        $student = $this->convertAction->handle((int) $request->validated('registration_id'));

        return redirect()->route('admin.students.edit', $student)
            ->with('success', 'Siswa berhasil dikonversi dari pendaftaran SPMB. Silakan lengkapi data.');
    }

    public function edit(Student $student): Response
    {
        return Inertia::render('admin/students/edit', [
            'student' => new StudentResource($student),
            'statusOptions' => collect(StudentStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->label()]),
        ]);
    }

    public function update(UpdateStudentRequest $request, Student $student): RedirectResponse
    {
        $this->updateAction->handle($student, $request->validated());

        return redirect()->route('admin.students.index')
            ->with('success', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Student $student): RedirectResponse
    {
        $this->deleteAction->handle($student);

        return redirect()->route('admin.students.index')
            ->with('success', 'Data siswa berhasil dihapus.');
    }
}
