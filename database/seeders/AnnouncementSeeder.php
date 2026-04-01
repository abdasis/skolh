<?php

namespace Database\Seeders;

use App\Enums\AnnouncementStatus;
use App\Models\Announcement;
use App\Models\Category;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    /**
     * @var array<int, array{title: string, excerpt: string, content: string, category: string, status: AnnouncementStatus, days_ago: int}>
     */
    private array $announcements = [
        [
            'title' => 'Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027',
            'excerpt' => 'SDIT Al-Aziz membuka pendaftaran peserta didik baru untuk tahun ajaran 2026/2027. Kuota terbatas, segera daftarkan putra-putri Anda.',
            'content' => '<p>Assalamu\'alaikum warahmatullahi wabarakatuh.</p><p>Dengan penuh syukur, SDIT Al-Aziz kembali membuka Penerimaan Peserta Didik Baru (PPDB) untuk Tahun Ajaran 2026/2027. Kami mengundang seluruh orang tua/wali yang ingin mendaftarkan putra-putrinya di sekolah kami.</p><h3>Persyaratan Pendaftaran</h3><ul><li>Usia minimal 6 tahun per 1 Juli 2026</li><li>Fotokopi akta kelahiran (2 lembar)</li><li>Fotokopi Kartu Keluarga (2 lembar)</li><li>Pas foto 3x4 berwarna (4 lembar)</li><li>Mengisi formulir pendaftaran</li></ul><h3>Jadwal Pendaftaran</h3><p>Pendaftaran dibuka mulai <strong>1 Mei 2026</strong> hingga <strong>30 Juni 2026</strong> pada hari kerja pukul 08.00–14.00 WIB.</p><p>Untuk informasi lebih lanjut, silakan hubungi kantor tata usaha sekolah.</p><p>Wassalamu\'alaikum warahmatullahi wabarakatuh.</p>',
            'category' => 'Akademik',
            'status' => AnnouncementStatus::Published,
            'days_ago' => 2,
        ],
        [
            'title' => 'Jadwal Ujian Akhir Semester Genap 2025/2026',
            'excerpt' => 'Ujian Akhir Semester (UAS) Genap akan dilaksanakan pada 10–20 Juni 2026. Seluruh siswa diharapkan mempersiapkan diri dengan baik.',
            'content' => '<p>Assalamu\'alaikum warahmatullahi wabarakatuh.</p><p>Diberitahukan kepada seluruh siswa dan orang tua/wali bahwa <strong>Ujian Akhir Semester (UAS) Genap Tahun Ajaran 2025/2026</strong> akan dilaksanakan pada:</p><ul><li><strong>Tanggal:</strong> 10 – 20 Juni 2026</li><li><strong>Waktu:</strong> 07.30 – 11.30 WIB</li><li><strong>Tempat:</strong> Ruang kelas masing-masing</li></ul><h3>Ketentuan Ujian</h3><ul><li>Siswa wajib hadir 15 menit sebelum ujian dimulai</li><li>Membawa alat tulis lengkap</li><li>Mengenakan seragam sekolah sesuai jadwal</li><li>Tidak diperkenankan membawa buku catatan ke dalam ruang ujian</li></ul><p>Jadwal lengkap per mata pelajaran akan dibagikan melalui wali kelas masing-masing.</p><p>Wassalamu\'alaikum warahmatullahi wabarakatuh.</p>',
            'category' => 'Akademik',
            'status' => AnnouncementStatus::Published,
            'days_ago' => 5,
        ],
        [
            'title' => 'Libur Hari Raya Idul Adha 1447 H',
            'excerpt' => 'Sekolah akan meliburkan kegiatan belajar mengajar pada peringatan Hari Raya Idul Adha 1447 H. Kegiatan akan kembali normal setelahnya.',
            'content' => '<p>Assalamu\'alaikum warahmatullahi wabarakatuh.</p><p>Diberitahukan kepada seluruh warga SDIT Al-Aziz bahwa sehubungan dengan peringatan <strong>Hari Raya Idul Adha 1447 H</strong>, kegiatan belajar mengajar akan diliburkan pada:</p><ul><li><strong>Tanggal:</strong> 6 – 8 Juni 2026</li></ul><p>Kegiatan belajar mengajar akan kembali normal pada <strong>Senin, 9 Juni 2026</strong>.</p><p>Semoga ibadah qurban kita diterima oleh Allah SWT. Selamat Hari Raya Idul Adha 1447 H.</p><p>Wassalamu\'alaikum warahmatullahi wabarakatuh.</p>',
            'category' => 'Umum',
            'status' => AnnouncementStatus::Published,
            'days_ago' => 7,
        ],
        [
            'title' => 'Kegiatan Pramuka Penggalang — Kemah Bumi 2026',
            'excerpt' => 'Gugus depan SDIT Al-Aziz mengadakan kegiatan Kemah Bumi untuk siswa kelas 4 dan 5 pada akhir bulan April 2026.',
            'content' => '<p>Assalamu\'alaikum warahmatullahi wabarakatuh.</p><p>Gugus Depan SDIT Al-Aziz dengan bangga mengumumkan kegiatan <strong>Kemah Bumi 2026</strong> yang ditujukan bagi seluruh anggota Pramuka Penggalang kelas 4 dan 5.</p><h3>Detail Kegiatan</h3><ul><li><strong>Tanggal:</strong> 25 – 27 April 2026</li><li><strong>Lokasi:</strong> Bumi Perkemahan Cibubur, Jakarta Timur</li><li><strong>Peserta:</strong> Siswa kelas 4 dan 5</li></ul><h3>Perlengkapan yang Dibawa</h3><ul><li>Seragam pramuka lengkap</li><li>Pakaian ganti secukupnya</li><li>Perlengkapan mandi dan tidur</li><li>Obat-obatan pribadi</li></ul><p>Biaya kegiatan sebesar <strong>Rp 250.000</strong> dapat diserahkan kepada wali kelas paling lambat <strong>18 April 2026</strong>.</p><p>Wassalamu\'alaikum warahmatullahi wabarakatuh.</p>',
            'category' => 'Kegiatan',
            'status' => AnnouncementStatus::Published,
            'days_ago' => 10,
        ],
        [
            'title' => 'Rapat Orang Tua/Wali Murid Semester Genap',
            'excerpt' => 'Sekolah mengundang seluruh orang tua/wali murid untuk hadir dalam rapat koordinasi semester genap yang akan dilaksanakan pada Sabtu, 19 April 2026.',
            'content' => '<p>Assalamu\'alaikum warahmatullahi wabarakatuh.</p><p>Yth. Bapak/Ibu Orang Tua/Wali Murid SDIT Al-Aziz,</p><p>Bersama surat ini kami mengundang Bapak/Ibu untuk hadir dalam <strong>Rapat Orang Tua/Wali Murid Semester Genap Tahun Ajaran 2025/2026</strong>.</p><h3>Waktu dan Tempat</h3><ul><li><strong>Hari/Tanggal:</strong> Sabtu, 19 April 2026</li><li><strong>Waktu:</strong> 08.00 – 11.00 WIB</li><li><strong>Tempat:</strong> Aula SDIT Al-Aziz</li></ul><h3>Agenda</h3><ul><li>Pemaparan hasil belajar siswa semester genap</li><li>Sosialisasi program akhir tahun</li><li>Diskusi terbuka bersama wali kelas</li></ul><p>Kehadiran Bapak/Ibu sangat kami harapkan demi kemajuan bersama.</p><p>Wassalamu\'alaikum warahmatullahi wabarakatuh.</p>',
            'category' => 'Umum',
            'status' => AnnouncementStatus::Published,
            'days_ago' => 12,
        ],
        [
            'title' => 'Lomba Sains dan Matematika Tingkat Kecamatan 2026',
            'excerpt' => 'SDIT Al-Aziz akan mengikutsertakan siswa terpilih dalam Lomba Sains dan Matematika tingkat kecamatan. Seleksi internal dilaksanakan 15 April 2026.',
            'content' => '<p>Assalamu\'alaikum warahmatullahi wabarakatuh.</p><p>Diberitahukan bahwa SDIT Al-Aziz akan berpartisipasi dalam <strong>Lomba Sains dan Matematika Tingkat Kecamatan Tahun 2026</strong>.</p><h3>Seleksi Internal</h3><p>Seleksi siswa akan dilaksanakan pada <strong>Selasa, 15 April 2026</strong> pukul 09.00 WIB di ruang kelas 5A dan 5B.</p><h3>Persyaratan Peserta Seleksi</h3><ul><li>Siswa kelas 4 dan 5</li><li>Nilai rata-rata Matematika dan IPA minimal 85</li><li>Mendapat persetujuan orang tua</li></ul><p>Siswa yang berminat dapat mendaftarkan diri kepada wali kelas masing-masing sebelum <strong>12 April 2026</strong>.</p><p>Wassalamu\'alaikum warahmatullahi wabarakatuh.</p>',
            'category' => 'Akademik',
            'status' => AnnouncementStatus::Published,
            'days_ago' => 15,
        ],
        [
            'title' => 'Peringatan Isra Miraj Nabi Muhammad SAW 1447 H',
            'excerpt' => 'SDIT Al-Aziz akan menyelenggarakan kegiatan peringatan Isra Miraj Nabi Muhammad SAW 1447 H dengan tema "Meraih Keberkahan Melalui Shalat".',
            'content' => '<p>Assalamu\'alaikum warahmatullahi wabarakatuh.</p><p>Dalam rangka memperingati <strong>Isra Miraj Nabi Muhammad SAW 1447 H</strong>, SDIT Al-Aziz menyelenggarakan kegiatan peringatan dengan tema:</p><blockquote><em>"Meraih Keberkahan Melalui Shalat"</em></blockquote><h3>Waktu dan Tempat</h3><ul><li><strong>Hari/Tanggal:</strong> Kamis, 27 Maret 2026</li><li><strong>Waktu:</strong> 08.00 – 10.00 WIB</li><li><strong>Tempat:</strong> Aula SDIT Al-Aziz</li></ul><p>Seluruh siswa diwajibkan hadir mengenakan seragam muslim/muslimah. Orang tua/wali murid dipersilakan turut hadir.</p><p>Wassalamu\'alaikum warahmatullahi wabarakatuh.</p>',
            'category' => 'Kegiatan',
            'status' => AnnouncementStatus::Published,
            'days_ago' => 20,
        ],
        [
            'title' => 'Pembaruan Tata Tertib Sekolah Semester Genap 2025/2026',
            'excerpt' => 'Sekolah menerbitkan pembaruan tata tertib siswa yang berlaku mulai semester genap. Seluruh siswa dan orang tua wajib membaca dan memahami aturan terbaru.',
            'content' => '<p>Assalamu\'alaikum warahmatullahi wabarakatuh.</p><p>Diberitahukan kepada seluruh siswa dan orang tua/wali bahwa SDIT Al-Aziz menerbitkan <strong>Pembaruan Tata Tertib Sekolah</strong> yang berlaku mulai Semester Genap Tahun Ajaran 2025/2026.</p><h3>Poin-Poin Pembaruan</h3><ul><li>Jam masuk sekolah dimajukan menjadi pukul <strong>07.00 WIB</strong></li><li>Penggunaan perangkat elektronik pribadi dilarang selama jam pelajaran</li><li>Seragam harian wajib sesuai ketentuan terbaru (lihat lampiran)</li><li>Keterlambatan lebih dari 3 kali dalam sebulan akan disampaikan kepada orang tua</li></ul><p>Buku tata tertib lengkap dapat diambil di ruang tata usaha. Mohon orang tua/wali menandatangani lembar persetujuan dan mengembalikannya kepada wali kelas.</p><p>Wassalamu\'alaikum warahmatullahi wabarakatuh.</p>',
            'category' => 'Umum',
            'status' => AnnouncementStatus::Published,
            'days_ago' => 25,
        ],
        [
            'title' => 'Program Tahfidz Intensif Ramadan 1447 H',
            'excerpt' => 'Selama bulan Ramadan, sekolah mengadakan program Tahfidz Intensif untuk siswa kelas 3–6. Pendaftaran dibuka mulai 1 Maret 2026.',
            'content' => '<p>Assalamu\'alaikum warahmatullahi wabarakatuh.</p><p>Menyambut bulan suci Ramadan 1447 H, SDIT Al-Aziz menyelenggarakan <strong>Program Tahfidz Intensif Ramadan</strong> bagi siswa kelas 3 hingga 6.</p><h3>Detail Program</h3><ul><li><strong>Durasi:</strong> Selama bulan Ramadan (Maret – April 2026)</li><li><strong>Waktu:</strong> Setiap hari pukul 07.00 – 08.00 WIB sebelum pelajaran dimulai</li><li><strong>Target:</strong> Hafalan 1–3 surah pendek per minggu</li></ul><h3>Pendaftaran</h3><p>Siswa yang berminat dapat mendaftarkan diri melalui wali kelas mulai <strong>1 Maret 2026</strong>. Kuota terbatas 30 siswa per angkatan.</p><p>Program ini gratis dan terbuka bagi seluruh siswa SDIT Al-Aziz.</p><p>Wassalamu\'alaikum warahmatullahi wabarakatuh.</p>',
            'category' => 'Kegiatan',
            'status' => AnnouncementStatus::Published,
            'days_ago' => 30,
        ],
        [
            'title' => 'Jadwal Imunisasi Siswa Kelas 1 dan 2 — Dinas Kesehatan',
            'excerpt' => 'Dinas Kesehatan Kota akan melaksanakan imunisasi rutin untuk siswa kelas 1 dan 2 di lingkungan sekolah pada bulan April 2026.',
            'content' => '<p>Assalamu\'alaikum warahmatullahi wabarakatuh.</p><p>Diberitahukan kepada orang tua/wali siswa kelas 1 dan 2 bahwa <strong>Dinas Kesehatan Kota</strong> akan melaksanakan kegiatan imunisasi rutin di SDIT Al-Aziz.</p><h3>Jadwal Imunisasi</h3><ul><li><strong>Kelas 1:</strong> Selasa, 22 April 2026 pukul 08.00 WIB</li><li><strong>Kelas 2:</strong> Rabu, 23 April 2026 pukul 08.00 WIB</li></ul><h3>Yang Perlu Diperhatikan</h3><ul><li>Pastikan anak dalam kondisi sehat pada hari imunisasi</li><li>Membawa buku kesehatan/KMS anak</li><li>Orang tua diperkenankan mendampingi</li></ul><p>Apabila anak memiliki riwayat alergi atau kondisi kesehatan tertentu, harap segera menginformasikan kepada wali kelas.</p><p>Wassalamu\'alaikum warahmatullahi wabarakatuh.</p>',
            'category' => 'Umum',
            'status' => AnnouncementStatus::Published,
            'days_ago' => 35,
        ],
        [
            'title' => 'Penambahan Fasilitas Perpustakaan Digital Sekolah',
            'excerpt' => 'SDIT Al-Aziz akan segera meluncurkan perpustakaan digital yang memungkinkan siswa mengakses ribuan buku dan materi belajar secara online.',
            'content' => '<p>Ini adalah draft pengumuman mengenai peluncuran perpustakaan digital. Konten masih dalam penyusunan.</p>',
            'category' => 'Akademik',
            'status' => AnnouncementStatus::Draft,
            'days_ago' => 1,
        ],
        [
            'title' => 'Pelatihan Guru — Implementasi Kurikulum Merdeka Fase B',
            'excerpt' => 'Seluruh guru kelas 3 dan 4 akan mengikuti pelatihan implementasi Kurikulum Merdeka Fase B yang dijadwalkan pada bulan Mei 2026.',
            'content' => '<p>Ini adalah draft pengumuman pelatihan guru. Jadwal dan detail masih dikonfirmasi.</p>',
            'category' => 'Akademik',
            'status' => AnnouncementStatus::Draft,
            'days_ago' => 3,
        ],
    ];

    public function run(): void
    {
        $categoryMap = Category::all()->keyBy('name');

        foreach ($this->announcements as $data) {
            $announcement = Announcement::create([
                'title' => $data['title'],
                'excerpt' => $data['excerpt'],
                'content' => $data['content'],
                'status' => $data['status'],
                'published_at' => $data['status'] === AnnouncementStatus::Published
                    ? now()->subDays($data['days_ago'])
                    : null,
                'expired_at' => null,
            ]);

            $category = $categoryMap->get($data['category']);
            if ($category) {
                $announcement->categories()->attach($category->id);
            }
        }
    }
}
