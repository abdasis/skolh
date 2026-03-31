<?php

namespace App\Http\Controllers;

use App\Enums\AnnouncementStatus;
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

        return Inertia::render('announcements/show', [
            'announcement' => new AnnouncementResource($announcement),
        ]);
    }
}
