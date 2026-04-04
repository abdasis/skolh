import { createInertiaApp } from '@inertiajs/react';
import type { ResolvedComponent } from '@inertiajs/react';
import type { Page } from '@inertiajs/core';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import GuestLayoutProxy from '@/lib/theme-layout-proxy';
import SettingsLayout from '@/layouts/settings/layout';
import SiteSettingsLayout from '@/layouts/site-settings-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const themePages = import.meta.glob('./themes/*/pages/**/*.tsx');
const adminPages = import.meta.glob('./pages/**/*.tsx');

/**
 * Halaman yang tidak menggunakan sistem tema (admin, auth, settings).
 */
const isNonThemePage = (name: string): boolean =>
    name.startsWith('auth/') ||
    name.startsWith('settings/') ||
    name === 'dashboard' ||
    name.startsWith('admin/');

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name, page) => {
        if (isNonThemePage(name)) {
            const component = adminPages[`./pages/${name}.tsx`];

            if (!component) {
                throw new Error(`Page not found: ${name}`);
            }

            return component() as Promise<ResolvedComponent>;
        }

        const activeTheme =
            ((page?.props as Record<string, unknown>)?.activeTheme as
                | string
                | undefined) ?? 'clean-emerald';
        const themeKey = `./themes/${activeTheme}/pages/${name}.tsx`;

        if (themePages[themeKey]) {
            return themePages[themeKey]() as Promise<ResolvedComponent>;
        }

        // Fallback ke clean-emerald jika tema aktif tidak punya halaman ini
        const fallbackKey = `./themes/clean-emerald/pages/${name}.tsx`;

        if (themePages[fallbackKey]) {
            console.warn(
                `[theme] Page "${name}" not found in theme "${activeTheme}", falling back to clean-emerald.`,
            );

            return themePages[fallbackKey]() as Promise<ResolvedComponent>;
        }

        throw new Error(`Page not found in any theme: ${name}`);
    },
    layout: (name, page: Page) => {
        switch (true) {
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            case name.startsWith('admin/settings/'):
                return SiteSettingsLayout;
            case name === 'dashboard' || name.startsWith('admin/'):
                return AppLayout;
            default:
                return GuestLayoutProxy;
        }
    },
    strictMode: true,
    withApp(app) {
        return <TooltipProvider delayDuration={0}>{app}</TooltipProvider>;
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
