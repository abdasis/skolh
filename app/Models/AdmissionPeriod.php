<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdmissionPeriod extends Model
{
    /** @use HasFactory<\Database\Factories\AdmissionPeriodFactory> */
    use HasFactory;

    protected $fillable = [
        'academic_year',
        'start_date',
        'end_date',
        'is_active',
        'description',
    ];

    /** @return HasMany<CustomField, $this> */
    public function customFields(): HasMany
    {
        return $this->hasMany(CustomField::class)->orderBy('sort_order');
    }

    /** @return HasMany<Registration, $this> */
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    /** @param Builder<AdmissionPeriod> $query */
    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', true);
    }

    /** @param Builder<AdmissionPeriod> $query */
    public function scopeOpen(Builder $query): void
    {
        $today = now()->toDateString();
        $query->where('is_active', true)
            ->where('start_date', '<=', $today)
            ->where('end_date', '>=', $today);
    }

    public function getIsOpenAttribute(): bool
    {
        $today = now()->toDateString();

        return $this->is_active
            && $this->start_date <= $today
            && $this->end_date >= $today;
    }

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_active' => 'boolean',
        ];
    }
}
