<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ReportCategory;
use App\Enums\ReportStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Report extends Model
{
    protected $fillable = [
        'reference_code',
        'category',
        'subject',
        'message',
        'reporter_name',
        'reporter_contact',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'category' => ReportCategory::class,
            'status' => ReportStatus::class,
        ];
    }

    protected static function booting(): void
    {
        static::creating(function (Report $report): void {
            if (empty($report->reference_code)) {
                $report->reference_code = Str::upper(Str::random(8));
            }
        });
    }

    /** @return HasMany<ReportStatusHistory, $this> */
    public function statusHistories(): HasMany
    {
        return $this->hasMany(ReportStatusHistory::class);
    }

    /**
     * @param  Builder<static>  $query
     * @return Builder<static>
     */
    public function scopeStatus(Builder $query, ReportStatus $status): Builder
    {
        return $query->where('status', $status->value);
    }

    /**
     * @param  Builder<static>  $query
     * @return Builder<static>
     */
    public function scopeCategory(Builder $query, ReportCategory $category): Builder
    {
        return $query->where('category', $category->value);
    }
}
