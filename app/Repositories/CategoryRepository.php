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

    public function getForSelect(): Collection
    {
        return Category::orderBy('name')->get(['id', 'name']);
    }

    /**
     * @return array{total: int, in_use: int}
     */
    public function getStats(): array
    {
        $categories = Category::withCount('announcements')->get();

        return [
            'total' => $categories->count(),
            'in_use' => $categories->filter(fn (Category $c) => $c->announcements_count > 0)->count(),
        ];
    }
}
