<?php

namespace App\Models;

use App\Enums\DayOfWeek;
use App\Enums\ExtracurricularCategory;
use App\Enums\ExtracurricularStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Extracurricular extends Model
{
    /** @use HasFactory<\Database\Factories\ExtracurricularFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'day',
        'time',
        'supervisor',
        'description',
        'content',
        'featured_image',
        'status',
    ];

    protected $casts = [
        'status' => ExtracurricularStatus::class,
        'category' => ExtracurricularCategory::class,
        'day' => DayOfWeek::class,
    ];

    protected static function booted(): void
    {
        static::saving(function (Extracurricular $extracurricular) {
            if ($extracurricular->isDirty('title') || ! $extracurricular->slug) {
                $slug = Str::slug($extracurricular->title);
                $original = $slug;
                $count = 1;

                while (
                    static::where('slug', $slug)
                        ->where('id', '!=', $extracurricular->id ?? 0)
                        ->exists()
                ) {
                    $slug = $original.'-'.$count++;
                }

                $extracurricular->slug = $slug;
            }
        });
    }

    /**
     * @param  Builder<Extracurricular>  $query
     * @return Builder<Extracurricular>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', ExtracurricularStatus::Active);
    }
}
