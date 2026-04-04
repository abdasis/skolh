<?php

namespace App\Services;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class SiteConfigService
{
    private const CACHE_KEY = 'site_config_resolved';

    /**
     * Default site identity values matching current hardcoded content.
     *
     * @var array<string, string|null>
     */
    private const DEFAULT_IDENTITY = [
        'name' => 'SDIT Al-Aziz',
        'tagline' => 'Sekolah Dasar Islam Terpadu',
        'phone' => '(031) 3095-xxxx',
        'email' => 'info@sditalaziz.sch.id',
        'address' => 'Jl. KH. Abdul Hamid No. 23, Bangkalan, Jawa Timur 69116',
        'hours' => 'Sen - Jum, 07:00 - 15:00 WIB',
        'map_url' => null,
    ];

    /**
     * Default social media links.
     *
     * @var array<string, string|null>
     */
    private const DEFAULT_SOCIAL = [
        'facebook' => null,
        'youtube' => null,
        'instagram' => null,
        'whatsapp' => null,
    ];

    /**
     * Default hero content matching current hardcoded values.
     *
     * @var array<string, mixed>
     */
    private const DEFAULT_HERO = [
        'subtitle' => 'Pendekatan Baru dalam',
        'title' => 'Pendidikan Islam',
        'title_accent' => 'Terpadu',
        'description' => 'SDIT Al-Aziz memadukan kurikulum nasional dengan nilai-nilai keislaman untuk membentuk generasi yang cerdas, berkarakter, dan berakhlak mulia.',
        'badge_text' => 'Lingkungan Belajar Islami',
        'bg_image_url' => null,
        'side_image_url' => null,
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
    ];

    /**
     * Default about content matching current hardcoded values.
     *
     * @var array<string, mixed>
     */
    private const DEFAULT_ABOUT = [
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
    ];

    /**
     * Default header navigation matching current hardcoded nav links.
     *
     * @var array<int, array<string, mixed>>
     */
    private const DEFAULT_NAV_HEADER = [
        ['id' => 'beranda', 'label' => 'Beranda', 'href' => '/', 'type' => 'route', 'route_name' => 'home', 'visible' => true, 'order' => 1],
        ['id' => 'tentang', 'label' => 'Tentang', 'href' => '#tentang', 'type' => 'anchor', 'visible' => true, 'order' => 2],
        ['id' => 'program', 'label' => 'Program', 'href' => '#program', 'type' => 'anchor', 'visible' => true, 'order' => 3],
        ['id' => 'fasilitas', 'label' => 'Fasilitas', 'href' => '#fasilitas', 'type' => 'anchor', 'visible' => true, 'order' => 4],
        ['id' => 'berita', 'label' => 'Berita', 'href' => '/articles', 'type' => 'route', 'route_name' => 'articles.index', 'visible' => true, 'order' => 5],
        ['id' => 'pengumuman', 'label' => 'Pengumuman', 'href' => '/announcements', 'type' => 'route', 'route_name' => 'announcements.index', 'visible' => true, 'order' => 6],
        ['id' => 'organisasi', 'label' => 'Organisasi', 'href' => '/organization', 'type' => 'route', 'route_name' => 'organization.index', 'visible' => true, 'order' => 7],
        ['id' => 'kontak', 'label' => 'Kontak', 'href' => '/contact', 'type' => 'route', 'route_name' => 'contact.index', 'visible' => true, 'order' => 8],
    ];

    /**
     * Default footer navigation groups matching current hardcoded footer links.
     *
     * @var array<int, array<string, mixed>>
     */
    private const DEFAULT_NAV_FOOTER = [
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
    ];

    /**
     * Default section preferences - all enabled with sensible limits.
     *
     * @var array<string, array<string, mixed>>
     */
    private const DEFAULT_SECTIONS = [
        'hero' => ['enabled' => true],
        'about' => ['enabled' => true],
        'agenda' => ['enabled' => true, 'limit' => 6],
        'facilities' => ['enabled' => true, 'limit' => 8],
        'curricula' => ['enabled' => true],
        'articles' => ['enabled' => true, 'limit' => 5],
        'testimonials' => ['enabled' => true, 'limit' => 6],
        'alumni' => ['enabled' => true],
        'contact' => ['enabled' => true],
    ];

