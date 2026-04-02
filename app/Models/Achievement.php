<?php

namespace App\Models;

use App\Enums\AchievementCategory;
use App\Enums\AchievementLevel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    /** @use HasFactory<\Database\Factories\AchievementFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'level',
        'year',
        'attachment',
    ];

    protected $casts = [
        'category' => AchievementCategory::class,
        'level' => AchievementLevel::class,
        'year' => 'integer',
    ];
}
