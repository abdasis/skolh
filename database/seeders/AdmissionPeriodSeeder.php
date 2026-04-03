<?php

namespace Database\Seeders;

use App\Models\AdmissionPeriod;
use Illuminate\Database\Seeder;

class AdmissionPeriodSeeder extends Seeder
{
    public function run(): void
    {
        // Periode aktif dan sedang buka (is_open = true)
        AdmissionPeriod::factory()->active()->create([
            'academic_year' => '2025/2026',
            'description' => 'Periode penerimaan murid baru tahun ajaran 2025/2026. Pendaftaran dibuka untuk semua jenjang.',
        ]);

        // Periode aktif tapi belum buka
        AdmissionPeriod::factory()->create([
            'academic_year' => '2026/2027',
            'is_active' => true,
            'start_date' => now()->addDays(10)->toDateString(),
            'end_date' => now()->addDays(40)->toDateString(),
            'description' => 'Periode mendatang yang sudah dipersiapkan.',
        ]);

        // Periode-periode lama yang sudah tutup
        AdmissionPeriod::factory()->closed()->create([
            'academic_year' => '2024/2025',
            'description' => 'Periode tahun ajaran sebelumnya.',
        ]);

        AdmissionPeriod::factory()->closed()->create([
            'academic_year' => '2023/2024',
            'description' => null,
        ]);

        AdmissionPeriod::factory()->closed()->create([
            'academic_year' => '2022/2023',
            'description' => null,
        ]);
    }
}
