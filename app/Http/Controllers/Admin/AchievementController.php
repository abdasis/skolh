<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Achievement\CreateAchievementAction;
use App\Actions\Achievement\DeleteAchievementAction;
use App\Actions\Achievement\UpdateAchievementAction;
use App\Enums\AchievementCategory;
use App\Enums\AchievementLevel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAchievementRequest;
use App\Http\Requests\Admin\UpdateAchievementRequest;
use App\Http\Resources\AchievementResource;
use App\Models\Achievement;
use App\Repositories\Contracts\AchievementRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function __construct(
        private readonly AchievementRepositoryInterface $repository,
        private readonly CreateAchievementAction $createAction,
        private readonly UpdateAchievementAction $updateAction,
        private readonly DeleteAchievementAction $deleteAction,
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'category', 'level', 'year']);

        return Inertia::render('admin/achievements/index', [
            'achievements' => AchievementResource::collection($this->repository->getPaginated($filters)),
            'stats' => $this->repository->getStats(),
            'filters' => $filters,
            'categories' => collect(AchievementCategory::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
            'levels' => collect(AchievementLevel::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/achievements/create', [
            'categories' => collect(AchievementCategory::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
            'levels' => collect(AchievementLevel::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
        ]);
    }

    public function store(StoreAchievementRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->route('admin.achievements.index')
            ->with('success', 'Prestasi berhasil ditambahkan.');
    }

    public function edit(Achievement $achievement): Response
    {
        return Inertia::render('admin/achievements/edit', [
            'achievement' => new AchievementResource($achievement),
            'categories' => collect(AchievementCategory::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
            'levels' => collect(AchievementLevel::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
        ]);
    }

    public function update(UpdateAchievementRequest $request, Achievement $achievement): RedirectResponse
    {
        $this->updateAction->handle($achievement, $request->validated());

        return redirect()->route('admin.achievements.index')
            ->with('success', 'Prestasi berhasil diperbarui.');
    }

    public function destroy(Achievement $achievement): RedirectResponse
    {
        $this->deleteAction->handle($achievement);

        return redirect()->route('admin.achievements.index')
            ->with('success', 'Prestasi berhasil dihapus.');
    }
}
