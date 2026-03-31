<?php

namespace App\Repositories\Contracts;

use App\Models\Article;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface ArticleRepositoryInterface
{
    public function getAll(): Collection;

    /**
     * @return LengthAwarePaginator<Article>
     */
    public function getPublished(?string $categorySlug = null): LengthAwarePaginator;

    public function findBySlug(string $slug): ?Article;

    /**
     * @return array{total: int, published: int, draft: int, with_image: int}
     */
    public function getStats(): array;
}
