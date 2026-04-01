<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnnouncementAttachment extends Model
{
    /** @use HasFactory<\Database\Factories\AnnouncementAttachmentFactory> */
    use HasFactory;

    protected $fillable = [
        'announcement_id',
        'path',
        'original_name',
        'mime_type',
    ];

    /**
     * @return BelongsTo<Announcement, $this>
     */
    public function announcement(): BelongsTo
    {
        return $this->belongsTo(Announcement::class);
    }
}
