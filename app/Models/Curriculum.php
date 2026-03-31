<?php

namespace App\Models;

use App\Enums\CurriculumStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Curriculum extends Model
{
    /** @use HasFactory<\Database\Factories\CurriculumFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'year',
        'level',
        'slug',
        'description',
        'content',
        'icon',
        'status',
        'effective_date',
        'expired_date',
        'document',
    ];

    protected $casts = [
        'status' => CurriculumStatus::class,
        'effective_date' => 'date',
        'expired_date' => 'date',
        'year' => 'integer',
    ];

    protected static function booted(): void
    {
        static::saving(function (Curriculum $curriculum) {
            if ($curriculum->isDirty('name') || ! $curriculum->slug) {
                $slug = Str::slug($curriculum->name);
                $original = $slug;
                $count = 1;

                while (
                    static::where('slug', $slug)
                        ->where('id', '!=', $curriculum->id ?? 0)
                        ->exists()
                ) {
                    $slug = $original.'-'.$count++;
                }

                $curriculum->slug = $slug;
            }
        });
    }

    /**
     * @param  Builder<Curriculum>  $query
     * @return Builder<Curriculum>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', CurriculumStatus::Active);
    }
}
