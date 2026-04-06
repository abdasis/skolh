<?php

namespace App\Repositories\Contracts;

use App\Models\Curriculum;
use Illuminate\Support\Collection;

interface CurriculumRepositoryInterface
{
    public function getAll(): Collection;

    /**
     * @param  array<string, mixed>  $filters
     * @return Collection<int, Curriculum>
     */
    public function getAllFiltered(array $filters = []): Collection;

    public function getActive(): Collection;

    public function findBySlug(string $slug): ?Curriculum;

    /**
     * @return array{total: int, active: int, draft: int, with_document: int}
     */
    public function getStats(): array;
}
