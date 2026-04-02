<?php

namespace App\Repositories\Contracts;

use App\Models\Achievement;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface AchievementRepositoryInterface
{
    public function getAll(): Collection;

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<Achievement>
     */
    public function getPaginated(array $filters = []): LengthAwarePaginator;

    /**
     * @return array{total: int, by_level: array{district: int, province: int, national: int, international: int}}
     */
    public function getStats(): array;

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<Achievement>
     */
    public function getPublic(array $filters = []): LengthAwarePaginator;
}
