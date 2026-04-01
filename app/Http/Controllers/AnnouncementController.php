<?php

namespace App\Http\Controllers;

use App\Enums\AnnouncementStatus;
use App\Http\Resources\AnnouncementCardResource;
use App\Http\Resources\AnnouncementResource;
use App\Repositories\Contracts\AnnouncementRepositoryInterface;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AnnouncementController extends Controller
{
    public function __construct(
        private readonly AnnouncementRepositoryInterface $repository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('announcements/index', [
            'announcements' => $this->repository->getActive(),
        ]);
    }

    public function show(string $slug): Response
    {
        $announcement = $this->repository->findBySlug($slug);

        if (
            ! $announcement ||
            $announcement->status !== AnnouncementStatus::Published ||
            ($announcement->expired_at && $announcement->expired_at->isPast())
        ) {
            throw new NotFoundHttpException;
        }

        $categoryIds = $announcement->categories->pluck('id')->toArray();

        return Inertia::render('announcements/show', [
            'announcement' => new AnnouncementResource($announcement),
            'latest' => AnnouncementCardResource::collection($this->repository->getLatest(5)),
            'related' => AnnouncementCardResource::collection($this->repository->getRelated($announcement->id, $categoryIds, 4)),
        ]);
    }
}
