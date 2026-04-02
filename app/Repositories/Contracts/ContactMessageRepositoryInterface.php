<?php

namespace App\Repositories\Contracts;

use App\Models\ContactMessage;
use Illuminate\Support\Collection;

interface ContactMessageRepositoryInterface
{
    /**
     * @param  array<string, mixed>  $filters
     * @return Collection<int, ContactMessage>
     */
    public function getAll(array $filters = []): Collection;

    public function findById(int $id): ?ContactMessage;

    public function getUnreadCount(): int;

    /**
     * @return array{total: int, unread: int, this_month: int, this_year: int}
     */
    public function getStats(): array;
}
