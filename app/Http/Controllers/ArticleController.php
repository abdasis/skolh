<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\CategoryResource;
use App\Repositories\Contracts\ArticleRepositoryInterface;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ArticleController extends Controller
{
    public function __construct(
        private readonly ArticleRepositoryInterface $repository,
        private readonly CategoryRepositoryInterface $categoryRepository,
    ) {}

    public function index(): Response
    {
        $categorySlug = request()->query('category');

        return Inertia::render('articles/index', [
            'articles' => ArticleResource::collection($this->repository->getPublished($categorySlug)),
            'categories' => CategoryResource::collection($this->categoryRepository->getAll()),
            'selectedCategory' => $categorySlug,
        ]);
    }

    public function show(string $slug): Response
    {
        $article = $this->repository->findBySlug($slug);

        if (! $article || $article->status !== ArticleStatus::Published) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('articles/show', [
            'article' => new ArticleResource($article),
        ]);
    }
}
