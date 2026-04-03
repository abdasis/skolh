<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Testimonial\CreateTestimonialAction;
use App\Actions\Testimonial\DeleteTestimonialAction;
use App\Actions\Testimonial\ReorderTestimonialsAction;
use App\Actions\Testimonial\UpdateTestimonialAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTestimonialRequest;
use App\Http\Requests\Admin\UpdateTestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use App\Repositories\Contracts\TestimonialRepositoryInterface;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function __construct(
        private readonly TestimonialRepositoryInterface $repository,
        private readonly CreateTestimonialAction $createAction,
        private readonly UpdateTestimonialAction $updateAction,
        private readonly DeleteTestimonialAction $deleteAction,
        private readonly ReorderTestimonialsAction $reorderAction,
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => TestimonialResource::collection(
                $this->repository->getPaginated(DatatableRequest::fromRequest($request))
            ),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/testimonials/create');
    }

    public function store(StoreTestimonialRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Data testimonial berhasil ditambahkan.');
    }

    public function edit(Testimonial $testimonial): Response
    {
        $testimonial->load('media');

        return Inertia::render('admin/testimonials/edit', [
            'testimonial' => new TestimonialResource($testimonial),
        ]);
    }

    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $this->updateAction->handle($testimonial, $request->validated());

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Data testimonial berhasil diperbarui.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $this->deleteAction->handle($testimonial);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Data testimonial berhasil dihapus.');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['required', 'integer', 'exists:testimonials,id'],
        ]);

        /** @var array<int, int> $order */
        $order = collect($validated['order'])
            ->mapWithKeys(fn (int $id, int $index) => [$id => $index])
            ->all();

        $this->reorderAction->handle($order);

        return back()->with('success', 'Urutan testimonial berhasil diperbarui.');
    }
}
