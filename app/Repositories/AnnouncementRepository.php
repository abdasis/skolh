<?php

namespace App\Repositories;

use App\Enums\AnnouncementStatus;
use App\Models\Announcement;
use App\Repositories\Contracts\AnnouncementRepositoryInterface;
use Illuminate\Support\Collection;

class AnnouncementRepository implements AnnouncementRepositoryInterface
{
    public function getAll(): Collection
    {
        return Announcement::with(['categories', 'attachments'])->latest()->get();
    }

    public function getActive(): Collection
    {
        return Announcement::active()->with('categories')->latest()->get();
    }

    public function findBySlug(string $slug): ?Announcement
    {
        return Announcement::with(['categories', 'attachments'])
            ->where('slug', $slug)
            ->first();
    }

    public function getLatest(int $limit = 5): Collection
    {
        return Announcement::active()->with('categories')->latest()->limit($limit)->get();
    }

    public function getRelated(int $announcementId, array $categoryIds, int $limit = 4): Collection
    {
        return Announcement::active()
            ->with('categories')
            ->where('id', '!=', $announcementId)
            ->whereHas('categories', fn ($q) => $q->whereIn('categories.id', $categoryIds))
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * @return array{total: int, published: int, draft: int, with_attachments: int}
     */
    public function getStats(): array
    {
        $all = Announcement::withCount('attachments')->get();

        return [
            'total' => $all->count(),
            'published' => $all->filter(fn (Announcement $a) => $a->status === AnnouncementStatus::Published)->count(),
            'draft' => $all->filter(fn (Announcement $a) => $a->status === AnnouncementStatus::Draft)->count(),
            'with_attachments' => $all->filter(fn (Announcement $a) => $a->attachments_count > 0)->count(),
        ];
    }
}
