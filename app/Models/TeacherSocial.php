<?php

namespace App\Models;

use App\Enums\SocialPlatform;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeacherSocial extends Model
{
    protected $fillable = [
        'teacher_id',
        'platform',
        'url',
    ];

    protected $casts = [
        'platform' => SocialPlatform::class,
    ];

    /** @return BelongsTo<Teacher, $this> */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class);
    }
}
