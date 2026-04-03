<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Bpk. Ahmad Fauzi',
                'role' => 'Orang Tua Siswa Kelas 4',
                'quote' => 'Alhamdulillah, anak saya sangat berkembang sejak bersekolah di sini. Bukan hanya nilai akademiknya yang meningkat, tapi akhlak dan hafalan Quran-nya pun luar biasa. Gurunya sabar dan profesional.',
                'highlight' => 'Akhlak & Hafalan Quran',
                'sort_order' => 0,
            ],
            [
                'name' => 'Ibu Siti Rahmawati',
                'role' => 'Orang Tua Siswa Kelas 6',
                'quote' => 'SDIT Al-Aziz benar-benar menjawab harapan saya sebagai orang tua. Anak saya diajarkan kemandirian, disiplin, dan nilai-nilai Islam sejak dini. Saya bangga dengan perkembangan mereka.',
                'highlight' => 'Kemandirian & Disiplin',
                'sort_order' => 1,
            ],
            [
                'name' => 'Bpk. Hendra Wijaya',
                'role' => 'Orang Tua Siswa Kelas 2',
                'quote' => 'Fasilitas lengkap, guru-guru yang peduli, dan lingkungan yang islami. Anak saya betah dan semangat berangkat sekolah setiap hari. Komunitas orang tua di sini juga sangat supportif.',
                'highlight' => 'Lingkungan Islami',
                'sort_order' => 2,
            ],
            [
                'name' => 'Ibu Nurul Hidayah',
                'role' => 'Orang Tua Siswa Kelas 3',
                'quote' => 'Program Tahfidz yang terstruktur membuat anak saya berhasil menghafal 2 juz hanya dalam setahun. Metode pengajarannya menyenangkan sehingga anak tidak merasa terbebani.',
                'highlight' => 'Program Tahfidz',
                'sort_order' => 3,
            ],
            [
                'name' => 'Bpk. Rizky Pratama',
                'role' => 'Orang Tua Siswa Kelas 5',
                'quote' => 'Komunikasi antara sekolah dan orang tua sangat baik. Kami selalu diinformasikan perkembangan anak secara berkala. Kepala sekolah dan guru sangat terbuka untuk berdiskusi.',
                'highlight' => 'Komunikasi Aktif',
                'sort_order' => 4,
            ],
            [
                'name' => 'Ibu Dewi Kusuma',
                'role' => 'Orang Tua Siswa Kelas 1',
                'quote' => 'Sejak hari pertama, anak saya langsung nyaman. Guru kelasnya sangat perhatian dan sabar menghadapi anak-anak. Pendekatan pembelajaran yang fun membuat anak cepat beradaptasi.',
                'highlight' => 'Guru yang Perhatian',
                'sort_order' => 5,
            ],
        ];

        foreach ($testimonials as $data) {
            Testimonial::create($data);
        }
    }
}
