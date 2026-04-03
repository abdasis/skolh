<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Admission\CreateCustomFieldAction;
use App\Actions\Admission\DeleteCustomFieldAction;
use App\Actions\Admission\ReorderCustomFieldsAction;
use App\Actions\Admission\UpdateCustomFieldAction;
use App\Enums\CustomFieldType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReorderCustomFieldsRequest;
use App\Http\Requests\Admin\StoreCustomFieldRequest;
use App\Http\Requests\Admin\UpdateCustomFieldRequest;
use App\Http\Resources\AdmissionPeriodResource;
use App\Http\Resources\CustomFieldResource;
use App\Models\AdmissionPeriod;
use App\Models\CustomField;
use App\Repositories\Contracts\AdmissionPeriodRepositoryInterface;
use App\Repositories\Contracts\CustomFieldRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CustomFieldController extends Controller
{
    public function __construct(
        private readonly AdmissionPeriodRepositoryInterface $periodRepository,
        private readonly CustomFieldRepositoryInterface $fieldRepository,
        private readonly CreateCustomFieldAction $createAction,
        private readonly UpdateCustomFieldAction $updateAction,
        private readonly DeleteCustomFieldAction $deleteAction,
        private readonly ReorderCustomFieldsAction $reorderAction,
    ) {}

    public function index(): Response
    {
        $activePeriod = $this->periodRepository->findActive();

        return Inertia::render('admin/custom-fields/index', [
            'activePeriod' => $activePeriod ? new AdmissionPeriodResource($activePeriod) : null,
            'fields' => $activePeriod
                ? CustomFieldResource::collection($this->fieldRepository->getByPeriod($activePeriod->id))
                : [],
            'periods' => AdmissionPeriodResource::collection($this->periodRepository->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/custom-fields/create', [
            'activePeriod' => new AdmissionPeriodResource($this->periodRepository->findActive()),
            'fieldTypes' => collect(CustomFieldType::cases())->map(fn ($t) => [
                'value' => $t->value,
                'label' => $t->label(),
            ]),
        ]);
    }

    public function store(StoreCustomFieldRequest $request): RedirectResponse
    {
        $period = AdmissionPeriod::findOrFail($request->validated('admission_period_id'));
        $this->createAction->handle($period, $request->validated());

        return redirect()->route('admin.custom-fields.index')
            ->with('success', 'Field berhasil ditambahkan.');
    }

    public function edit(CustomField $customField): Response
    {
        return Inertia::render('admin/custom-fields/edit', [
            'field' => new CustomFieldResource($customField),
            'fieldTypes' => collect(CustomFieldType::cases())->map(fn ($t) => [
                'value' => $t->value,
                'label' => $t->label(),
            ]),
        ]);
    }

    public function update(UpdateCustomFieldRequest $request, CustomField $customField): RedirectResponse
    {
        $this->updateAction->handle($customField, $request->validated());

        return redirect()->route('admin.custom-fields.index')
            ->with('success', 'Field berhasil diperbarui.');
    }

    public function destroy(CustomField $customField): RedirectResponse
    {
        $this->deleteAction->handle($customField);

        return redirect()->route('admin.custom-fields.index')
            ->with('success', 'Field berhasil dihapus.');
    }

    public function reorder(ReorderCustomFieldsRequest $request): RedirectResponse
    {
        /** @var array<int, array{id: int, sort_order: int}> $order */
        $order = $request->validated('order');
        $this->reorderAction->handle($order);

        return back()->with('success', 'Urutan field berhasil diperbarui.');
    }
}
