<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Alumni extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\AlumniFactory> */
    use HasFactory, InteractsWithMedia;

    protected $table = 'alumni';

    protected $fillable = [
        'name',
        'batch',
        'destination',
        'quote',
        'avatar_url',
        'sort_order',
    ];

    /** @return HasMany<AlumniSocial, $this> */
    public function socials(): HasMany
    {
        return $this->hasMany(AlumniSocial::class);
    }

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
}
