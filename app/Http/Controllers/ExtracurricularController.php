<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExtracurricularResource;
use App\Models\Extracurricular;
use App\Repositories\Contracts\ExtracurricularRepositoryInterface;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class ExtracurricularController extends Controller
{
    public function __construct(
        private readonly ExtracurricularRepositoryInterface $repository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('extracurriculars/index', [
            'extracurriculars' => ExtracurricularResource::collection($this->repository->getActive()),
        ]);
    }

    public function show(Extracurricular $extracurricular): Response|HttpResponse
    {
        if ($extracurricular->status->value !== 'active') {
            abort(404);
        }

        return Inertia::render('extracurriculars/show', [
            'extracurricular' => new ExtracurricularResource($extracurricular),
        ]);
    }
}
