<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ActivateThemeRequest;
use App\Services\ThemeRegistryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ThemeController extends Controller
{
    public function __construct(
        private readonly ThemeRegistryService $registry,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/themes/index', [
            'themes' => $this->registry->getAll(),
        ]);
    }

    public function activate(ActivateThemeRequest $request, string $slug): RedirectResponse
    {
        $themes = $this->registry->getAll();
        $theme = collect($themes)->firstWhere('slug', $slug);

        if (!$theme || !$theme['isValid']) {
            return redirect()->back()->with('error', 'Tema tidak valid atau komponen yang diperlukan tidak lengkap.');
        }

        $this->registry->activate($slug);

        return redirect()->back()->with('success', 'Tema berhasil diaktifkan.');
    }
}
