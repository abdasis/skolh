<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistrationCustomValue extends Model
{
    protected $fillable = [
        'registration_id',
        'custom_field_id',
        'field_label',
        'field_type',
        'value',
    ];

    /** @return BelongsTo<Registration, $this> */
    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    /** @return BelongsTo<CustomField, $this> */
    public function customField(): BelongsTo
    {
        return $this->belongsTo(CustomField::class);
    }
}
