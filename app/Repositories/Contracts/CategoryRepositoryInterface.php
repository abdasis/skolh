<?php

namespace App\Repositories\Contracts;

use App\Models\Category;
use Illuminate\Support\Collection;

interface CategoryRepositoryInterface
{
    public function getAll(): Collection;

    public function getForSelect(): Collection;

    /**
     * @return array{total: int, in_use: int}
     */
    public function getStats(): array;
}
