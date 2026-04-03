<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Alumni;
use Illuminate\Database\Seeder;

class AlumniSeeder extends Seeder
{
    public function run(): void
    {
        $alumni = [
            [
                'name' => 'Muhammad Fadhil Hakim',
                'batch' => 'Angkatan ke-1 SDIT Al-Aziz',
                'destination' => 'Teknik Informatika, Universitas Indonesia',
                'quote' => 'SDIT Al-Aziz mengajarkan saya bahwa ilmu dan iman harus berjalan beriringan. Fondasi yang kuat di sini membuat saya percaya diri melangkah ke jenjang berikutnya.',
                'sort_order' => 0,
            ],
            [
                'name' => 'Aisyah Nur Rahmah',
                'batch' => 'Angkatan ke-2 SDIT Al-Aziz',
                'destination' => 'Kedokteran, Universitas Gadjah Mada',
                'quote' => 'Kebiasaan disiplin dan hafalan Quran yang ditanamkan sejak SD sangat membantu saya menghadapi tekanan di bangku kuliah. Terima kasih SDIT Al-Aziz.',
                'sort_order' => 1,
            ],
            [
                'name' => 'Abdullah Zaki Mubarak',
                'batch' => 'Angkatan ke-1 SDIT Al-Aziz',
                'destination' => 'Hukum Islam, Universitas Al-Azhar Mesir',
                'quote' => 'Mimpi saya belajar di Mesir berawal dari semangat mencintai Al-Quran yang ditumbuhkan oleh guru-guru SDIT Al-Aziz. Sekolah ini benar-benar mengubah hidup saya.',
                'sort_order' => 2,
            ],
            [
                'name' => 'Fatimah Zahra Putri',
                'batch' => 'Angkatan ke-3 SDIT Al-Aziz',
                'destination' => 'Akuntansi, Universitas Teknologi Malaysia',
                'quote' => 'Nilai-nilai kejujuran dan tanggung jawab yang diajarkan sejak SD menjadi bekal berharga dalam karier saya. Saya bangga menjadi bagian dari keluarga besar SDIT Al-Aziz.',
                'sort_order' => 3,
            ],
            [
                'name' => 'Yusuf Ramadhan Saputra',
                'batch' => 'Angkatan ke-2 SDIT Al-Aziz',
                'destination' => 'Ilmu Komputer, Institut Teknologi Bandung',
                'quote' => 'Program kegiatan di SDIT Al-Aziz sangat beragam dan membentuk karakter saya. Teman-teman dan guru yang suportif membuat masa SD saya penuh kenangan indah.',
                'sort_order' => 4,
            ],
            [
                'name' => 'Khadijah Salma Azzahra',
                'batch' => 'Angkatan ke-4 SDIT Al-Aziz',
                'destination' => 'Psikologi, Universitas Airlangga',
                'quote' => 'SDIT Al-Aziz bukan sekadar tempat belajar, tapi rumah kedua. Di sinilah saya belajar mencintai sesama, menghormati perbedaan, dan menjadi pribadi yang lebih baik.',
                'sort_order' => 5,
            ],
        ];

        foreach ($alumni as $data) {
            Alumni::create($data);
        }
    }
}
