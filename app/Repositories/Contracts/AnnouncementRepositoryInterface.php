<?php

namespace App\Repositories\Contracts;

use App\Models\Announcement;
use Illuminate\Support\Collection;

interface AnnouncementRepositoryInterface
{
    public function getAll(): Collection;

    public function getActive(): Collection;

    public function findBySlug(string $slug): ?Announcement;

    public function getLatest(int $limit = 5): Collection;

    public function getRelated(int $announcementId, array $categoryIds, int $limit = 4): Collection;

    /**
     * @return array{total: int, published: int, draft: int, with_attachments: int}
     */
    public function getStats(): array;
}
