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

    public function show(Curriculum $curriculum): Response
    {
        abort_if($curriculum->status === CurriculumStatus::Draft, 404);

        return Inertia::render('curricula/show', [
            'curriculum' => new CurriculumResource($curriculum),
        ]);
    }
}
