<?php

namespace App\Actions\Article;

use App\Models\Article;
use App\Models\SeoMeta;
use Illuminate\Support\Facades\Storage;

class DeleteArticleAction
{
    public function handle(Article $article): void
    {
        if ($article->featured_image) {
            Storage::disk('public')->delete($article->featured_image);
        }

        /** @var SeoMeta|null $seo */
        $seo = $article->seo()->first();

        if ($seo instanceof SeoMeta && $seo->og_image) {
            Storage::disk('public')->delete($seo->og_image);
        }

        $article->seo()->delete();
        $article->delete();
    }
}
