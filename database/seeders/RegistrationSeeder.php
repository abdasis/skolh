<?php

namespace Database\Seeders;

use App\Enums\RegistrationStatus;
use App\Models\AdmissionPeriod;
use App\Models\Registration;
use Illuminate\Database\Seeder;

class RegistrationSeeder extends Seeder
{
    /** @var array<int, string> */
    private array $namaLaki = [
        'Ahmad Fauzi', 'Budi Santoso', 'Dani Permana', 'Eko Prasetyo', 'Fajar Nugroho',
        'Gilang Ramadhan', 'Hendra Wijaya', 'Irfan Hakim', 'Joko Susilo', 'Kevin Ardian',
        'Lutfi Maulana', 'Muhammad Rizki', 'Naufal Habibi', 'Oscar Firmansyah', 'Putra Kusuma',
        'Rafi Ahmad', 'Surya Pratama', 'Taufik Hidayat', 'Umar Bakri', 'Vino Bastian',
    ];

    /** @var array<int, string> */
    private array $namaPerempuan = [
        'Ayu Lestari', 'Bunga Citra', 'Dewi Rahayu', 'Elisa Putri', 'Fitri Handayani',
        'Gita Savitri', 'Hana Pertiwi', 'Intan Permata', 'Jihan Aulia', 'Kinanti Sari',
        'Laila Nuraini', 'Mita Anggraini', 'Nabila Azzahra', 'Olivia Maharani', 'Putri Wulandari',
        'Rini Susanti', 'Sari Melati', 'Tika Amalia', 'Ulfa Hasanah', 'Vina Setiawati',
    ];

    /** @var array<int, string> */
    private array $kota = [
        'Surabaya', 'Malang', 'Sidoarjo', 'Gresik', 'Mojokerto',
        'Pasuruan', 'Probolinggo', 'Jember', 'Banyuwangi', 'Blitar',
    ];

    /** @var array<int, string> */
    private array $sekolahAsal = [
        'SDN Merdeka 1', 'MI Nurul Islam', 'SDN Pahlawan 2', 'SD Muhammadiyah 4',
        'SDN Diponegoro 3', 'MI Al-Irsyad', 'SDN Kartini 1', 'SD Kristen Petra',
        'SDN Pemuda 5', 'MI Roudlotul Ulum',
    ];

