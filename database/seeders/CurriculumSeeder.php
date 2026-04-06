<?php

namespace Database\Seeders;

use App\Enums\CurriculumStatus;
use App\Models\Curriculum;
use Illuminate\Database\Seeder;

class CurriculumSeeder extends Seeder
{
    public function run(): void
    {
        if (Curriculum::where('status', CurriculumStatus::Active)->count() >= 5) {
            return;
        }

        $curricula = [
            [
                'name' => 'Kurikulum Merdeka',
                'code' => 'KMB',
                'year' => 2022,
                'level' => 'SD',
                'slug' => 'kurikulum-merdeka',
                'icon' => 'GraduationCap',
                'description' => 'Kurikulum Merdeka memberikan kebebasan kepada sekolah untuk merancang pembelajaran yang sesuai dengan kebutuhan dan potensi peserta didik, berbasis Profil Pelajar Pancasila.',
                'content' => null,
                'status' => CurriculumStatus::Active,
                'effective_date' => '2022-07-01',
                'expired_date' => null,
                'document' => null,
            ],
            [
                'name' => 'Tahfidz Al-Quran',
                'code' => 'THQ',
                'year' => 2023,
                'level' => 'SD',
                'slug' => 'tahfidz-al-quran',
                'icon' => 'BookOpen',
                'description' => 'Program hafalan Al-Quran terstruktur dengan target minimal 3 juz selama 6 tahun menggunakan metode Talaqqi dan Tikrar yang menyenangkan bagi siswa.',
                'content' => null,
                'status' => CurriculumStatus::Active,
                'effective_date' => '2023-07-01',
                'expired_date' => null,
                'document' => null,
            ],
            [
                'name' => 'Pendidikan Agama Islam Terpadu',
                'code' => 'PAIT',
                'year' => 2023,
                'level' => 'SD',
                'slug' => 'pendidikan-agama-islam-terpadu',
                'icon' => 'Scroll',
                'description' => 'Pembelajaran agama Islam yang terintegrasi dengan seluruh mata pelajaran, membentuk karakter islami dan akhlak mulia dalam keseharian siswa.',
                'content' => null,
                'status' => CurriculumStatus::Active,
                'effective_date' => '2023-07-01',
                'expired_date' => null,
                'document' => null,
            ],
            [
                'name' => 'Sains dan Teknologi',
                'code' => 'STEK',
                'year' => 2023,
                'level' => 'SD',
                'slug' => 'sains-dan-teknologi',
                'icon' => 'FlaskConical',
                'description' => 'Program STEM yang mengembangkan kemampuan berpikir kritis, kreatif, dan inovatif melalui eksperimen ilmiah dan pengenalan teknologi sejak dini.',
                'content' => null,
                'status' => CurriculumStatus::Active,
                'effective_date' => '2023-07-01',
                'expired_date' => null,
                'document' => null,
            ],
            [
                'name' => 'Bahasa Arab dan Inggris',
                'code' => 'BAIN',
                'year' => 2023,
                'level' => 'SD',
                'slug' => 'bahasa-arab-dan-inggris',
                'icon' => 'Library',
                'description' => 'Pembelajaran bilingual intensif dalam Bahasa Arab dan Inggris untuk mempersiapkan siswa berkomunikasi global sekaligus memahami sumber-sumber ilmu Islam.',
                'content' => null,
                'status' => CurriculumStatus::Active,
                'effective_date' => '2023-07-01',
                'expired_date' => null,
                'document' => null,
            ],
            [
                'name' => 'Life Skills dan Kepemimpinan',
                'code' => 'LSK',
                'year' => 2023,
                'level' => 'SD',
                'slug' => 'life-skills-dan-kepemimpinan',
                'icon' => 'Star',
                'description' => 'Program pengembangan kecakapan hidup dan jiwa kepemimpinan melalui kegiatan praktis, outbound, dan pembiasaan kemandirian sejak usia dini.',
                'content' => null,
                'status' => CurriculumStatus::Active,
                'effective_date' => '2023-07-01',
                'expired_date' => null,
                'document' => null,
            ],
        ];

        foreach ($curricula as $data) {
            Curriculum::firstOrCreate(['slug' => $data['slug']], $data);
        }
    }
}
