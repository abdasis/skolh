<?php

namespace Database\Seeders;

use App\Enums\GalleryAlbumStatus;
use App\Models\GalleryAlbum;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * @var array<int, array{title: string, description: string, status: GalleryAlbumStatus, images: list<string>}>
     */
    private array $albums = [
        [
            'title' => 'Upacara Hari Kemerdekaan',
            'description' => 'Dokumentasi upacara bendera memperingati Hari Kemerdekaan Republik Indonesia ke-79.',
            'status' => GalleryAlbumStatus::Published,
            'images' => [],
        ],
        [
            'title' => 'Pentas Seni Tahunan',
            'description' => 'Penampilan siswa dalam berbagai pertunjukan seni di acara pentas seni akhir tahun ajaran.',
            'status' => GalleryAlbumStatus::Published,
            'images' => [],
        ],
        [
            'title' => 'Kegiatan Pramuka',
            'description' => 'Berbagai kegiatan kepramukaan seperti berkemah, baris-berbaris, dan latihan keterampilan survival.',
            'status' => GalleryAlbumStatus::Published,
            'images' => [],
        ],
        [
            'title' => 'Wisuda dan Kelulusan',
            'description' => 'Momen bahagia wisuda dan pelepasan siswa kelas IX tahun ajaran 2023/2024.',
            'status' => GalleryAlbumStatus::Published,
            'images' => [],
        ],
        [
            'title' => 'Olimpiade Sains Sekolah',
            'description' => 'Kompetisi olimpiade sains tingkat sekolah yang diikuti siswa dari berbagai kelas.',
            'status' => GalleryAlbumStatus::Published,
            'images' => [],
        ],
        [
            'title' => 'Studi Lapangan Kelas VII',
            'description' => 'Kegiatan studi lapangan siswa kelas VII ke museum dan situs bersejarah di kota.',
            'status' => GalleryAlbumStatus::Published,
            'images' => [],
        ],
        [
            'title' => 'Olahraga dan Turnamen',
            'description' => 'Turnamen olahraga antar kelas meliputi basket, voli, dan futsal dalam rangka Pekan Olahraga Sekolah.',
            'status' => GalleryAlbumStatus::Published,
            'images' => [],
        ],
        [
            'title' => 'Kegiatan Ramadan',
            'description' => 'Dokumentasi kegiatan pesantren kilat, buka bersama, dan tadarus selama bulan Ramadan.',
            'status' => GalleryAlbumStatus::Draft,
            'images' => [],
        ],
    ];

    public function run(): void
    {
        foreach ($this->albums as $albumData) {
            $images = $albumData['images'];
            unset($albumData['images']);

            GalleryAlbum::firstOrCreate(
                ['title' => $albumData['title']],
                $albumData,
            );
        }
    }
}
