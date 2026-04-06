<?php

namespace App\Repositories\Contracts;

use App\Models\Article;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface ArticleRepositoryInterface
{
    public function getAll(): Collection;

    /**
     * @param  array<string, mixed>  $filters
     * @return Collection<int, Article>
     */
    public function getAllFiltered(array $filters = []): Collection;

    /**
     * @return LengthAwarePaginator<Article>
     */
    public function getPublished(?string $categorySlug = null): LengthAwarePaginator;

    public function findBySlug(string $slug): ?Article;

    /**
     * @return Collection<int, Article>
     */
    public function getOthers(int $excludeId, int $limit = 5): Collection;

    /**
     * @return array{total: int, published: int, draft: int, with_image: int}
     */
    public function getStats(): array;
}
