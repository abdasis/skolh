<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Str;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    protected static function booted(): void
    {
        static::saving(function (Category $category) {
            if ($category->isDirty('name') || ! $category->slug) {
                $slug = Str::slug($category->name);
                $original = $slug;
                $count = 1;

                while (
                    static::where('slug', $slug)
                        ->where('id', '!=', $category->id ?? 0)
                        ->exists()
                ) {
                    $slug = $original.'-'.$count++;
                }

                $category->slug = $slug;
            }
        });
    }

    public function isInUse(): bool
    {
        return $this->announcements()->exists();
    }

    /**
     * @return MorphToMany<Announcement, $this>
     */
    public function announcements(): MorphToMany
    {
        return $this->morphedByMany(Announcement::class, 'categoriable');
    }

    /**
     * @return MorphToMany<Article, $this>
     */
    public function articles(): MorphToMany
    {
        return $this->morphedByMany(Article::class, 'categoriable');
    }
}
