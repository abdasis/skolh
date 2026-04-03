<?php

namespace App\Services;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Cache;

class ThemeRegistryService
{
    private const CACHE_KEY = 'theme_registry';

    /**
     * Temukan semua tema yang tersedia dari direktori themes di resources/js/themes/.
     * Setiap tema harus memiliki manifest.json yang valid.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getAll(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function () {
            return $this->discoverThemes();
        });
    }

    /**
     * Ambil slug tema yang sedang aktif. Fallback ke default jika tidak valid.
     */
    public function getActiveSlug(): string
    {
        $slug = SiteSetting::get('active_theme', config('themes.default'));

        $themes = $this->getAll();
        $valid = collect($themes)->firstWhere('slug', $slug);

        if (!$valid || !$valid['isValid']) {
            return config('themes.default');
        }

        return $slug;
    }

    /**
     * Aktifkan tema berdasarkan slug dan hapus cache registry.
     */
    public function activate(string $slug): void
    {
        SiteSetting::set('active_theme', $slug);
        $this->clearCache();
    }

    /**
     * Hapus cache registry tema.
     */
    public function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function discoverThemes(): array
    {
        $themesPath = resource_path('js/themes');

        if (!is_dir($themesPath)) {
            return [];
        }

        $activeSlug = SiteSetting::get('active_theme', config('themes.default'));
        $themes = [];

        foreach (glob("{$themesPath}/*/manifest.json") as $manifestPath) {
            $theme = $this->parseManifest($manifestPath, $activeSlug);

            if ($theme !== null) {
                $themes[] = $theme;
            }
        }

        return $themes;
    }

    /**
     * Parse manifest.json dan bangun array data tema.
     *
     * @return array<string, mixed>|null
     */
    private function parseManifest(string $manifestPath, string $activeSlug): ?array
    {
        $raw = file_get_contents($manifestPath);

        if ($raw === false) {
            return null;
        }

        $data = json_decode($raw, true);

        if (!is_array($data) || !isset($data['slug'], $data['name'])) {
            return null;
        }

        $themeDir = dirname($manifestPath);
        $slug = $data['slug'];
        $missingPages = $this->getMissingPages($themeDir);

        $previewUrl = null;
        if (!empty($data['preview'])) {
            $previewFile = "{$themeDir}/{$data['preview']}";
            if (file_exists($previewFile)) {
                $publicDir = public_path("themes/{$slug}");
                $publicFile = "{$publicDir}/{$data['preview']}";

                if (!file_exists($publicFile)) {
                    if (!is_dir($publicDir)) {
                        mkdir($publicDir, 0755, true);
                    }
                    copy($previewFile, $publicFile);
                }

                $previewUrl = asset("themes/{$slug}/{$data['preview']}");
            }
        }

        return [
            'name' => $data['name'],
            'slug' => $slug,
            'version' => $data['version'] ?? '1.0.0',
            'author' => $data['author'] ?? '',
            'description' => $data['description'] ?? '',
            'preview' => $previewUrl,
            'isActive' => $slug === $activeSlug,
            'isValid' => empty($missingPages),
            'missingPages' => $missingPages,
        ];
    }

    /**
     * Cek halaman yang wajib ada di direktori tema.
     *
     * @return array<int, string>
     */
    private function getMissingPages(string $themeDir): array
    {
        $required = config('themes.required_pages', []);
        $missing = [];

        foreach ($required as $page) {
            if (!file_exists("{$themeDir}/pages/{$page}.tsx")) {
                $missing[] = $page;
            }
        }

        return $missing;
    }
}
