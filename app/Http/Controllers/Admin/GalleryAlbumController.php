<?php

namespace App\Http\Controllers\Admin;

use App\Actions\GalleryAlbum\CreateGalleryAlbumAction;
use App\Actions\GalleryAlbum\DeleteGalleryAlbumAction;
use App\Actions\GalleryAlbum\StoreGalleryImageAction;
use App\Actions\GalleryAlbum\UpdateGalleryAlbumAction;
use App\Enums\GalleryAlbumStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGalleryAlbumRequest;
use App\Http\Requests\Admin\UpdateGalleryAlbumRequest;
use App\Http\Resources\GalleryAlbumResource;
use App\Models\GalleryAlbum;
use App\Repositories\Contracts\GalleryAlbumRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryAlbumController extends Controller
{
    public function __construct(
        private readonly GalleryAlbumRepositoryInterface $repository,
        private readonly CreateGalleryAlbumAction $createAction,
        private readonly UpdateGalleryAlbumAction $updateAction,
        private readonly DeleteGalleryAlbumAction $deleteAction,
        private readonly StoreGalleryImageAction $storeGalleryImageAction,
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status']);

        return Inertia::render('admin/gallery-albums/index', [
            'albums' => GalleryAlbumResource::collection($this->repository->getAll()),
            'stats' => $this->repository->getStats(),
            'filters' => $filters,
            'statuses' => collect(GalleryAlbumStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->name]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/gallery-albums/create', [
            'statuses' => collect(GalleryAlbumStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->name]),
        ]);
    }

    public function store(StoreGalleryAlbumRequest $request): RedirectResponse
    {
        $album = $this->createAction->handle($request->validated());

        foreach ($request->validated('image_paths', []) as $path) {
            $this->storeGalleryImageAction->handle($album, $path);
        }

        return redirect()->route('admin.gallery-albums.index')
            ->with('success', 'Album galeri berhasil dibuat.');
    }

    public function edit(GalleryAlbum $galleryAlbum): Response
    {
        return Inertia::render('admin/gallery-albums/edit', [
            'album' => new GalleryAlbumResource($galleryAlbum->load('images')),
            'statuses' => collect(GalleryAlbumStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->name]),
        ]);
    }

    public function update(UpdateGalleryAlbumRequest $request, GalleryAlbum $galleryAlbum): RedirectResponse
    {
        $this->updateAction->handle($galleryAlbum, $request->validated());

        foreach ($request->validated('image_paths', []) as $path) {
            $this->storeGalleryImageAction->handle($galleryAlbum, $path);
        }

        return redirect()->route('admin.gallery-albums.index')
            ->with('success', 'Album galeri berhasil diperbarui.');
    }

    public function destroy(GalleryAlbum $galleryAlbum): RedirectResponse
    {
        $this->deleteAction->handle($galleryAlbum);

        return redirect()->route('admin.gallery-albums.index')
            ->with('success', 'Album galeri berhasil dihapus.');
    }
}
