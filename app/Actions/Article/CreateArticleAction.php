<?php

namespace App\Actions\Article;

use App\Models\Article;
use Illuminate\Support\Facades\Storage;

class CreateArticleAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): Article
    {
        $categoryIds = $data['category_ids'] ?? [];
        $featuredImageUrl = $data['featured_image_url'] ?? null;
        $metaTitle = $data['meta_title'] ?? null;
        $metaDescription = $data['meta_description'] ?? null;
        $metaKeywords = $data['meta_keywords'] ?? null;

        unset($data['category_ids'], $data['featured_image_url'], $data['meta_title'], $data['meta_description'], $data['meta_keywords']);

        $featuredImagePath = $this->urlToStoragePath($featuredImageUrl);
        $data['featured_image'] = $featuredImagePath;

        $article = Article::create($data);

        if (! empty($categoryIds)) {
            $article->categories()->sync($categoryIds);
        }

        $article->seo()->create([
            'meta_title' => $metaTitle,
            'meta_description' => $metaDescription,
            'meta_keywords' => $metaKeywords,
            'og_image' => $featuredImagePath,
        ]);

        return $article;
    }

    private function urlToStoragePath(?string $url): ?string
    {
        if ($url === null) {
            return null;
        }

        $storageUrl = Storage::disk('public')->url('');

        if (str_starts_with($url, $storageUrl)) {
            return ltrim(substr($url, strlen($storageUrl)), '/');
        }

        return null;
    }
}
