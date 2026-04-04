<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\StudentStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'photo_url',
        'nis',
        'nisn',
        'nik',
        'full_name',
        'gender',
        'religion',
        'citizenship',
        'birth_place',
        'birth_date',
        'address',
        'phone',
        'email',
        'special_needs',
        'enrollment_year',
        'status',
        'notes',
        'father_name',
        'father_occupation',
        'father_phone',
        'mother_name',
        'mother_occupation',
        'mother_phone',
        'guardian_name',
        'guardian_occupation',
        'guardian_phone',
    ];

    protected function casts(): array
    {
        return [
            'status' => StudentStatus::class,
            'birth_date' => 'date',
            'enrollment_year' => 'integer',
        ];
    }

    /** @return BelongsTo<Registration, $this> */
    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    /**
     * @param  Builder<static>  $query
     * @return Builder<static>
     */
    public function scopeFilter(Builder $query, ?string $status): Builder
    {
        if ($status !== null && $status !== '') {
            $query->where('status', $status);
        }

        return $query;
    }
}
