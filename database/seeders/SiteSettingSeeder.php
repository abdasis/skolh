<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        SiteSetting::set('active_theme', 'clean-emerald');

        SiteSetting::set('site_identity', json_encode([
            'name' => 'SDIT Al-Aziz',
            'tagline' => 'Sekolah Dasar Islam Terpadu',
            'phone' => '(031) 3095-xxxx',
            'email' => 'info@sditalaziz.sch.id',
            'address' => 'Jl. KH. Abdul Hamid No. 23, Bangkalan, Jawa Timur 69116',
            'hours' => 'Sen - Jum, 07:00 - 15:00 WIB',
            'map_url' => null,
        ]));

        SiteSetting::set('site_social', json_encode([
            'facebook' => null,
            'youtube' => null,
            'instagram' => null,
            'whatsapp' => null,
        ]));

        SiteSetting::set('welcome_hero', json_encode([
            'subtitle' => 'Pendekatan Baru dalam',
            'title' => 'Pendidikan Islam',
            'title_accent' => 'Terpadu',
            'description' => 'SDIT Al-Aziz memadukan kurikulum nasional dengan nilai-nilai keislaman untuk membentuk generasi yang cerdas, berkarakter, dan berakhlak mulia.',
            'badge_text' => 'Lingkungan Belajar Islami',
            'cta_buttons' => [
                ['label' => 'Daftar Sekarang', 'href' => '#kontak', 'variant' => 'primary'],
                ['label' => 'Program Kami', 'href' => '#program', 'variant' => 'secondary'],
            ],
            'stats' => [
                ['value' => '500+', 'label' => 'Siswa Aktif'],
                ['value' => '50+', 'label' => 'Pendidik'],
                ['value' => '15+', 'label' => 'Tahun Berdiri'],
                ['value' => '98%', 'label' => 'Kelulusan'],
            ],
        ]));

        SiteSetting::set('welcome_about', json_encode([
            'heading' => 'Pendidikan Berkualitas dengan Nilai-Nilai Islam',
            'paragraphs' => [
                'SDIT Al-Aziz adalah sekolah dasar Islam terpadu yang berkomitmen untuk memberikan pendidikan berkualitas tinggi dengan landasan nilai-nilai Islam yang kuat.',
                'Dengan tenaga pendidik yang profesional dan berpengalaman, kami membimbing setiap siswa untuk mencapai potensi terbaik mereka dalam aspek akademik dan karakter.',
            ],
            'feature_cards' => [
                ['icon' => 'BookOpen', 'title' => 'Kurikulum Terpadu', 'description' => 'Kurikulum nasional terintegrasi keislaman', 'stat_value' => '6', 'stat_label' => 'Tahun'],
                ['icon' => 'Heart', 'title' => 'Pembinaan Akhlak', 'description' => 'Pembiasaan ibadah dan akhlak mulia', 'stat_value' => '15+', 'stat_label' => 'Program'],
                ['icon' => 'Star', 'title' => 'Prestasi Gemilang', 'description' => 'Meraih prestasi di berbagai kompetisi', 'stat_value' => '50+', 'stat_label' => 'Prestasi'],
                ['icon' => 'Users', 'title' => 'Guru Profesional', 'description' => 'Tenaga pendidik bersertifikasi', 'stat_value' => '30+', 'stat_label' => 'Guru'],
            ],
        ]));

        SiteSetting::set('navigation_header', json_encode([
            ['id' => 'beranda', 'label' => 'Beranda', 'href' => '/', 'type' => 'route', 'route_name' => 'home', 'visible' => true, 'order' => 1],
            ['id' => 'tentang', 'label' => 'Tentang', 'href' => '#tentang', 'type' => 'anchor', 'visible' => true, 'order' => 2],
            ['id' => 'program', 'label' => 'Program', 'href' => '#program', 'type' => 'anchor', 'visible' => true, 'order' => 3],
            ['id' => 'fasilitas', 'label' => 'Fasilitas', 'href' => '#fasilitas', 'type' => 'anchor', 'visible' => true, 'order' => 4],
            ['id' => 'berita', 'label' => 'Berita', 'href' => '/articles', 'type' => 'route', 'route_name' => 'articles.index', 'visible' => true, 'order' => 5],
            ['id' => 'pengumuman', 'label' => 'Pengumuman', 'href' => '/announcements', 'type' => 'route', 'route_name' => 'announcements.index', 'visible' => true, 'order' => 6],
            ['id' => 'organisasi', 'label' => 'Organisasi', 'href' => '/organization', 'type' => 'route', 'route_name' => 'organization.index', 'visible' => true, 'order' => 7],
            ['id' => 'kontak', 'label' => 'Kontak', 'href' => '/contact', 'type' => 'route', 'route_name' => 'contact.index', 'visible' => true, 'order' => 8],
        ]));

        SiteSetting::set('navigation_footer', json_encode([
            [
                'title' => 'Sekolah',
                'links' => [
                    ['label' => 'Tentang Kami', 'href' => '#tentang', 'type' => 'anchor'],
                    ['label' => 'Visi & Misi', 'href' => '#', 'type' => 'anchor'],
                    ['label' => 'Guru & Staff', 'href' => '#', 'type' => 'anchor'],
                    ['label' => 'Fasilitas', 'href' => '#fasilitas', 'type' => 'anchor'],
                    ['label' => 'Kurikulum', 'href' => '#', 'type' => 'anchor'],
                    ['label' => 'Kontak', 'href' => '#kontak', 'type' => 'anchor'],
                ],
            ],
            [
                'title' => 'Akademik',
                'links' => [
                    ['label' => 'Program Unggulan', 'href' => '#program', 'type' => 'anchor'],
                    ['label' => 'Ekstrakurikuler', 'href' => '#', 'type' => 'anchor'],
                    ['label' => 'Prestasi', 'href' => '#', 'type' => 'anchor'],
                    ['label' => 'Kalender Akademik', 'href' => '#', 'type' => 'anchor'],
                    ['label' => 'Berita', 'href' => '/articles', 'type' => 'route'],
                    ['label' => 'Pendaftaran SPMB', 'href' => '/admission', 'type' => 'route'],
                    ['label' => 'Cek Status Pendaftaran', 'href' => '/admission/check', 'type' => 'route'],
                ],
            ],
            [
                'title' => 'Informasi',
                'links' => [
                    ['label' => 'Pengumuman', 'href' => '/announcements', 'type' => 'route'],
                    ['label' => 'Agenda', 'href' => '#', 'type' => 'anchor'],
                    ['label' => 'Galeri', 'href' => '#', 'type' => 'anchor'],
                    ['label' => 'Artikel', 'href' => '/articles', 'type' => 'route'],
                    ['label' => 'Syarat Layanan', 'href' => '#', 'type' => 'anchor'],
                    ['label' => 'Kebijakan Privasi', 'href' => '#', 'type' => 'anchor'],
                ],
            ],
        ]));

        SiteSetting::set('section_preferences', json_encode([
            'hero' => ['enabled' => true],
            'about' => ['enabled' => true],
            'agenda' => ['enabled' => true, 'limit' => 6],
            'facilities' => ['enabled' => true, 'limit' => 8],
            'curricula' => ['enabled' => true],
            'articles' => ['enabled' => true, 'limit' => 5],
            'testimonials' => ['enabled' => true, 'limit' => 6],
            'alumni' => ['enabled' => true],
            'contact' => ['enabled' => true],
        ]));

        $pageMetaDefaults = [
            'welcome' => ['title' => '{site_name} - {tagline}', 'description' => 'Pendidikan berkualitas berbasis nilai-nilai Islam untuk generasi unggul dan berakhlak mulia.'],
            'articles/index' => ['title' => 'Berita - {site_name}', 'description' => null],
            'announcements/index' => ['title' => 'Pengumuman - {site_name}', 'description' => null],
            'achievements/index' => ['title' => 'Prestasi - {site_name}', 'description' => null],
            'extracurriculars/index' => ['title' => 'Ekstrakurikuler - {site_name}', 'description' => null],
            'organization/index' => ['title' => 'Organisasi - {site_name}', 'description' => null],
            'gallery/index' => ['title' => 'Galeri - {site_name}', 'description' => null],
        ];

        foreach ($pageMetaDefaults as $key => $meta) {
            SiteSetting::set("page_meta:{$key}", json_encode($meta));
        }
    }
}
