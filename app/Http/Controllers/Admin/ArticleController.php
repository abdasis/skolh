<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Article\CreateArticleAction;
use App\Actions\Article\DeleteArticleAction;
use App\Actions\Article\UpdateArticleAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreArticleRequest;
use App\Http\Requests\Admin\UpdateArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\CategoryResource;
use App\Models\Article;
use App\Models\User;
use App\Repositories\Contracts\ArticleRepositoryInterface;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function __construct(
        private readonly ArticleRepositoryInterface $repository,
        private readonly CategoryRepositoryInterface $categoryRepository,
        private readonly CreateArticleAction $createAction,
        private readonly UpdateArticleAction $updateAction,
        private readonly DeleteArticleAction $deleteAction,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/articles/index', [
            'articles' => ArticleResource::collection($this->repository->getAll()),
            'stats' => $this->repository->getStats(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/articles/create', [
            'users' => User::orderBy('name')->get(['id', 'name']),
            'categories' => CategoryResource::collection($this->categoryRepository->getAll()),
        ]);
    }

    public function store(StoreArticleRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->route('admin.articles.index')
            ->with('success', 'Artikel berhasil dibuat.');
    }

    public function edit(Article $article): Response
    {
        return Inertia::render('admin/articles/edit', [
            'article' => new ArticleResource($article->load(['author', 'categories', 'seo'])),
            'users' => User::orderBy('name')->get(['id', 'name']),
            'categories' => CategoryResource::collection($this->categoryRepository->getAll()),
        ]);
    }

    public function update(UpdateArticleRequest $request, Article $article): RedirectResponse
    {
        $this->updateAction->handle($article, $request->validated());

        return redirect()->route('admin.articles.index')
            ->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Article $article): RedirectResponse
    {
        $this->deleteAction->handle($article);

        return redirect()->route('admin.articles.index')
            ->with('success', 'Artikel berhasil dihapus.');
    }
}
