<?php

namespace App\Actions\Article;

use App\Models\Article;
use Illuminate\Http\UploadedFile;

class CreateArticleAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): Article
    {
        $categoryIds = $data['category_ids'] ?? [];
        $featuredImage = $data['featured_image'] ?? null;
        $ogImage = $data['og_image'] ?? null;
        $metaTitle = $data['meta_title'] ?? null;
        $metaDescription = $data['meta_description'] ?? null;
        $metaKeywords = $data['meta_keywords'] ?? null;

        unset($data['category_ids'], $data['featured_image'], $data['og_image'], $data['meta_title'], $data['meta_description'], $data['meta_keywords']);

        if ($featuredImage instanceof UploadedFile) {
            $data['featured_image'] = $featuredImage->store('articles', 'public');
        }

        $article = Article::create($data);

        if (! empty($categoryIds)) {
            $article->categories()->sync($categoryIds);
        }

        $seoData = [
            'meta_title' => $metaTitle,
            'meta_description' => $metaDescription,
            'meta_keywords' => $metaKeywords,
            'og_image' => null,
        ];

        if ($ogImage instanceof UploadedFile) {
            $seoData['og_image'] = $ogImage->store('articles/og', 'public');
        }

        $article->seo()->create($seoData);

        return $article;
    }
}
