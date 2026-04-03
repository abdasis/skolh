<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class OrganizationNode extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\OrganizationNodeFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'parent_id',
        'teacher_id',
        'position',
        'name',
        'nip',
        'sort_order',
        'branch_side',
        'connector_from',
        'position_x',
        'position_y',
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

    protected $casts = [
        'sort_order' => 'integer',
        'position_x' => 'float',
        'position_y' => 'float',
    ];

    /**
     * @return BelongsTo<OrganizationNode, $this>
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(OrganizationNode::class, 'parent_id');
    }

    /**
     * @return HasMany<OrganizationNode, $this>
     */
    public function children(): HasMany
    {
        return $this->hasMany(OrganizationNode::class, 'parent_id')->orderBy('sort_order');
    }

    /**
     * @return BelongsTo<Teacher, $this>
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class);
    }

    public function getIsBrokenLinkAttribute(): bool
    {
        return $this->teacher_id === null && $this->name === null;
    }
}
