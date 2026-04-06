<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstallRequest;
use App\Models\User;
use App\Services\InstallerService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class InstallController extends Controller
{
    public function __construct(private readonly InstallerService $installerService) {}

    public function index(): Response|RedirectResponse
    {
        if (User::exists()) {
            return redirect('/');
        }

        $seeders = collect(config('installer.seeders', []))
            ->map(fn (array $seeder, string $key) => [
                'key' => $key,
                'label' => $seeder['label'],
                'description' => $seeder['description'],
                'group' => $seeder['group'],
            ])
            ->values()
            ->toArray();

        return Inertia::render('install', [
            'seeders' => $seeders,
        ]);
    }

    public function store(InstallRequest $request): RedirectResponse
    {
        if (User::exists()) {
            return redirect('/');
        }

        try {
            $user = $this->installerService->install($request->validated());
            Auth::login($user);

            return redirect('/dashboard')->with('success', 'Instalasi berhasil! Selamat datang di dashboard.');
        } catch (Throwable $e) {
            return back()->withErrors(['general' => 'Instalasi gagal: ' . $e->getMessage()]);
        }
    }
}
