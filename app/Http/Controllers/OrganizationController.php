<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrganizationNodeResource;
use App\Repositories\Contracts\OrganizationNodeRepositoryInterface;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    public function __construct(
        private readonly OrganizationNodeRepositoryInterface $repository,
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('public/organization', [
            'nodes' => OrganizationNodeResource::collection($this->repository->getAllForTree()),
        ]);
    }
}
