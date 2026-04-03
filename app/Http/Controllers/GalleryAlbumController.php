<?php

namespace App\Http\Controllers;

use App\Http\Resources\GalleryAlbumResource;
use App\Models\GalleryAlbum;
use App\Repositories\Contracts\GalleryAlbumRepositoryInterface;
use Inertia\Inertia;
use Inertia\Response;

class GalleryAlbumController extends Controller
{
    public function __construct(
        private readonly GalleryAlbumRepositoryInterface $repository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('gallery/index', [
            'albums' => GalleryAlbumResource::collection($this->repository->getPublished()),
        ]);
    }

    public function show(GalleryAlbum $galleryAlbum): Response
    {
        abort_if($galleryAlbum->status->value !== 'published', 404);

        return Inertia::render('gallery/show', [
            'album' => new GalleryAlbumResource($galleryAlbum->load('images')),
        ]);
    }
}
