<?php

namespace App\Models;

use App\Enums\FacilityStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Facility extends Model
{
    /** @use HasFactory<\Database\Factories\FacilityFactory> */
    use HasFactory;

    protected $fillable = [
        'icon',
        'title',
        'slug',
        'description',
        'content',
        'featured_image',
        'status',
    ];

    protected $casts = [
        'status' => FacilityStatus::class,
    ];

    protected static function booted(): void
    {
        static::saving(function (Facility $facility) {
            if ($facility->isDirty('title') || ! $facility->slug) {
                $slug = Str::slug($facility->title);
                $original = $slug;
                $count = 1;

                while (
                    static::where('slug', $slug)
                        ->where('id', '!=', $facility->id ?? 0)
                        ->exists()
                ) {
                    $slug = $original.'-'.$count++;
                }

                $facility->slug = $slug;
            }
        });
    }

    /**
     * @param  Builder<Facility>  $query
     * @return Builder<Facility>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', FacilityStatus::Public);
    }
}
