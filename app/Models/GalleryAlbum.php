<?php

namespace App\Models;

use App\Enums\GalleryAlbumStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class GalleryAlbum extends Model
{
    /** @use HasFactory<\Database\Factories\GalleryAlbumFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'cover_image',
        'status',
    ];

    protected $casts = [
        'status' => GalleryAlbumStatus::class,
    ];

    protected static function booted(): void
    {
        static::saving(function (GalleryAlbum $galleryAlbum) {
            if ($galleryAlbum->isDirty('title') || ! $galleryAlbum->slug) {
                $slug = Str::slug($galleryAlbum->title);
                $original = $slug;
                $count = 1;

                while (
                    static::where('slug', $slug)
                        ->where('id', '!=', $galleryAlbum->id ?? 0)
                        ->exists()
                ) {
                    $slug = $original.'-'.$count++;
                }

                $galleryAlbum->slug = $slug;
            }
        });
    }

    /**
     * @return HasMany<GalleryImage, $this>
     */
    public function images(): HasMany
    {
        return $this->hasMany(GalleryImage::class)->orderBy('order')->orderBy('created_at');
    }

    /**
     * @param  Builder<GalleryAlbum>  $query
     * @return Builder<GalleryAlbum>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', GalleryAlbumStatus::Published);
    }
}
