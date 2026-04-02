<?php

namespace App\Repositories;

use App\Models\ContactMessage;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class ContactMessageRepository implements ContactMessageRepositoryInterface
{
    /**
     * @param  array<string, mixed>  $filters
     * @return Collection<int, ContactMessage>
     */
    public function getAll(array $filters = []): Collection
    {
        $query = ContactMessage::latest();

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        return $query->get();
    }

    public function findById(int $id): ?ContactMessage
    {
        return ContactMessage::find($id);
    }

    public function getUnreadCount(): int
    {
        return ContactMessage::unread()->count();
    }

    /**
     * @return array{total: int, unread: int, this_month: int, this_year: int}
     */
    public function getStats(): array
    {
        $now = Carbon::now();

        return [
            'total' => ContactMessage::count(),
            'unread' => ContactMessage::unread()->count(),
            'this_month' => ContactMessage::whereMonth('created_at', $now->month)
                ->whereYear('created_at', $now->year)
                ->count(),
            'this_year' => ContactMessage::whereYear('created_at', $now->year)->count(),
        ];
    }
}
