<?php

namespace App\Repositories;

use App\Enums\AchievementLevel;
use App\Models\Achievement;
use App\Repositories\Contracts\AchievementRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class AchievementRepository implements AchievementRepositoryInterface
{
    public function getAll(): Collection
    {
        return Achievement::latest()->get();
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<Achievement>
     */
    public function getPaginated(array $filters = []): LengthAwarePaginator
    {
        $query = Achievement::latest();

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where('title', 'like', "%{$search}%");
        }

        if (! empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        if (! empty($filters['level'])) {
            $query->where('level', $filters['level']);
        }

        if (! empty($filters['year'])) {
            $query->where('year', $filters['year']);
        }

        return $query->paginate(15)->withQueryString();
    }

    /**
     * @return array{total: int, by_level: array{district: int, province: int, national: int, international: int}}
     */
    public function getStats(): array
    {
        $all = Achievement::all();

        return [
            'total' => $all->count(),
            'by_level' => [
                'district' => $all->filter(fn (Achievement $a) => $a->level === AchievementLevel::District)->count(),
                'province' => $all->filter(fn (Achievement $a) => $a->level === AchievementLevel::Province)->count(),
                'national' => $all->filter(fn (Achievement $a) => $a->level === AchievementLevel::National)->count(),
                'international' => $all->filter(fn (Achievement $a) => $a->level === AchievementLevel::International)->count(),
            ],
        ];
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<Achievement>
     */
    public function getPublic(array $filters = []): LengthAwarePaginator
    {
        $query = Achievement::latest();

        if (! empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        if (! empty($filters['level'])) {
            $query->where('level', $filters['level']);
        }

        if (! empty($filters['year'])) {
            $query->where('year', $filters['year']);
        }

        return $query->paginate(12)->withQueryString();
    }
}
