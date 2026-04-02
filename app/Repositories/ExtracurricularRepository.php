<?php

namespace App\Repositories;

use App\Enums\ExtracurricularStatus;
use App\Models\Extracurricular;
use App\Repositories\Contracts\ExtracurricularRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ExtracurricularRepository implements ExtracurricularRepositoryInterface
{
    public function getAll(): Collection
    {
        return Extracurricular::latest()->get();
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<Extracurricular>
     */
    public function getPaginated(array $filters = []): LengthAwarePaginator
    {
        $query = Extracurricular::latest();

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where('title', 'like', "%{$search}%");
        }

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        return $query->paginate(15)->withQueryString();
    }

    public function getActive(): Collection
    {
        return Extracurricular::active()->latest()->get();
    }

    public function findBySlug(string $slug): ?Extracurricular
    {
        return Extracurricular::where('slug', $slug)->first();
    }

    /**
     * @return array{total: int, active: int, draft: int, by_category: array<string, int>}
     */
    public function getStats(): array
    {
        $all = Extracurricular::all();

        return [
            'total' => $all->count(),
            'active' => $all->filter(fn (Extracurricular $e) => $e->status === ExtracurricularStatus::Active)->count(),
            'draft' => $all->filter(fn (Extracurricular $e) => $e->status === ExtracurricularStatus::Draft)->count(),
            'by_category' => $all->groupBy(fn (Extracurricular $e) => $e->category->value)
                ->map(fn ($group) => $group->count())
                ->toArray(),
        ];
    }
}
