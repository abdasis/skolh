<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateNavigationRequest;
use App\Http\Requests\Admin\UpdatePageMetaRequest;
use App\Http\Requests\Admin\UpdateSectionPreferencesRequest;
use App\Http\Requests\Admin\UpdateSiteIdentityRequest;
use App\Http\Requests\Admin\UpdateWelcomeContentRequest;
use App\Models\SiteSetting;
use App\Services\SiteConfigService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function __construct(
        private readonly SiteConfigService $siteConfig,
    ) {}

    public function identity(): Response
    {
        $identity = $this->siteConfig->getIdentity();
        $social = $this->siteConfig->getSocial();

        $logoPath = SiteSetting::get('site_logo');
        $faviconPath = SiteSetting::get('site_favicon');

        return Inertia::render('admin/settings/site-identity', [
            'identity' => $identity,
            'social' => $social,
            'logoUrl' => $logoPath ? Storage::disk('public')->url($logoPath) : null,
            'faviconUrl' => $faviconPath ? Storage::disk('public')->url($faviconPath) : null,
        ]);
    }

    public function updateIdentity(UpdateSiteIdentityRequest $request): RedirectResponse
    {
        $data = $request->validated();

        SiteSetting::set('site_identity', json_encode([
            'name' => $data['name'],
            'tagline' => $data['tagline'] ?? null,
            'phone' => $data['phone'] ?? null,
            'email' => $data['email'] ?? null,
            'address' => $data['address'] ?? null,
            'hours' => $data['hours'] ?? null,
        ]));

        SiteSetting::set('site_social', json_encode([
            'facebook' => $data['facebook'] ?? null,
            'youtube' => $data['youtube'] ?? null,
            'instagram' => $data['instagram'] ?? null,
            'whatsapp' => $data['whatsapp'] ?? null,
        ]));

        if ($request->hasFile('logo')) {
            $oldPath = SiteSetting::get('site_logo');
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('logo')->store('site', 'public');
            SiteSetting::set('site_logo', $path);
        }

        if ($request->hasFile('favicon')) {
            $oldPath = SiteSetting::get('site_favicon');
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('favicon')->store('site', 'public');
            SiteSetting::set('site_favicon', $path);
        }

        $this->siteConfig->clearCache();

        return redirect()->back()->with('success', 'Identitas situs berhasil diperbarui.');
    }

    public function welcomeContent(): Response
    {
        $heroRaw = SiteSetting::get('welcome_hero');
        $aboutRaw = SiteSetting::get('welcome_about');

        $hero = $heroRaw ? json_decode($heroRaw, true) : [];
        $about = $aboutRaw ? json_decode($aboutRaw, true) : [];

        $bgPath = SiteSetting::get('site_hero_bg_image');
        $sidePath = SiteSetting::get('site_hero_side_image');

        return Inertia::render('admin/settings/welcome-content', [
            'hero' => array_merge([
                'subtitle' => null, 'title' => null, 'title_accent' => null,
                'description' => null, 'badge_text' => null,
                'cta_buttons' => [], 'stats' => [],
            ], is_array($hero) ? $hero : []),
            'about' => array_merge([
                'heading' => '', 'paragraphs' => [], 'feature_cards' => [],
            ], is_array($about) ? $about : []),
            'heroBgImageUrl' => $bgPath ? Storage::disk('public')->url($bgPath) : null,
            'heroSideImageUrl' => $sidePath ? Storage::disk('public')->url($sidePath) : null,
        ]);
    }

    public function updateWelcomeContent(UpdateWelcomeContentRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if (isset($data['hero'])) {
            SiteSetting::set('welcome_hero', json_encode($data['hero']));
        }

        if ($request->hasFile('hero_bg_image')) {
            $oldPath = SiteSetting::get('site_hero_bg_image');
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('hero_bg_image')->store('site', 'public');
            SiteSetting::set('site_hero_bg_image', $path);
        }

        if ($request->hasFile('hero_side_image')) {
            $oldPath = SiteSetting::get('site_hero_side_image');
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('hero_side_image')->store('site', 'public');
            SiteSetting::set('site_hero_side_image', $path);
        }

        if (isset($data['about'])) {
            SiteSetting::set('welcome_about', json_encode($data['about']));
        }

        $this->siteConfig->clearCache();

        return redirect()->back()->with('success', 'Konten halaman beranda berhasil diperbarui.');
    }

    public function navigation(): Response
    {
        return Inertia::render('admin/settings/navigation', [
            'headerItems' => $this->siteConfig->getNavHeader(),
            'footerGroups' => $this->siteConfig->getNavFooter(),
        ]);
    }

    public function updateNavigation(UpdateNavigationRequest $request): RedirectResponse
    {
        $data = $request->validated();

        SiteSetting::set('navigation_header', json_encode($data['header_items']));
        SiteSetting::set('navigation_footer', json_encode($data['footer_groups']));

        $this->siteConfig->clearCache();

        return redirect()->back()->with('success', 'Menu navigasi berhasil diperbarui.');
    }

    public function pageMeta(): Response
    {
        return Inertia::render('admin/settings/page-meta', [
            'pages' => $this->siteConfig->getAllPageMeta(),
        ]);
    }

    public function updatePageMeta(UpdatePageMetaRequest $request): RedirectResponse
    {
        $data = $request->validated();

        foreach ($data['pages'] as $page) {
            SiteSetting::set("page_meta:{$page['key']}", json_encode([
                'title' => $page['title'],
                'description' => $page['description'] ?? null,
            ]));
        }

        $this->siteConfig->clearCache();

        return redirect()->back()->with('success', 'Meta halaman berhasil diperbarui.');
    }

    public function sectionPreferences(): Response
    {
        return Inertia::render('admin/settings/section-preferences', [
            'sections' => $this->siteConfig->getSectionPreferences(),
        ]);
    }

    public function updateSectionPreferences(UpdateSectionPreferencesRequest $request): RedirectResponse
    {
        $data = $request->validated();

        SiteSetting::set('section_preferences', json_encode($data['sections']));

        $this->siteConfig->clearCache();

        return redirect()->back()->with('success', 'Preferensi seksi berhasil diperbarui.');
    }
}
