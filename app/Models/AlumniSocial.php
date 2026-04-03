<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SocialPlatform;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AlumniSocial extends Model
{
    protected $fillable = [
        'alumni_id',
        'platform',
        'url',
    ];

    protected $casts = [
        'platform' => SocialPlatform::class,
    ];

    /** @return BelongsTo<Alumni, $this> */
    public function alumni(): BelongsTo
    {
        return $this->belongsTo(Alumni::class);
    }
}
