<?php

namespace App\Actions\Article;

use App\Models\Article;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UpdateArticleAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(Article $article, array $data): Article
    {
        $categoryIds = $data['category_ids'] ?? null;
        $featuredImage = $data['featured_image'] ?? null;
        $ogImage = $data['og_image'] ?? null;
        $metaTitle = $data['meta_title'] ?? null;
        $metaDescription = $data['meta_description'] ?? null;
        $metaKeywords = $data['meta_keywords'] ?? null;

        unset($data['category_ids'], $data['featured_image'], $data['og_image'], $data['meta_title'], $data['meta_description'], $data['meta_keywords']);

        if ($featuredImage instanceof UploadedFile) {
            if ($article->featured_image) {
                Storage::disk('public')->delete($article->featured_image);
            }
            $data['featured_image'] = $featuredImage->store('articles', 'public');
        }

        $article->update($data);

        if ($categoryIds !== null) {
            $article->categories()->sync($categoryIds);
        }

        $seoData = [
            'meta_title' => $metaTitle,
            'meta_description' => $metaDescription,
            'meta_keywords' => $metaKeywords,
        ];

        if ($ogImage instanceof UploadedFile) {
            if ($article->seo?->og_image) {
                Storage::disk('public')->delete($article->seo->og_image);
            }
            $seoData['og_image'] = $ogImage->store('articles/og', 'public');
        }

        $article->seo()->updateOrCreate([], $seoData);

        return $article;
    }
}
