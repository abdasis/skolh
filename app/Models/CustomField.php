<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\CustomFieldType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomField extends Model
{
    /** @use HasFactory<\Database\Factories\CustomFieldFactory> */
    use HasFactory;

    protected $fillable = [
        'admission_period_id',
        'label',
        'type',
        'placeholder',
        'is_required',
        'sort_order',
        'options',
    ];

    /** @return BelongsTo<AdmissionPeriod, $this> */
    public function admissionPeriod(): BelongsTo
    {
        return $this->belongsTo(AdmissionPeriod::class);
    }

    /** @return HasMany<RegistrationCustomValue, $this> */
    public function registrationValues(): HasMany
    {
        return $this->hasMany(RegistrationCustomValue::class);
    }

    protected function casts(): array
    {
        return [
            'type' => CustomFieldType::class,
            'is_required' => 'boolean',
            'options' => 'array',
        ];
    }
}
