<?php

namespace App\Repositories;

use App\Enums\CurriculumStatus;
use App\Models\Curriculum;
use App\Repositories\Contracts\CurriculumRepositoryInterface;
use Illuminate\Support\Collection;

class CurriculumRepository implements CurriculumRepositoryInterface
{
    public function getAll(): Collection
    {
        return Curriculum::latest()->get();
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return Collection<int, Curriculum>
     */
    public function getAllFiltered(array $filters = []): Collection
    {
        $query = Curriculum::latest();

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%");
            });
        }

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->get();
    }

    public function getActive(): Collection
    {
        return Curriculum::active()->latest()->get(['id', 'name', 'slug', 'description', 'icon']);
    }

    public function findBySlug(string $slug): ?Curriculum
    {
        return Curriculum::where('slug', $slug)->first();
    }

    /**
     * @return array{total: int, active: int, draft: int, with_document: int}
     */
    public function getStats(): array
    {
        $all = $this->getAll();

        return [
            'total' => $all->count(),
            'active' => $all->filter(fn (Curriculum $c) => $c->status === CurriculumStatus::Active)->count(),
            'draft' => $all->filter(fn (Curriculum $c) => $c->status === CurriculumStatus::Draft)->count(),
            'with_document' => $all->whereNotNull('document')->count(),
        ];
    }
}