    public function run(): void
    {
        $activePeriod = AdmissionPeriod::query()->where('academic_year', '2025/2026')->first();

        if (! $activePeriod) {
            $this->command->warn('Jalankan AdmissionPeriodSeeder terlebih dahulu.');

            return;
        }

        $statuses = [
            RegistrationStatus::Pending,
            RegistrationStatus::Pending,
            RegistrationStatus::Pending,
            RegistrationStatus::Verified,
            RegistrationStatus::Verified,
            RegistrationStatus::Accepted,
            RegistrationStatus::Accepted,
            RegistrationStatus::Accepted,
            RegistrationStatus::Rejected,
            RegistrationStatus::Pending,
        ];

        $allNames = array_merge(
            array_map(fn ($n) => [$n, 'L'], $this->namaLaki),
            array_map(fn ($n) => [$n, 'P'], $this->namaPerempuan),
        );

        shuffle($allNames);

        foreach ($allNames as $index => [$nama, $gender]) {
            $seq = str_pad((string) ($index + 1), 4, '0', STR_PAD_LEFT);
            $year = substr($activePeriod->academic_year, 0, 4);
            $kota = $this->kota[$index % count($this->kota)];
            $sekolah = $this->sekolahAsal[$index % count($this->sekolahAsal)];
            $status = $statuses[$index % count($statuses)];

            $birthYear = rand(2012, 2014);
            $birthMonth = str_pad((string) rand(1, 12), 2, '0', STR_PAD_LEFT);
            $birthDay = str_pad((string) rand(1, 28), 2, '0', STR_PAD_LEFT);

            Registration::create([
                'admission_period_id' => $activePeriod->id,
                'registration_number' => "SPMB-{$year}-{$seq}",
                'status' => $status,
                'full_name' => $nama,
                'nik' => $this->generateNik(),
                'nisn' => (string) rand(1000000000, 9999999999),
                'birth_place' => $kota,
                'birth_date' => "{$birthYear}-{$birthMonth}-{$birthDay}",
                'gender' => $gender,
                'religion' => $index % 5 === 0 ? 'Kristen' : 'Islam',
                'citizenship' => 'WNI',
                'address_street' => 'Jl. ' . $this->streetName($index) . ' No. ' . rand(1, 99),
                'address_rt' => str_pad((string) rand(1, 10), 3, '0', STR_PAD_LEFT),
                'address_rw' => str_pad((string) rand(1, 5), 3, '0', STR_PAD_LEFT),
                'address_village' => 'Kelurahan Raya',
                'address_district' => 'Kecamatan Indah',
                'address_city' => $kota,
                'address_province' => 'Jawa Timur',
                'address_postal_code' => (string) rand(60000, 69999),
                'phone' => '08' . rand(100000000, 999999999),
                'email' => strtolower(str_replace(' ', '.', $nama)) . '@gmail.com',
                'birth_order' => rand(1, 4),
                'sibling_count' => rand(0, 3),
                'height' => rand(130, 155),
                'weight' => rand(28, 50),
                'father_name' => $gender === 'L' ? 'Bapak ' . $nama : 'Bapak ' . explode(' ', $nama)[0] . ' Sr.',
                'father_education' => ['SD', 'SMP', 'SMA', 'S1', 'S2'][$index % 5],
                'father_occupation' => ['Wiraswasta', 'PNS', 'Karyawan Swasta', 'Petani', 'Pedagang'][$index % 5],
                'father_income' => ['< Rp 1.000.000', 'Rp 1.000.000 - Rp 3.000.000', '> Rp 3.000.000'][$index % 3],
                'mother_name' => 'Ibu ' . $this->namaPerempuan[$index % count($this->namaPerempuan)],
                'mother_education' => ['SD', 'SMP', 'SMA', 'S1'][$index % 4],
                'mother_occupation' => ['Ibu Rumah Tangga', 'Karyawan Swasta', 'PNS', 'Wiraswasta'][$index % 4],
                'mother_income' => ['< Rp 1.000.000', 'Rp 1.000.000 - Rp 3.000.000', '> Rp 3.000.000'][$index % 3],
                'previous_school_name' => $sekolah,
                'previous_school_npsn' => (string) rand(10000000, 99999999),
                'graduation_year' => 2025,
            ]);
        }

        $this->command->info('Berhasil membuat ' . count($allNames) . ' data pendaftaran.');
    }

    private function generateNik(): string
    {
        // Format NIK: 16 digit, 2 digit kode provinsi + 2 kode kab + 2 kode kec + 6 tgl lahir + 4 urut
        $prov = str_pad((string) rand(11, 96), 2, '0', STR_PAD_LEFT);
        $kab = str_pad((string) rand(1, 99), 2, '0', STR_PAD_LEFT);
        $kec = str_pad((string) rand(1, 99), 2, '0', STR_PAD_LEFT);
        $tgl = str_pad((string) rand(1, 28), 2, '0', STR_PAD_LEFT);
        $bln = str_pad((string) rand(1, 12), 2, '0', STR_PAD_LEFT);
        $thn = str_pad((string) rand(12, 14), 2, '0', STR_PAD_LEFT);
        $seq = str_pad((string) rand(1, 9999), 4, '0', STR_PAD_LEFT);

        return $prov . $kab . $kec . $tgl . $bln . $thn . $seq;
    }

    private function streetName(int $index): string
    {
        $names = [
            'Merdeka', 'Pahlawan', 'Diponegoro', 'Sudirman', 'Ahmad Yani',
            'Gatot Subroto', 'Imam Bonjol', 'Hayam Wuruk', 'Gajah Mada', 'Veteran',
        ];

        return $names[$index % count($names)];
    }
}
