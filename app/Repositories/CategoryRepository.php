<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Support\Collection;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function getAll(): Collection
    {
        return Category::latest()->get();
    }

    public function findById(int $id): ?Category
    {
        return Category::find($id);
    }

    /**
     * @return array{total: int}
     */
    public function getStats(): array
    {
        return [
            'total' => Category::count(),
        ];
    }
}
