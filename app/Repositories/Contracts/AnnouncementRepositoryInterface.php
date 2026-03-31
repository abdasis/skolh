<?php

namespace App\Repositories\Contracts;

use App\Models\Announcement;
use Illuminate\Support\Collection;

interface AnnouncementRepositoryInterface
{
    public function getAll(): Collection;

    public function getActive(): Collection;

    public function findBySlug(string $slug): ?Announcement;

    /**
     * @return array{total: int, published: int, draft: int, with_attachments: int}
     */
    public function getStats(): array;
}
