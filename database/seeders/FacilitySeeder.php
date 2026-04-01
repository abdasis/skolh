<?php

namespace Database\Seeders;

use App\Enums\FacilityStatus;
use App\Models\Facility;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    /**
     * @var array<int, array{icon: string, title: string, description: string, content: string, status: FacilityStatus}>
     */
    private array $facilities = [
        [
            'icon' => 'Library',
            'title' => 'Perpustakaan',
            'description' => 'Perpustakaan sekolah yang lengkap dengan koleksi buku pelajaran, buku ilmiah, dan buku fiksi untuk mendukung kegiatan belajar siswa.',
            'content' => '<p>Perpustakaan sekolah kami menyediakan koleksi lebih dari 10.000 buku yang terdiri dari buku pelajaran, ensiklopedia, novel, dan majalah ilmiah. Perpustakaan buka setiap hari kerja dari pukul 07.00 hingga 16.00.</p><p>Fasilitas yang tersedia meliputi area baca yang nyaman, meja belajar individu, akses internet, dan mesin fotokopi. Siswa dapat meminjam maksimal 3 buku dalam waktu 7 hari.</p>',
            'status' => FacilityStatus::Public,
        ],
        [
            'icon' => 'FlaskConical',
            'title' => 'Laboratorium IPA',
            'description' => 'Laboratorium IPA modern yang dilengkapi peralatan praktikum lengkap untuk mendukung pembelajaran sains secara langsung.',
            'content' => '<p>Laboratorium IPA kami dilengkapi dengan peralatan modern untuk praktikum fisika, kimia, dan biologi. Setiap meja praktikum dilengkapi dengan saluran gas, air, dan listrik yang aman.</p><p>Peralatan yang tersedia antara lain mikroskop digital, alat destilasi, set listrik statis, dan berbagai reagen kimia yang tersimpan dengan standar keselamatan tinggi. Kapasitas laboratorium adalah 32 siswa per sesi.</p>',
            'status' => FacilityStatus::Public,
        ],
        [
            'icon' => 'Monitor',
            'title' => 'Laboratorium Komputer',
            'description' => 'Laboratorium komputer dengan unit komputer terbaru dan koneksi internet berkecepatan tinggi untuk mendukung pembelajaran teknologi informasi.',
            'content' => '<p>Laboratorium komputer kami memiliki 40 unit komputer dengan spesifikasi terbaru, dilengkapi koneksi internet serat optik berkecepatan 100 Mbps. Setiap unit komputer menjalankan sistem operasi terkini dan dilengkapi software pendukung pembelajaran.</p><p>Software yang tersedia meliputi Microsoft Office, Adobe Creative Suite, software pemrograman, dan berbagai aplikasi pembelajaran interaktif. Lab ini juga digunakan untuk kegiatan ujian berbasis komputer (UNBK).</p>',
            'status' => FacilityStatus::Public,
        ],
        [
            'icon' => 'Dumbbell',
            'title' => 'Lapangan Olahraga',
            'description' => 'Kompleks lapangan olahraga yang lengkap mencakup lapangan basket, voli, futsal, dan trek lari untuk mendukung kegiatan pendidikan jasmani.',
            'content' => '<p>Kompleks olahraga kami mencakup lapangan basket standar internasional, dua lapangan voli, lapangan futsal dengan rumput sintetis, dan trek lari 200 meter. Semua lapangan terawat dengan baik dan memenuhi standar olahraga nasional.</p><p>Fasilitas pendukung meliputi tribun penonton berkapasitas 500 orang, ruang ganti, dan gudang penyimpanan peralatan olahraga. Lapangan juga digunakan untuk kegiatan ekstrakurikuler dan kejuaraan antar sekolah.</p>',
            'status' => FacilityStatus::Public,
        ],
        [
            'icon' => 'Music',
            'title' => 'Ruang Kesenian dan Musik',
            'description' => 'Ruang kesenian yang dilengkapi alat musik lengkap dan fasilitas seni rupa untuk mengembangkan bakat dan kreativitas siswa.',
            'content' => '<p>Ruang kesenian dan musik kami menyediakan berbagai alat musik tradisional dan modern, termasuk gamelan, keyboard, gitar, drum, dan alat tiup. Ruangan dirancang dengan panel akustik khusus untuk kualitas suara yang optimal.</p><p>Selain musik, ruangan ini juga dilengkapi area seni rupa dengan perlengkapan melukis, memahat, dan membuat kerajinan tangan. Kegiatan ekstrakurikuler paduan suara, band, dan tari rutin dilaksanakan di ruangan ini.</p>',
            'status' => FacilityStatus::Public,
        ],
        [
            'icon' => 'Microscope',
            'title' => 'Laboratorium Bahasa',
            'description' => 'Laboratorium bahasa modern dengan sistem headset individual dan software pembelajaran bahasa untuk meningkatkan kemampuan berbahasa asing siswa.',
            'content' => '<p>Laboratorium bahasa kami dilengkapi dengan 36 unit headset individual beresolusi tinggi, komputer pengajar, dan sistem kontrol kelas yang canggih. Software pembelajaran bahasa Inggris, Mandarin, dan Arab tersedia untuk semua level kemampuan.</p><p>Metode pembelajaran menggunakan pendekatan komunikatif dengan latihan listening, speaking, reading, dan writing yang terintegrasi. Lab ini juga digunakan untuk persiapan ujian sertifikasi bahasa internasional seperti TOEFL dan IELTS.</p>',
            'status' => FacilityStatus::Public,
        ],
        [
            'icon' => 'Palette',
            'title' => 'Aula Serbaguna',
            'description' => 'Aula serbaguna berkapasitas besar yang dapat digunakan untuk upacara, seminar, pertunjukan seni, dan berbagai kegiatan sekolah lainnya.',
            'content' => '<p>Aula serbaguna kami berkapasitas 800 orang dengan sistem audio visual modern, termasuk proyektor layar lebar, sistem sound surround, dan pencahayaan panggung yang lengkap. Lantai kayu parket memberikan kenyamanan dan estetika yang baik.</p><p>Aula ini rutin digunakan untuk pelaksanaan upacara bendera, wisuda, pentas seni tahunan, seminar pendidikan, dan penerimaan tamu dari instansi luar. Tersedia backstage, ruang rias, dan gudang penyimpanan properti panggung.</p>',
            'status' => FacilityStatus::Public,
        ],
        [
            'icon' => 'Wifi',
            'title' => 'Kantin Sekolah',
            'description' => 'Kantin sekolah bersih dan sehat dengan pilihan menu bergizi yang terjangkau, dikelola secara higienis untuk mendukung kesehatan seluruh warga sekolah.',
            'content' => '<p>Kantin sekolah kami menyediakan berbagai pilihan makanan dan minuman bergizi yang dimasak segar setiap hari. Semua menu telah mendapat persetujuan dari ahli gizi dan memenuhi standar kebersihan pangan yang ditetapkan pemerintah.</p><p>Kantin berkapasitas 200 kursi dengan area makan yang bersih dan nyaman. Tersedia juga area khusus siswa berkebutuhan khusus. Harga makanan terjangkau dengan sistem pembayaran tunai dan dompet digital.</p>',
            'status' => FacilityStatus::Public,
        ],
        [
            'icon' => 'TreePine',
            'title' => 'Taman Belajar Outdoor',
            'description' => 'Area taman hijau yang asri dilengkapi tempat duduk dan gazebo sebagai ruang belajar alternatif di luar kelas yang menyegarkan.',
            'content' => '<p>Taman belajar outdoor kami dirancang sebagai ruang belajar alternatif yang menyegarkan di tengah alam. Area seluas 500 meter persegi ini ditanami berbagai jenis tanaman hias dan tanaman obat yang juga menjadi media pembelajaran biologi.</p><p>Tersedia 8 gazebo dengan meja dan kursi yang nyaman, papan tulis portable, dan akses WiFi. Taman ini menjadi favorit siswa untuk belajar kelompok, membaca, dan beristirahat. Perawatan taman dilakukan oleh tim khusus setiap hari.</p>',
            'status' => FacilityStatus::Public,
        ],
        [
            'icon' => 'BookOpen',
            'title' => 'Ruang Bimbingan Konseling',
            'description' => 'Ruang bimbingan konseling yang nyaman dan privat untuk membantu siswa dalam pengembangan diri, perencanaan karir, dan penyelesaian masalah.',
            'content' => '<p>Ruang bimbingan konseling kami menyediakan layanan konsultasi individual dan kelompok yang bersifat rahasia dan profesional. Tersedia 3 ruang konsultasi privat yang nyaman dengan interior yang dirancang untuk menciptakan suasana tenang.</p><p>Layanan yang tersedia meliputi konseling akademik, konseling pribadi-sosial, bimbingan karir dan studi lanjut, serta layanan psikologi. Tim konselor kami terdiri dari 4 konselor bersertifikat yang siap membantu siswa setiap hari kerja.</p>',
            'status' => FacilityStatus::Draft,
        ],
    ];

    public function run(): void
    {
        foreach ($this->facilities as $facilityData) {
            Facility::firstOrCreate(
                ['title' => $facilityData['title']],
                $facilityData,
            );
        }
    }
}
