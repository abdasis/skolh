<?php

namespace App\Http\Controllers;

use App\Enums\CurriculumStatus;
use App\Http\Resources\CurriculumResource;
use App\Models\Curriculum;
use App\Repositories\Contracts\CurriculumRepositoryInterface;
use Inertia\Inertia;
use Inertia\Response;

class CurriculumController extends Controller
{
    public function __construct(
        private readonly CurriculumRepositoryInterface $repository,
    ) {}

    public function index(): Response
    {
        $curricula = Curriculum::query()
            ->where('status', CurriculumStatus::Active)
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'description', 'icon'])
            ->map(fn (Curriculum $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'slug' => $item->slug,
                'description' => $item->description,
                'icon' => $item->icon,
            ]);

        return Inertia::render('curricula/index', [
            'curricula' => $curricula,
        ]);
    }

    public function show(Curriculum $curriculum): Response
    {
        abort_if($curriculum->status === CurriculumStatus::Draft, 404);

        $others = Curriculum::query()
            ->where('status', CurriculumStatus::Active)
            ->where('id', '!=', $curriculum->id)
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'description', 'icon'])
            ->map(fn (Curriculum $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'slug' => $item->slug,
                'description' => $item->description,
                'icon' => $item->icon,
            ]);

        return Inertia::render('curricula/show', [
            'curriculum' => new CurriculumResource($curriculum),
            'others' => $others,
        ]);
    }
}
