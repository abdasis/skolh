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
