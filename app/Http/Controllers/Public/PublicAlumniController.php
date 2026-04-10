<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\AlumniResource;
use App\Repositories\Contracts\AlumniRepositoryInterface;
use App\Services\Datatable\DatatableRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class PublicAlumniController extends Controller
{
    public function __construct(
        private readonly AlumniRepositoryInterface $alumniRepository,
    ) {}

    public function __invoke(Request $request): Response
    {
        $datatableRequest = DatatableRequest::fromRequest(
            $request->merge(['per_page' => 12]),
        );

        return Inertia::render('alumni/index', [
            'alumni' => AlumniResource::collection(
                $this->alumniRepository->getPaginated($datatableRequest),
            ),
            'filters' => [
                'search' => $request->string('search')->value(),
            ],
        ]);
    }
}
