<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    /** @return array<string, mixed> */
    public function definition(): array
    {
        $names = [
            'Bpk. Ahmad Fauzi',
            'Ibu Siti Rahmawati',
            'Bpk. Hendra Wijaya',
            'Ibu Nurul Hidayah',
            'Bpk. Rizky Pratama',
            'Ibu Dewi Kusuma',
            'Bpk. Andi Saputra',
            'Ibu Fatimah Zahra',
        ];

        $roles = [
            'Orang Tua Siswa Kelas 1',
            'Orang Tua Siswa Kelas 2',
            'Orang Tua Siswa Kelas 3',
            'Orang Tua Siswa Kelas 4',
            'Orang Tua Siswa Kelas 5',
            'Orang Tua Siswa Kelas 6',
        ];

        $quotes = [
            'Alhamdulillah, anak saya sangat berkembang sejak bersekolah di sini. Bukan hanya nilai akademiknya yang meningkat, tapi akhlak dan hafalan Quran-nya pun luar biasa. Gurunya sabar dan profesional.',
            'SDIT Al-Aziz benar-benar menjawab harapan saya sebagai orang tua. Anak saya diajarkan kemandirian, disiplin, dan nilai-nilai Islam sejak dini. Saya bangga dengan perkembangan mereka.',
            'Fasilitas lengkap, guru-guru yang peduli, dan lingkungan yang islami. Anak saya betah dan semangat berangkat sekolah setiap hari. Komunitas orang tua di sini juga sangat supportif.',
            'Program Tahfidz yang terstruktur membuat anak saya berhasil menghafal 2 juz hanya dalam setahun. Metode pengajarannya menyenangkan sehingga anak tidak merasa terbebani.',
            'Komunikasi antara sekolah dan orang tua sangat baik. Kami selalu diinformasikan perkembangan anak secara berkala. Kepala sekolah dan guru sangat terbuka untuk berdiskusi.',
            'Sejak hari pertama, anak saya langsung nyaman. Guru kelasnya sangat perhatian dan sabar menghadapi anak-anak. Pendekatan pembelajaran yang fun membuat anak cepat beradaptasi.',
        ];

        $highlights = [
            'Akhlak & Hafalan Quran',
            'Kemandirian & Disiplin',
            'Lingkungan Islami',
            'Program Tahfidz',
            'Komunikasi Aktif',
            'Guru yang Perhatian',
            'Prestasi Akademik',
            'Karakter Islami',
        ];

        return [
            'name' => $this->faker->randomElement($names),
            'role' => $this->faker->randomElement($roles),
            'quote' => $this->faker->randomElement($quotes),
            'highlight' => $this->faker->randomElement($highlights),
            'sort_order' => $this->faker->numberBetween(0, 10),
        ];
    }
}
