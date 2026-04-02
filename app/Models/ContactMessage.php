<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'is_read',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function markAsRead(): void
    {
        if (! $this->is_read) {
            $this->update(['is_read' => true]);
        }
    }

    /**
     * @param  Builder<ContactMessage>  $query
     * @return Builder<ContactMessage>
     */
    public function scopeUnread(Builder $query): Builder
    {
        return $query->where('is_read', false);
    }
}
