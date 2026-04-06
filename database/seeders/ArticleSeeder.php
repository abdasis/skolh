<?php

namespace Database\Seeders;

use App\Enums\ArticleStatus;
use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * @var array<int, array{title: string, excerpt: string, content: string, category: string, status: ArticleStatus, days_ago: int}>
     */
    private array $articles = [
        [
            'title' => 'Mengenal Kurikulum Merdeka: Pendekatan Baru dalam Pendidikan Dasar',
            'excerpt' => 'Kurikulum Merdeka hadir sebagai angin segar dalam dunia pendidikan Indonesia. Artikel ini membahas prinsip dasar, struktur, dan bagaimana penerapannya di sekolah dasar.',
            'content' => '<p>Kurikulum Merdeka merupakan kebijakan pendidikan yang diluncurkan Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi sebagai respons atas kebutuhan pembaruan sistem belajar di Indonesia.</p><h3>Apa Itu Kurikulum Merdeka?</h3><p>Kurikulum Merdeka memberikan fleksibilitas kepada sekolah dan guru untuk menyesuaikan pembelajaran dengan kebutuhan siswa. Berbeda dari kurikulum sebelumnya, pendekatan ini berfokus pada pengembangan kompetensi dan karakter, bukan sekadar hafalan materi.</p><h3>Prinsip Utama</h3><ul><li>Pembelajaran berbasis projek (Project-Based Learning)</li><li>Diferensiasi — menyesuaikan dengan kemampuan masing-masing siswa</li><li>Asesmen formatif yang berkelanjutan</li><li>Penguatan Profil Pelajar Pancasila</li></ul><h3>Implementasi di Sekolah Dasar</h3><p>Di jenjang SD, Kurikulum Merdeka diterapkan melalui Fase A (kelas 1–2), Fase B (kelas 3–4), dan Fase C (kelas 5–6). Setiap fase memiliki capaian pembelajaran yang lebih holistik dan terintegrasi antarmata pelajaran.</p><p>SDIT Al-Aziz telah menerapkan Kurikulum Merdeka sejak tahun ajaran 2024/2025 dengan hasil yang menggembirakan — tingkat partisipasi siswa dalam kegiatan belajar meningkat signifikan.</p>',
            'category' => 'Akademik',
            'status' => ArticleStatus::Published,
            'days_ago' => 3,
        ],
        [
            'title' => 'Tips Mendampingi Anak Belajar di Rumah yang Efektif',
            'excerpt' => 'Peran orang tua dalam mendukung proses belajar anak di rumah sangat besar. Simak tips praktis agar pendampingan belajar menjadi momen yang menyenangkan dan produktif.',
            'content' => '<p>Belajar di rumah bukan sekadar mengerjakan PR. Dengan pendampingan yang tepat, rumah bisa menjadi lingkungan belajar yang kaya dan menyenangkan bagi anak.</p><h3>1. Ciptakan Ruang Belajar yang Nyaman</h3><p>Pilih sudut rumah yang tenang, cukup cahaya, dan bebas gangguan. Meja dan kursi yang ergonomis membantu anak berkonsentrasi lebih lama.</p><h3>2. Jadwal yang Konsisten</h3><p>Anak-anak berkembang dengan rutinitas. Tetapkan jam belajar yang tetap setiap hari — idealnya setelah istirahat siang atau setelah shalat Ashar.</p><h3>3. Jadilah Pendamping, Bukan Pengajar</h3><p>Peran orang tua bukan menggantikan guru. Dampingi anak, dengarkan kesulitannya, dan bantu ia menemukan jawaban sendiri alih-alih langsung memberikan solusi.</p><h3>4. Batasi Waktu Layar</h3><p>Gadget bisa menjadi alat belajar sekaligus gangguan. Sepakati bersama anak kapan gadget boleh digunakan dan untuk apa.</p><h3>5. Apresiasi Proses, Bukan Hanya Hasil</h3><p>Pujilah usaha anak, bukan hanya nilainya. "Kamu sudah berusaha keras hari ini" jauh lebih memotivasi daripada fokus pada angka rapor.</p>',
            'category' => 'Parenting',
            'status' => ArticleStatus::Published,
            'days_ago' => 7,
        ],
        [
            'title' => 'Pentingnya Literasi Sejak Dini bagi Perkembangan Anak',
            'excerpt' => 'Membangun kebiasaan membaca sejak usia dini memberikan fondasi yang kuat bagi perkembangan kognitif, emosional, dan sosial anak.',
            'content' => '<p>Literasi bukan hanya tentang kemampuan membaca dan menulis. Ia adalah pintu gerbang menuju pengetahuan, imajinasi, dan empati.</p><h3>Mengapa Literasi Dini Penting?</h3><p>Penelitian menunjukkan bahwa anak yang dikenalkan pada buku sejak usia dini memiliki kosakata 30% lebih banyak dibanding teman sebayanya. Lebih dari itu, membaca bersama orang tua memperkuat ikatan emosional dalam keluarga.</p><h3>Manfaat Literasi Dini</h3><ul><li><strong>Kognitif:</strong> Meningkatkan konsentrasi, daya ingat, dan kemampuan berpikir kritis</li><li><strong>Bahasa:</strong> Memperkaya kosakata dan kemampuan komunikasi</li><li><strong>Emosi:</strong> Anak belajar memahami perasaan melalui tokoh-tokoh dalam cerita</li><li><strong>Sosial:</strong> Membaca tentang keberagaman menumbuhkan rasa empati dan toleransi</li></ul><h3>Program Literasi di SDIT Al-Aziz</h3><p>Sekolah kami menjalankan program <em>15 Menit Membaca</em> setiap pagi sebelum pelajaran dimulai. Siswa bebas memilih buku dari perpustakaan sekolah sesuai minat mereka. Program ini telah berjalan dua tahun dan hasilnya luar biasa — kunjungan ke perpustakaan meningkat tiga kali lipat.</p>',
            'category' => 'Akademik',
            'status' => ArticleStatus::Published,
            'days_ago' => 12,
        ],
        [
            'title' => 'Tahfidz Al-Qur\'an: Membangun Generasi Penghafal yang Berkarakter',
            'excerpt' => 'Program Tahfidz di SDIT Al-Aziz bukan sekadar menghafal — ia membentuk karakter mulia, kedisiplinan, dan kecintaan pada Al-Qur\'an sejak dini.',
            'content' => '<p>Bismillahirrahmanirrahim. Menghafal Al-Qur\'an adalah salah satu amalan mulia yang dianjurkan dalam Islam. Di SDIT Al-Aziz, program Tahfidz bukan sekadar target hafalan — ia adalah perjalanan membentuk akhlak.</p><h3>Metode Pembelajaran Tahfidz</h3><p>Kami menggunakan metode <strong>Talaqqi</strong> — siswa menyimak dan menirukan bacaan guru secara langsung. Metode ini terbukti efektif menjaga kualitas tajwid dan mahraj huruf.</p><h3>Target per Jenjang</h3><ul><li><strong>Kelas 1–2:</strong> Juz 30 (surah An-Naba hingga An-Nas)</li><li><strong>Kelas 3–4:</strong> Juz 29 (surah Al-Mulk hingga Al-Mursalat)</li><li><strong>Kelas 5–6:</strong> Juz 28 (surah Al-Mujadila hingga At-Tahrim)</li></ul><h3>Dampak Program</h3><p>Selain hafalan, siswa yang aktif dalam program Tahfidz menunjukkan peningkatan dalam kedisiplinan, konsentrasi belajar, dan perilaku sehari-hari. Orang tua melaporkan perubahan positif yang nyata di rumah.</p>',
            'category' => 'Keislaman',
            'status' => ArticleStatus::Published,
            'days_ago' => 18,
        ],
        [
            'title' => 'Ekstrakurikuler Robotika: Menyiapkan Inovator Masa Depan',
            'excerpt' => 'Ekstrakurikuler Robotika SDIT Al-Aziz membuka pintu bagi siswa untuk belajar logika, pemrograman, dan kreativitas melalui dunia robot yang seru.',
            'content' => '<p>Di era industri 4.0, kemampuan berpikir komputasional dan pemrograman menjadi keterampilan yang semakin penting. SDIT Al-Aziz menjawab tantangan ini melalui ekstrakurikuler Robotika.</p><h3>Apa yang Dipelajari?</h3><p>Siswa belajar merakit robot sederhana menggunakan kit LEGO Education, lalu memprogram gerakannya menggunakan antarmuka visual yang ramah anak. Tidak dibutuhkan pengalaman coding sebelumnya.</p><h3>Manfaat Robotika bagi Anak</h3><ul><li>Melatih kemampuan berpikir logis dan sistematis</li><li>Mendorong kreativitas dalam memecahkan masalah</li><li>Membangun kemampuan kerja sama tim</li><li>Mengenalkan konsep STEM secara menyenangkan</li></ul><h3>Prestasi Tim Robotika</h3><p>Tahun lalu, tim Robotika SDIT Al-Aziz berhasil meraih <strong>Juara 2</strong> dalam Kompetisi Robotika SD Tingkat Kota.</p>',
            'category' => 'Kegiatan',
            'status' => ArticleStatus::Published,
            'days_ago' => 22,
        ],
        [
            'title' => 'Nutrisi Seimbang untuk Tumbuh Kembang Anak Sekolah Dasar',
            'excerpt' => 'Apa yang anak makan setiap hari berpengaruh langsung pada kemampuan belajar dan energi mereka. Pahami panduan nutrisi seimbang untuk si kecil.',
            'content' => '<p>Otak anak yang sedang berkembang membutuhkan asupan nutrisi yang tepat agar bisa belajar dengan optimal. Sayangnya, banyak anak usia sekolah dasar yang masih kurang mendapat gizi yang cukup.</p><h3>Porsi Gizi Seimbang Anak SD</h3><p>Mengacu pada Pedoman Gizi Seimbang Kemenkes, anak usia 6–12 tahun membutuhkan:</p><ul><li><strong>Karbohidrat:</strong> Nasi, roti, atau ubi sebagai sumber energi utama</li><li><strong>Protein:</strong> Ikan, telur, ayam, tahu, tempe untuk pertumbuhan otot dan otak</li><li><strong>Sayur dan buah:</strong> Minimal 5 porsi per hari untuk vitamin dan serat</li><li><strong>Susu:</strong> 2–3 gelas per hari untuk kalsium dan kesehatan tulang</li></ul><h3>Sarapan Adalah Kunci</h3><p>Penelitian membuktikan bahwa anak yang sarapan memiliki konsentrasi belajar 20% lebih baik. Menu sarapan ideal: karbohidrat kompleks + protein + buah segar.</p><h3>Kantin Sehat SDIT Al-Aziz</h3><p>Kantin sekolah kami menyajikan menu sehat bergizi yang diawasi oleh tim gizi. Tidak ada makanan mengandung MSG berlebihan, pewarna buatan, atau jajanan tidak higienis.</p>',
            'category' => 'Kesehatan',
            'status' => ArticleStatus::Published,
            'days_ago' => 28,
        ],
        [
            'title' => 'Peran Shalat dalam Membentuk Kedisiplinan Anak',
            'excerpt' => 'Shalat lima waktu bukan hanya ibadah — ia adalah latihan kedisiplinan, manajemen waktu, dan ketenangan jiwa yang luar biasa untuk anak-anak.',
            'content' => '<p>Salah satu hikmah shalat yang sering luput dari perhatian adalah dampaknya terhadap pembentukan karakter dan kedisiplinan anak.</p><h3>Shalat sebagai Latihan Disiplin</h3><p>Shalat mengajarkan anak untuk menghentikan aktivitas apapun ketika waktunya tiba. Lima kali dalam sehari, anak berlatih untuk tidak menunda kewajiban — sebuah kebiasaan yang akan terbawa sepanjang hidupnya.</p><h3>Manfaat Psikologis Shalat</h3><ul><li>Menenangkan pikiran dan mengurangi kecemasan</li><li>Memberikan jeda dari layar dan aktivitas fisik</li><li>Membangun rasa syukur dan perspektif positif</li><li>Memperkuat identitas spiritual anak</li></ul><h3>Shalat Berjamaah di Sekolah</h3><p>SDIT Al-Aziz mewajibkan shalat Dhuha berjamaah setiap pagi dan shalat Dhuhur berjamaah setiap hari. Kegiatan ini tidak hanya membangun kebiasaan ibadah, tetapi juga mempererat ukhuwah antarsiswa.</p>',
            'category' => 'Keislaman',
            'status' => ArticleStatus::Published,
            'days_ago' => 35,
        ],
        [
            'title' => 'Mengatasi Bullying di Sekolah: Panduan untuk Orang Tua dan Guru',
            'excerpt' => 'Bullying masih menjadi masalah serius di lingkungan sekolah. Kenali tanda-tandanya, pahami cara mencegahnya, dan ketahui langkah yang tepat jika anak Anda mengalaminya.',
            'content' => '<p>Bullying — baik verbal, fisik, maupun siber — dapat meninggalkan luka mendalam pada anak. Penanganan yang cepat dan tepat sangat menentukan pemulihan korban.</p><h3>Tanda-Tanda Anak Mengalami Bullying</h3><ul><li>Enggan pergi ke sekolah tanpa alasan jelas</li><li>Perubahan suasana hati yang tiba-tiba</li><li>Kehilangan barang atau uang saku yang tidak bisa dijelaskan</li><li>Keluhan fisik: sakit kepala atau perut yang sering muncul sebelum sekolah</li><li>Menarik diri dari teman dan keluarga</li></ul><h3>Langkah yang Harus Dilakukan</h3><ol><li>Dengarkan tanpa menghakimi — beri anak ruang untuk bercerita</li><li>Validasi perasaannya — "Wajar kamu merasa takut dan sedih"</li><li>Dokumentasikan kejadian yang dialami</li><li>Laporkan ke guru atau konselor sekolah</li><li>Jangan ajarkan anak untuk membalas dengan kekerasan</li></ol><h3>Kebijakan Anti-Bullying SDIT Al-Aziz</h3><p>Sekolah kami memiliki <strong>Tim Perlindungan Siswa</strong> yang menangani setiap laporan bullying secara serius. Setiap awal tahun ajaran, kami mengadakan sosialisasi anti-bullying untuk seluruh siswa.</p>',
            'category' => 'Parenting',
            'status' => ArticleStatus::Published,
            'days_ago' => 42,
        ],
        [
            'title' => 'Manfaat Belajar Kaligrafi bagi Perkembangan Motorik Anak',
            'excerpt' => 'Draft artikel tentang program kaligrafi sebagai sarana mengembangkan motorik halus dan kecintaan pada seni Islam.',
            'content' => '<p>Artikel ini sedang dalam proses penulisan. Akan membahas bagaimana kaligrafi Arab melatih ketelitian, kesabaran, dan motorik halus anak sekolah dasar.</p>',
            'category' => 'Keislaman',
            'status' => ArticleStatus::Draft,
            'days_ago' => 2,
        ],
        [
            'title' => 'Panduan Memilih Sekolah Dasar Islam Terpadu yang Tepat',
            'excerpt' => 'Draft artikel panduan bagi orang tua dalam memilih SDIT yang berkualitas sesuai kebutuhan dan nilai keluarga.',
            'content' => '<p>Artikel ini sedang dalam proses penulisan. Akan membahas kriteria-kriteria penting yang perlu dipertimbangkan orang tua saat memilih SDIT untuk putra-putrinya.</p>',
            'category' => 'Parenting',
            'status' => ArticleStatus::Draft,
            'days_ago' => 1,
        ],
    ];

    public function run(): void
    {
        $author = User::first() ?? User::factory()->create([
            'name' => 'Admin SDIT Al-Aziz',
            'email' => 'admin@sdit-alaziz.sch.id',
        ]);

        $categoryMap = Category::all()->keyBy('name');

        foreach ($this->articles as $data) {
            $article = Article::create([
                'user_id' => $author->id,
                'title' => $data['title'],
                'excerpt' => $data['excerpt'],
                'content' => $data['content'],
                'featured_image' => null,
                'status' => $data['status'],
                'published_at' => $data['status'] === ArticleStatus::Published
                    ? now()->subDays($data['days_ago'])
                    : null,
            ]);

            $category = $categoryMap->get($data['category']);
            if ($category) {
                $article->categories()->attach($category->id);
            }
        }
    }
}
