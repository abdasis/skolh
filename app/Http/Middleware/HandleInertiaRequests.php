<?php

namespace App\Http\Middleware;

use App\Models\ContactMessage;
use App\Services\SiteConfigService;
use App\Services\ThemeRegistryService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    /**
     * Determine if the current request is for a public (non-admin, non-auth) page.
     */
    private function isPublicPage(Request $request): bool
    {
        $path = ltrim($request->path(), '/');

        return !str_starts_with($path, 'admin')
            && !str_starts_with($path, 'settings')
            && !str_starts_with($path, 'dashboard')
            && !str_starts_with($path, 'login')
            && !str_starts_with($path, 'register')
            && !str_starts_with($path, 'forgot-password')
            && !str_starts_with($path, 'reset-password')
            && !str_starts_with($path, 'email')
            && !str_starts_with($path, 'two-factor');
    }

    /**
     * Derive the Inertia page key from the request path for page meta resolution.
     */
    private function resolvePageKey(Request $request): string
    {
        $path = trim($request->path(), '/');

        if ($path === '' || $path === '/') {
            return 'welcome';
        }

        $map = [
            'articles' => 'articles/index',
            'announcements' => 'announcements/index',
            'achievements' => 'achievements/index',
            'extracurriculars' => 'extracurriculars/index',
            'organization' => 'organization/index',
            'gallery' => 'gallery/index',
            'admission' => 'admission/index',
        ];

        return $map[$path] ?? $path;
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'unreadContactMessagesCount' => $request->user() ? ContactMessage::unread()->count() : 0,
            'activeTheme' => app(ThemeRegistryService::class)->getActiveSlug(),
            'siteConfig' => $this->isPublicPage($request)
                ? app(SiteConfigService::class)->resolve($this->resolvePageKey($request))
                : null,
        ];
    }
}
