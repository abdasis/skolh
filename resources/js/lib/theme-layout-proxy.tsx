import { usePage } from '@inertiajs/react';
import { lazy, Suspense } from 'react';

const themeLayouts = import.meta.glob('../themes/*/layouts/guest-layout.tsx');

/**
 * Cache komponen layout per slug tema agar tidak di-import ulang setiap render.
 */
const layoutCache: Record<string, React.LazyExoticComponent<React.ComponentType<{ children: React.ReactNode }>>> = {};

const getLayout = (slug: string) => {
    if (layoutCache[slug]) {
        return layoutCache[slug];
    }

    const key = `../themes/${slug}/layouts/guest-layout.tsx`;
    const loader = themeLayouts[key] ?? themeLayouts['../themes/clean-emerald/layouts/guest-layout.tsx'];

    if (!loader) {
        throw new Error(`[theme] Guest layout not found for theme "${slug}"`);
    }

    layoutCache[slug] = lazy(() =>
        loader().then((mod: unknown) => ({
            default: (mod as { default: React.ComponentType<{ children: React.ReactNode }> }).default,
        })),
    );

    return layoutCache[slug];
};

const GuestLayoutProxy = ({ children }: { children: React.ReactNode }) => {
    const { activeTheme } = usePage<{ activeTheme: string }>().props;
    const theme = activeTheme ?? 'clean-emerald';
    const Layout = getLayout(theme);

    return (
        <Suspense fallback={null}>
            <Layout>{children}</Layout>
        </Suspense>
    );
};

export default GuestLayoutProxy;
