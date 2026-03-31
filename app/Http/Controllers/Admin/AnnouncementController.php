<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Announcement\CreateAnnouncementAction;
use App\Actions\Announcement\DeleteAnnouncementAction;
use App\Actions\Announcement\StoreAttachmentAction;
use App\Actions\Announcement\UpdateAnnouncementAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAnnouncementRequest;
use App\Http\Requests\Admin\UpdateAnnouncementRequest;
use App\Http\Resources\AnnouncementResource;
use App\Http\Resources\CategoryResource;
use App\Models\Announcement;
use App\Repositories\Contracts\AnnouncementRepositoryInterface;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    public function __construct(
        private readonly AnnouncementRepositoryInterface $repository,
        private readonly CategoryRepositoryInterface $categoryRepository,
        private readonly CreateAnnouncementAction $createAction,
        private readonly UpdateAnnouncementAction $updateAction,
        private readonly DeleteAnnouncementAction $deleteAction,
        private readonly StoreAttachmentAction $storeAttachmentAction,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/announcements/index', [
            'announcements' => AnnouncementResource::collection($this->repository->getAll()),
            'stats' => $this->repository->getStats(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/announcements/create', [
            'categories' => CategoryResource::collection($this->categoryRepository->getAll()),
        ]);
    }

    public function store(StoreAnnouncementRequest $request): RedirectResponse
    {
        $announcement = $this->createAction->handle($request->validated());

        foreach ($request->file('attachments', []) as $file) {
            $this->storeAttachmentAction->handle($announcement, $file);
        }

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dibuat.');
    }

    public function edit(Announcement $announcement): Response
    {
        return Inertia::render('admin/announcements/edit', [
            'announcement' => new AnnouncementResource($announcement->load(['categories', 'attachments'])),
            'categories' => CategoryResource::collection($this->categoryRepository->getAll()),
        ]);
    }

    public function update(UpdateAnnouncementRequest $request, Announcement $announcement): RedirectResponse
    {
        $this->updateAction->handle($announcement, $request->validated());

        foreach ($request->file('attachments', []) as $file) {
            $this->storeAttachmentAction->handle($announcement, $file);
        }

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil diperbarui.');
    }

    public function destroy(Announcement $announcement): RedirectResponse
    {
        $this->deleteAction->handle($announcement);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dihapus.');
    }
}
