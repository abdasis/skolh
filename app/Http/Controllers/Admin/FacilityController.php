<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFacilityRequest;
use App\Http\Requests\Admin\UpdateFacilityRequest;
use App\Models\Facility;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function index(): Response
    {
        $facilities = Facility::latest()->get();

        $stats = [
            'total' => $facilities->count(),
            'public' => $facilities->where('status', 'public')->count(),
            'draft' => $facilities->where('status', 'draft')->count(),
            'with_image' => $facilities->whereNotNull('featured_image')->count(),
        ];

        return Inertia::render('admin/facilities/index', [
            'facilities' => $facilities,
            'stats' => $stats,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/facilities/create');
    }

    public function store(StoreFacilityRequest $request): RedirectResponse
    {
        Facility::create($request->validated());

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Fasilitas berhasil dibuat.');
    }

    public function show(Facility $facility): RedirectResponse
    {
        return redirect()->route('admin.facilities.index');
    }

    public function edit(Facility $facility): Response
    {
        return Inertia::render('admin/facilities/edit', [
            'facility' => $facility,
        ]);
    }

    public function update(UpdateFacilityRequest $request, Facility $facility): RedirectResponse
    {
        $facility->update($request->validated());

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Fasilitas berhasil diperbarui.');
    }

    public function destroy(Facility $facility): RedirectResponse
    {
        $facility->delete();

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Fasilitas berhasil dihapus.');
    }
}