    /**
     * Default page meta entries per page key.
     *
     * @var array<string, array<string, string|null>>
     */
    private const DEFAULT_PAGE_META = [
        'welcome' => ['title' => '{site_name} - {tagline}', 'description' => 'Pendidikan berkualitas berbasis nilai-nilai Islam untuk generasi unggul dan berakhlak mulia.'],
        'articles/index' => ['title' => 'Berita - {site_name}', 'description' => null],
        'announcements/index' => ['title' => 'Pengumuman - {site_name}', 'description' => null],
        'achievements/index' => ['title' => 'Prestasi - {site_name}', 'description' => null],
        'extracurriculars/index' => ['title' => 'Ekstrakurikuler - {site_name}', 'description' => null],
        'organization/index' => ['title' => 'Organisasi - {site_name}', 'description' => null],
        'gallery/index' => ['title' => 'Galeri - {site_name}', 'description' => null],
    ];

    /**
     * Resolve and return the full site config for the current request.
     * Uses a composite cache key to avoid N reads per request.
     *
     * @param string $pageKey Inertia page name (e.g. 'welcome', 'articles/index')
     * @return array<string, mixed>
     */
    public function resolve(string $pageKey = 'welcome'): array
    {
        $base = Cache::rememberForever(self::CACHE_KEY, fn () => $this->buildBaseConfig());

        $pageMeta = $this->resolvePageMeta($pageKey, $base['identity']['name'], $base['identity']['tagline'] ?? null);

        return array_merge($base, ['pageMeta' => $pageMeta]);
    }

    /**
     * Build the base config (without pageMeta, which is per-request).
     *
     * @return array<string, mixed>
     */
    private function buildBaseConfig(): array
    {
        $identity = $this->getIdentity();
        $logoPath = SiteSetting::get('site_logo');
        $faviconPath = SiteSetting::get('site_favicon');

        return [
            'identity' => array_merge($identity, [
                'logo_url' => $logoPath ? Storage::disk('public')->url($logoPath) : null,
                'favicon_url' => $faviconPath ? Storage::disk('public')->url($faviconPath) : null,
            ]),
            'social' => $this->getSocial(),
            'navigation' => [
                'header' => $this->getNavHeader(),
                'footer' => $this->getNavFooter(),
            ],
            'sections' => $this->getSectionPreferences(),
            'hero' => $this->getHeroContent(),
            'about' => $this->getAboutContent(),
        ];
    }

    /**
     * Get site identity fields (without logo/favicon URLs).
     *
     * @return array<string, string|null>
     */
    public function getIdentity(): array
    {
        $raw = SiteSetting::get('site_identity');
        $data = $raw ? json_decode($raw, true) : [];

        return array_merge(self::DEFAULT_IDENTITY, is_array($data) ? $data : []);
    }

    /**
     * Get social media links.
     *
     * @return array<string, string|null>
     */
    public function getSocial(): array
    {
        $raw = SiteSetting::get('site_social');
        $data = $raw ? json_decode($raw, true) : [];

        return array_merge(self::DEFAULT_SOCIAL, is_array($data) ? $data : []);
    }

    /**
     * Get header navigation items, sorted by order.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getNavHeader(): array
    {
        $raw = SiteSetting::get('navigation_header');
        $data = $raw ? json_decode($raw, true) : null;

        $items = is_array($data) ? $data : self::DEFAULT_NAV_HEADER;

        return $this->sortNavItemsRecursively($items);
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
     * @return array<int, array<string, mixed>>
     */
    private function sortNavItemsRecursively(array $items): array
    {
        usort($items, fn ($a, $b) => ($a['order'] ?? 0) <=> ($b['order'] ?? 0));

        foreach ($items as &$item) {
            if (isset($item['children']) && is_array($item['children']) && $item['children'] !== []) {
                $item['children'] = $this->sortNavItemsRecursively($item['children']);
            }
        }

        return $items;
    }

