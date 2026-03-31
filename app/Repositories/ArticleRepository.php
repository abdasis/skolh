<?php

namespace App\Repositories;

use App\Enums\ArticleStatus;
use App\Models\Article;
use App\Repositories\Contracts\ArticleRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ArticleRepository implements ArticleRepositoryInterface
{
    public function getAll(): Collection
    {
        return Article::with(['author', 'categories', 'seo'])->latest()->get();
    }

    /**
     * @return LengthAwarePaginator<Article>
     */
    public function getPublished(?string $categorySlug = null): LengthAwarePaginator
    {
        $query = Article::published()->with(['author', 'categories'])->latest('published_at');

        if ($categorySlug) {
            $query->whereHas('categories', fn ($q) => $q->where('slug', $categorySlug));
        }

        return $query->paginate(15);
    }

    public function findBySlug(string $slug): ?Article
    {
        return Article::with(['author', 'categories', 'seo'])
            ->where('slug', $slug)
            ->first();
    }

    /**
     * @return array{total: int, published: int, draft: int, with_image: int}
     */
    public function getStats(): array
    {
        $all = Article::all();

        return [
            'total' => $all->count(),
            'published' => $all->filter(fn (Article $a) => $a->status === ArticleStatus::Published)->count(),
            'draft' => $all->filter(fn (Article $a) => $a->status === ArticleStatus::Draft)->count(),
            'with_image' => $all->filter(fn (Article $a) => $a->featured_image !== null)->count(),
        ];
    }
}
