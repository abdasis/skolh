<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSchoolHistoryRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SchoolHistoryController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('admin/school-history/show', [
            'history' => SiteSetting::get('school_history', ''),
        ]);
    }

    public function edit(): Response
    {
        return Inertia::render('admin/school-history/edit', [
            'history' => SiteSetting::get('school_history', ''),
        ]);
    }

    public function update(UpdateSchoolHistoryRequest $request): RedirectResponse
    {
        $data = $request->validated();

        SiteSetting::set('school_history', $data['history']);

        return redirect()->route('admin.school-history.show')
            ->with('success', 'Sejarah sekolah berhasil diperbarui.');
    }
}
