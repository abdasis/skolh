<?php

namespace App\Models;

use App\Enums\MajorStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Major extends Model
{
    /** @use HasFactory<\Database\Factories\MajorFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'featured_image',
        'status',
    ];

    protected $casts = [
        'status' => MajorStatus::class,
    ];

    protected $appends = ['featured_image_url'];

    protected static function booted(): void
    {
        static::saving(function (Major $major) {
            if ($major->isDirty('title') || ! $major->slug) {
                $slug = Str::slug($major->title);
                $original = $slug;
                $count = 1;

                while (
                    static::where('slug', $slug)
                        ->where('id', '!=', $major->id ?? 0)
                        ->exists()
                ) {
                    $slug = $original.'-'.$count++;
                }

                $major->slug = $slug;
            }
        });
    }

    /**
     * @param  Builder<Major>  $query
     * @return Builder<Major>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', MajorStatus::Public);
    }

    public function getFeaturedImageUrlAttribute(): ?string
    {
        if (! $this->featured_image) {
            return null;
        }

        return $this->featured_image;
    }
}
