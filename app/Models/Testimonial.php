<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Testimonial extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\TestimonialFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'name',
        'role',
        'quote',
        'highlight',
        'avatar_url',
        'sort_order',
    ];
}
