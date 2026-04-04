<?php

declare(strict_types=1);

namespace App\Actions\Student;

use App\Models\Registration;
use App\Models\Student;

final class ConvertFromSpmbAction
{
    public function handle(int $registrationId): Student
    {
        $registration = Registration::with(['admissionPeriod', 'media'])
            ->findOrFail($registrationId);

        if ($registration->status->value !== 'accepted') {
            throw new \InvalidArgumentException('Registration is not accepted.');
        }

        if ($registration->student()->exists()) {
            throw new \InvalidArgumentException('Registration has already been converted to a student.');
        }

        $addressParts = array_filter([
            $registration->address_street ?? null,
            $registration->address_village ?? null,
            $registration->address_district ?? null,
            $registration->address_city ?? null,
            $registration->address_province ?? null,
        ]);

        $enrollmentYear = $registration->admissionPeriod?->start_date?->year
            ?? now()->year;

        $student = Student::create([
            'registration_id' => $registration->id,
            'full_name' => $registration->full_name,
            'nik' => $registration->nik,
            'nisn' => $registration->nisn,
            'birth_place' => $registration->birth_place,
            'birth_date' => $registration->birth_date,
            'gender' => $registration->gender?->value ?? $registration->gender,
            'religion' => $registration->religion,
            'citizenship' => $registration->citizenship,
            'address' => implode(', ', $addressParts) ?: null,
            'phone' => $registration->phone,
            'email' => $registration->email,
            'special_needs' => $registration->special_needs,
            'father_name' => $registration->father_name,
            'father_occupation' => $registration->father_occupation,
            'mother_name' => $registration->mother_name,
            'mother_occupation' => $registration->mother_occupation,
            'guardian_name' => $registration->guardian_name,
            'guardian_occupation' => $registration->guardian_occupation,
            'enrollment_year' => $enrollmentYear,
            'status' => 'active',
        ]);

        $photo = $registration->getFirstMedia('registration_photo');

        if ($photo !== null) {
            $student->update(['photo_url' => $photo->getUrl()]);
        }

        return $student;
    }
}
