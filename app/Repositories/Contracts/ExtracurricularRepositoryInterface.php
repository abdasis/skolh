<?php

namespace App\Repositories\Contracts;

use App\Models\Extracurricular;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface ExtracurricularRepositoryInterface
{
    public function getAll(): Collection;

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<Extracurricular>
     */
    public function getPaginated(array $filters = []): LengthAwarePaginator;

    public function getActive(): Collection;

    public function findBySlug(string $slug): ?Extracurricular;

    /**
     * @return array{total: int, active: int, draft: int, by_category: array<string, int>}
     */
    public function getStats(): array;
}
