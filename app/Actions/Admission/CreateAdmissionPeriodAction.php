<?php

declare(strict_types=1);

namespace App\Actions\Admission;

use App\Models\AdmissionPeriod;

final class CreateAdmissionPeriodAction
{
    /**
     * @param array<string, mixed> $data
     */
    public function handle(array $data): AdmissionPeriod
    {
        // Jika periode baru adalah aktif, nonaktifkan semua periode lain
        if (!empty($data['is_active'])) {
            AdmissionPeriod::query()->where('is_active', true)->update(['is_active' => false]);
        }

        return AdmissionPeriod::create([
            'academic_year' => $data['academic_year'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'is_active' => $data['is_active'] ?? false,
            'description' => $data['description'] ?? null,
        ]);
    }
}
