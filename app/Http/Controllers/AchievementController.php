<?php

namespace App\Http\Controllers;

use App\Enums\AchievementCategory;
use App\Enums\AchievementLevel;
use App\Http\Resources\AchievementResource;
use App\Models\Achievement;
use App\Repositories\Contracts\AchievementRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function __construct(
        private readonly AchievementRepositoryInterface $repository,
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['category', 'level', 'year']);

        return Inertia::render('achievements/index', [
            'achievements' => AchievementResource::collection($this->repository->getPublic($filters)),
            'filters' => $filters,
            'categories' => collect(AchievementCategory::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
            'levels' => collect(AchievementLevel::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
        ]);
    }

    public function show(Achievement $achievement): Response
    {
        return Inertia::render('achievements/show', [
            'achievement' => new AchievementResource($achievement),
        ]);
    }
}