    /**
     * Get footer navigation groups.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getNavFooter(): array
    {
        $raw = SiteSetting::get('navigation_footer');
        $data = $raw ? json_decode($raw, true) : null;

        return is_array($data) ? $data : self::DEFAULT_NAV_FOOTER;
    }

    /**
     * Get section preferences with defaults merged in.
     *
     * @return array<string, array<string, mixed>>
     */
    public function getSectionPreferences(): array
    {
        $raw = SiteSetting::get('section_preferences');
        $data = $raw ? json_decode($raw, true) : [];

        if (!is_array($data)) {
            return self::DEFAULT_SECTIONS;
        }

        $merged = self::DEFAULT_SECTIONS;
        foreach ($data as $key => $value) {
            if (isset($merged[$key]) && is_array($value)) {
                $merged[$key] = array_merge($merged[$key], $value);
            }
        }

        return $merged;
    }

    /**
     * Get hero content with defaults.
     *
     * @return array<string, mixed>
     */
    public function getHeroContent(): array
    {
        $raw = SiteSetting::get('welcome_hero');
        $data = $raw ? json_decode($raw, true) : [];

        $hero = is_array($data) && !empty($data)
            ? array_merge(self::DEFAULT_HERO, $data)
            : self::DEFAULT_HERO;

        $bgPath = SiteSetting::get('site_hero_bg_image');
        $sidePath = SiteSetting::get('site_hero_side_image');

        $hero['bg_image_url'] = $bgPath ? Storage::disk('public')->url($bgPath) : null;
        $hero['side_image_url'] = $sidePath ? Storage::disk('public')->url($sidePath) : null;

        return $hero;
    }

    /**
     * Get about content with defaults.
     *
     * @return array<string, mixed>
     */
    public function getAboutContent(): array
    {
        $raw = SiteSetting::get('welcome_about');
        $data = $raw ? json_decode($raw, true) : [];

        return is_array($data) && !empty($data) ? array_merge(self::DEFAULT_ABOUT, $data) : self::DEFAULT_ABOUT;
    }

    /**
     * Resolve page meta for a given page key, with placeholder replacement.
     *
     * @return array<string, string|null>
     */
    public function resolvePageMeta(string $pageKey, string $siteName, ?string $tagline): array
    {
        $raw = SiteSetting::get("page_meta:{$pageKey}");
        $data = $raw ? json_decode($raw, true) : null;

        $defaults = self::DEFAULT_PAGE_META[$pageKey] ?? ['title' => '{site_name}', 'description' => null];
        $meta = is_array($data) ? $data : $defaults;

        $replacements = ['{site_name}' => $siteName, '{tagline}' => $tagline ?? ''];

        return [
            'title' => str_replace(array_keys($replacements), array_values($replacements), $meta['title'] ?? '{site_name}'),
            'description' => isset($meta['description']) && $meta['description'] !== null
                ? str_replace(array_keys($replacements), array_values($replacements), $meta['description'])
                : null,
        ];
    }

    /**
     * Get all known page meta entries for the admin page meta editor.
     *
     * @return array<int, array<string, string|null>>
     */
    public function getAllPageMeta(): array
    {
        $pages = [
            ['key' => 'welcome', 'label' => 'Beranda'],
            ['key' => 'articles/index', 'label' => 'Berita'],
            ['key' => 'announcements/index', 'label' => 'Pengumuman'],
            ['key' => 'achievements/index', 'label' => 'Prestasi'],
            ['key' => 'extracurriculars/index', 'label' => 'Ekstrakurikuler'],
            ['key' => 'organization/index', 'label' => 'Organisasi'],
            ['key' => 'gallery/index', 'label' => 'Galeri'],
        ];

        return array_map(function (array $page) {
            $raw = SiteSetting::get("page_meta:{$page['key']}");
            $data = $raw ? json_decode($raw, true) : null;
            $defaults = self::DEFAULT_PAGE_META[$page['key']] ?? ['title' => '{site_name}', 'description' => null];
            $meta = is_array($data) ? $data : $defaults;

            return [
                'key' => $page['key'],
                'label' => $page['label'],
                'title' => $meta['title'] ?? $defaults['title'],
                'description' => $meta['description'] ?? $defaults['description'],
            ];
        }, $pages);
    }

    /**
     * Clear the composite config cache. Call after any setting group is saved.
     */
    public function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}
