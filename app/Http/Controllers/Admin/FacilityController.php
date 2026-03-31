<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFacilityRequest;
use App\Http\Requests\Admin\UpdateFacilityRequest;
use App\Models\Facility;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
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
        $data = $request->validated();

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('facilities', 'public');
        }

        Facility::create($data);

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
        $data = $request->validated();

        if ($request->hasFile('featured_image')) {
            if ($facility->featured_image) {
                Storage::disk('public')->delete($facility->featured_image);
            }
            $data['featured_image'] = $request->file('featured_image')->store('facilities', 'public');
        } else {
            unset($data['featured_image']);
        }

        $facility->update($data);

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Fasilitas berhasil diperbarui.');
    }

    public function destroy(Facility $facility): RedirectResponse
    {
        if ($facility->featured_image) {
            Storage::disk('public')->delete($facility->featured_image);
        }

        $facility->delete();

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Fasilitas berhasil dihapus.');
    }
}
