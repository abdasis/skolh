<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\RegistrationStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Registration extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\RegistrationFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'admission_period_id',
        'registration_number',
        'status',
        'full_name',
        'nik',
        'nisn',
        'birth_place',
        'birth_date',
        'gender',
        'religion',
        'citizenship',
        'address_street',
        'address_rt',
        'address_rw',
        'address_village',
        'address_district',
        'address_city',
        'address_province',
        'address_postal_code',
        'living_arrangement',
        'transportation',
        'phone',
        'email',
        'birth_order',
        'sibling_count',
        'special_needs',
        'height',
        'weight',
        'father_name',
        'father_nik',
        'father_birth_year',
        'father_education',
        'father_occupation',
        'father_income',
        'mother_name',
        'mother_nik',
        'mother_birth_year',
        'mother_education',
        'mother_occupation',
        'mother_income',
        'guardian_name',
        'guardian_nik',
        'guardian_birth_year',
        'guardian_education',
        'guardian_occupation',
        'guardian_income',
        'previous_school_name',
        'previous_school_npsn',
        'graduation_year',
    ];

    /** @return BelongsTo<AdmissionPeriod, $this> */
    public function admissionPeriod(): BelongsTo
    {
        return $this->belongsTo(AdmissionPeriod::class);
    }

    /** @return HasMany<RegistrationCustomValue, $this> */
    public function customValues(): HasMany
    {
        return $this->hasMany(RegistrationCustomValue::class);
    }

    /** @return HasOne<Student, $this> */
    public function student(): HasOne
    {
        return $this->hasOne(Student::class);
    }

    /**
     * Buat nomor pendaftaran unik untuk periode ini.
     * Format: SPMB-{tahun}-{urutan 4 digit}
     */
    public static function generateRegistrationNumber(int $admissionPeriodId, string $academicYear): string
    {
        $year = substr($academicYear, 0, 4);

        $lastSequence = static::where('admission_period_id', $admissionPeriodId)
            ->lockForUpdate()
            ->count();

        $sequence = str_pad((string) ($lastSequence + 1), 4, '0', STR_PAD_LEFT);

        return "SPMB-{$year}-{$sequence}";
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('registration_photo')
            ->singleFile()
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);

        $this->addMediaCollection('registration_id_document')
            ->singleFile()
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'application/pdf']);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(150)
            ->height(200)
            ->performOnCollections('registration_photo');
    }

    protected function casts(): array
    {
        return [
            'status' => RegistrationStatus::class,
            'birth_date' => 'date',
        ];
    }
}
