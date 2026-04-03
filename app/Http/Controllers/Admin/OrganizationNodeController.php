<?php

namespace App\Http\Controllers\Admin;

use App\Actions\OrganizationNode\BulkUpdateOrganizationNodeDesignAction;
use App\Actions\OrganizationNode\CreateOrganizationNodeAction;
use App\Actions\OrganizationNode\DeleteOrganizationNodeAction;
use App\Actions\OrganizationNode\UpdateOrganizationNodeAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveOrganizationNodeDesignRequest;
use App\Http\Requests\Admin\StoreFromDesignOrganizationNodeRequest;
use App\Http\Requests\Admin\StoreOrganizationNodeRequest;
use App\Http\Requests\Admin\UpdateOrganizationNodeRequest;
use App\Http\Resources\OrganizationNodeResource;
use App\Models\OrganizationNode;
use App\Models\Teacher;
use App\Repositories\Contracts\OrganizationNodeRepositoryInterface;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationNodeController extends Controller
{
    public function __construct(
        private readonly OrganizationNodeRepositoryInterface $repository,
        private readonly CreateOrganizationNodeAction $createAction,
        private readonly UpdateOrganizationNodeAction $updateAction,
        private readonly DeleteOrganizationNodeAction $deleteAction,
        private readonly BulkUpdateOrganizationNodeDesignAction $bulkUpdateDesignAction,
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('admin/organization-nodes/index', [
            'nodes' => OrganizationNodeResource::collection(
                $this->repository->getPaginated(DatatableRequest::fromRequest($request))
            ),
            'stats' => $this->repository->getStats(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/organization-nodes/create', [
            'teachers' => Teacher::orderBy('name')->get(['id', 'name'])->map(fn (Teacher $t) => ['value' => $t->id, 'label' => $t->name]),
            'parentOptions' => OrganizationNodeResource::collection($this->repository->getAllForSelect()),
        ]);
    }

    public function store(StoreOrganizationNodeRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->route('admin.organization-nodes.index')
            ->with('success', 'Data node organisasi berhasil ditambahkan.');
    }

    public function storeFromDesign(StoreFromDesignOrganizationNodeRequest $request): RedirectResponse
    {
        $node = $this->createAction->handle($request->validated());

        $node->update([
            'branch_side' => $request->validated()['branch_side'] ?? 'center',
            'connector_from' => $request->validated()['connector_from'] ?? 'bottom',
            'position_x' => $request->validated()['position_x'] ?? null,
            'position_y' => $request->validated()['position_y'] ?? null,
        ]);

        return redirect()->route('admin.organization-nodes.design')
            ->with('success', 'Node berhasil ditambahkan ke struktur organisasi.');
    }

    public function edit(OrganizationNode $organization_node): Response
    {
        $organization_node->load('media');

        return Inertia::render('admin/organization-nodes/edit', [
            'node' => new OrganizationNodeResource($organization_node),
            'teachers' => Teacher::orderBy('name')->get(['id', 'name'])->map(fn (Teacher $t) => ['value' => $t->id, 'label' => $t->name]),
            'parentOptions' => OrganizationNodeResource::collection(
                $this->repository->getAllForSelect()
            ),
        ]);
    }

    public function update(UpdateOrganizationNodeRequest $request, OrganizationNode $organization_node): RedirectResponse
    {
        $this->updateAction->handle($organization_node, $request->validated());

        return redirect()->route('admin.organization-nodes.index')
            ->with('success', 'Data node organisasi berhasil diperbarui.');
    }

    public function destroy(OrganizationNode $organization_node): RedirectResponse
    {
        $this->deleteAction->handle($organization_node);

        return redirect()->route('admin.organization-nodes.index')
            ->with('success', 'Data node organisasi berhasil dihapus.');
    }

    public function design(): Response
    {
        return Inertia::render('admin/organization-nodes/design', [
            'nodes' => OrganizationNodeResource::collection($this->repository->getAllForDesign()),
        ]);
    }

    public function saveDesign(SaveOrganizationNodeDesignRequest $request): RedirectResponse
    {
        $this->bulkUpdateDesignAction->handle($request->validated()['nodes']);

        return redirect()->route('admin.organization-nodes.design')
            ->with('success', 'Struktur organisasi berhasil disimpan.');
    }
}
