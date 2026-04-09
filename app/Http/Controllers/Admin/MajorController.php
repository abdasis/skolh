<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMajorRequest;
use App\Http\Requests\Admin\UpdateMajorRequest;
use App\Models\Major;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MajorController extends Controller
{
    public function index(): Response
    {
        $majors = Major::latest()->get();

        $stats = [
            'total' => $majors->count(),
            'public' => $majors->where('status', 'public')->count(),
            'draft' => $majors->where('status', 'draft')->count(),
            'with_image' => $majors->whereNotNull('featured_image')->count(),
        ];

        return Inertia::render('admin/majors/index', [
            'majors' => $majors,
            'stats' => $stats,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/majors/create');
    }

    public function store(StoreMajorRequest $request): RedirectResponse
    {
        Major::create($request->validated());

        return redirect()->route('admin.majors.index')
            ->with('success', 'Jurusan berhasil dibuat.');
    }

    public function edit(Major $major): Response
    {
        return Inertia::render('admin/majors/edit', [
            'major' => $major,
        ]);
    }

    public function update(UpdateMajorRequest $request, Major $major): RedirectResponse
    {
        $major->update($request->validated());

        return redirect()->route('admin.majors.index')
            ->with('success', 'Jurusan berhasil diperbarui.');
    }

    public function destroy(Major $major): RedirectResponse
    {
        $major->delete();

        return redirect()->route('admin.majors.index')
            ->with('success', 'Jurusan berhasil dihapus.');
    }
}
