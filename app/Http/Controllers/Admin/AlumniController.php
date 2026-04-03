<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Alumni\CreateAlumniAction;
use App\Actions\Alumni\DeleteAlumniAction;
use App\Actions\Alumni\ReorderAlumniAction;
use App\Actions\Alumni\UpdateAlumniAction;
use App\Enums\SocialPlatform;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAlumniRequest;
use App\Http\Requests\Admin\UpdateAlumniRequest;
use App\Http\Resources\AlumniResource;
use App\Models\Alumni;
use App\Repositories\Contracts\AlumniRepositoryInterface;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AlumniController extends Controller
{
    public function __construct(
        private readonly AlumniRepositoryInterface $repository,
        private readonly CreateAlumniAction $createAction,
        private readonly UpdateAlumniAction $updateAction,
        private readonly DeleteAlumniAction $deleteAction,
        private readonly ReorderAlumniAction $reorderAction,
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('admin/alumni/index', [
            'alumni' => AlumniResource::collection(
                $this->repository->getPaginated(DatatableRequest::fromRequest($request))
            ),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/alumni/create', [
            'socialPlatformOptions' => collect(SocialPlatform::cases())->map(fn ($p) => ['value' => $p->value, 'label' => $p->name]),
        ]);
    }

    public function store(StoreAlumniRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->route('admin.alumni.index')
            ->with('success', 'Data alumni berhasil ditambahkan.');
    }

    public function edit(Alumni $alumnus): Response
    {
        $alumnus->load('socials');

        return Inertia::render('admin/alumni/edit', [
            'alumni' => new AlumniResource($alumnus),
            'socialPlatformOptions' => collect(SocialPlatform::cases())->map(fn ($p) => ['value' => $p->value, 'label' => $p->name]),
        ]);
    }

    public function update(UpdateAlumniRequest $request, Alumni $alumnus): RedirectResponse
    {
        $this->updateAction->handle($alumnus, $request->validated());

        return redirect()->route('admin.alumni.index')
            ->with('success', 'Data alumni berhasil diperbarui.');
    }

    public function destroy(Alumni $alumnus): RedirectResponse
    {
        $this->deleteAction->handle($alumnus);

        return redirect()->route('admin.alumni.index')
            ->with('success', 'Data alumni berhasil dihapus.');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['required', 'integer', 'exists:alumni,id'],
        ]);

        /** @var array<int, int> $order */
        $order = collect($validated['order'])
            ->mapWithKeys(fn (int $id, int $index) => [$id => $index])
            ->all();

        $this->reorderAction->handle($order);

        return back()->with('success', 'Urutan alumni berhasil diperbarui.');
    }
}
