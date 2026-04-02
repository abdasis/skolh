<?php

namespace App\Models;

use App\Enums\Gender;
use App\Enums\TeacherStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Teacher extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\TeacherFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'name',
        'nip',
        'email',
        'phone',
        'address',
        'subject',
        'gender',
        'date_of_birth',
        'joined_at',
        'status',
    ];

    protected $casts = [
        'status' => TeacherStatus::class,
        'gender' => Gender::class,
        'date_of_birth' => 'date',
        'joined_at' => 'date',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->singleFile()
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(100)
            ->height(100);
    }

    /**
     * @param  Builder<Teacher>  $query
     * @return Builder<Teacher>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', TeacherStatus::Active);
    }
}
