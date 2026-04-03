<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryImage extends Model
{
    /** @use HasFactory<\Database\Factories\GalleryImageFactory> */
    use HasFactory;

    protected $fillable = [
        'gallery_album_id',
        'image',
        'caption',
        'order',
    ];

    /**
     * @return BelongsTo<GalleryAlbum, $this>
     */
    public function album(): BelongsTo
    {
        return $this->belongsTo(GalleryAlbum::class, 'gallery_album_id');
    }
}
