<?php

namespace Database\Seeders;

use App\Models\Agenda;
use Illuminate\Database\Seeder;

class AgendaSeeder extends Seeder
{
    /**
     * @var array<int, array{date: string, title: string, description: string}>
     */
    private array $agendas = [
        [
            'date' => '2026-04-07',
            'title' => 'Upacara Bendera Hari Senin',
            'description' => 'Pelaksanaan upacara bendera rutin setiap hari Senin pagi di lapangan utama sekolah. Seluruh siswa, guru, dan staf wajib hadir.',
        ],
        [
            'date' => '2026-04-10',
            'title' => 'Rapat Komite Sekolah',
            'description' => 'Rapat koordinasi antara komite sekolah dan dewan guru membahas program semester genap dan rencana pengembangan sarana prasarana.',
        ],
        [
            'date' => '2026-04-14',
            'title' => 'Ujian Tengah Semester Genap',
            'description' => 'Pelaksanaan ujian tengah semester genap untuk seluruh siswa kelas X, XI, dan XII. Jadwal lengkap dapat dilihat di papan pengumuman.',
        ],
        [
            'date' => '2026-04-18',
            'title' => 'Seminar Literasi Digital',
            'description' => 'Seminar bertema "Cerdas Bermedia Sosial" yang diselenggarakan untuk siswa kelas XI. Narasumber dari Dinas Komunikasi dan Informatika setempat.',
        ],
        [
            'date' => '2026-04-21',
            'title' => 'Peringatan Hari Kartini',
            'description' => 'Peringatan Hari Kartini dengan berbagai kegiatan lomba, fashion show pakaian daerah, dan penampilan seni budaya oleh siswa-siswi.',
        ],
        [
            'date' => '2026-04-25',
            'title' => 'Kunjungan Industri Kelas XII',
            'description' => 'Kunjungan industri ke kawasan industri sebagai bagian dari program persiapan karir dan pengenalan dunia kerja bagi siswa kelas XII.',
        ],
        [
            'date' => '2026-05-02',
            'title' => 'Peringatan Hari Pendidikan Nasional',
            'description' => 'Upacara bendera dalam rangka memperingati Hari Pendidikan Nasional. Dilanjutkan dengan pameran karya siswa dan pembagian penghargaan bagi siswa berprestasi.',
        ],
        [
            'date' => '2026-05-08',
            'title' => 'Lomba Karya Ilmiah Remaja',
            'description' => 'Lomba karya ilmiah remaja tingkat sekolah sebagai seleksi untuk mengikuti kompetisi di tingkat kabupaten. Pendaftaran dibuka mulai 25 April.',
        ],
        [
            'date' => '2026-05-15',
            'title' => 'Pertemuan Orang Tua Wali Kelas XII',
            'description' => 'Pertemuan khusus orang tua siswa kelas XII untuk membahas persiapan ujian akhir, jalur masuk perguruan tinggi, dan program bimbingan belajar.',
        ],
        [
            'date' => '2026-05-20',
            'title' => 'Pentas Seni Tahunan',
            'description' => 'Pagelaran pentas seni tahunan yang menampilkan berbagai pertunjukan dari ekstra kurikuler seni tari, musik, teater, dan paduan suara.',
        ],
        [
            'date' => '2026-05-28',
            'title' => 'Ujian Akhir Semester Genap',
            'description' => 'Pelaksanaan ujian akhir semester genap untuk kelas X dan XI. Siswa diharapkan mempersiapkan diri dengan baik dan hadir tepat waktu.',
        ],
        [
            'date' => '2026-06-05',
            'title' => 'Peringatan Hari Lingkungan Hidup',
            'description' => 'Kegiatan penghijauan dan kerja bakti membersihkan lingkungan sekolah dalam rangka memperingati Hari Lingkungan Hidup Sedunia.',
        ],
    ];

    public function run(): void
    {
        foreach ($this->agendas as $agendaData) {
            Agenda::firstOrCreate(
                ['title' => $agendaData['title'], 'date' => $agendaData['date']],
                $agendaData,
            );
        }
    }
}
