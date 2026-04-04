<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateVisiMisiRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VisiMisiController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('admin/visi-misi/show', [
            'vision' => SiteSetting::get('vision', ''),
            'mission' => SiteSetting::get('mission', ''),
        ]);
    }

    public function edit(): Response
    {
        return Inertia::render('admin/visi-misi/edit', [
            'vision' => SiteSetting::get('vision', ''),
            'mission' => SiteSetting::get('mission', ''),
        ]);
    }

    public function update(UpdateVisiMisiRequest $request): RedirectResponse
    {
        $data = $request->validated();

        SiteSetting::set('vision', $data['vision']);
        SiteSetting::set('mission', $data['mission']);

        return redirect()->route('admin.visi-misi.show')
            ->with('success', 'Visi dan misi berhasil diperbarui.');
    }
}
