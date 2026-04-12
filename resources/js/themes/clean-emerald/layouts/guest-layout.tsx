import { headerStyles } from '@/themes/clean-emerald/headers';
import GuestFooter from '@/themes/clean-emerald/components/guest-footer';
import type { SiteConfig } from '@/types/site-config';
import { Head, usePage } from '@inertiajs/react';
import { Suspense } from 'react';

/**
 * Tinggi total header per style:
 * style-one: top bar (~28px / 1.75rem) + navbar (~60px / 3.75rem) = ~88px
 * style-two: hanya navbar (~64px / 4rem)
 * style-three: transparan — tidak butuh offset, konten mulai dari y=0
 */
const MAIN_PADDING: Record<string, string> = {
    'style-one': 'pt-[calc(1.75rem+3.75rem)]',
    'style-two': 'pt-[4rem]',
    'style-three': 'pt-0',
};

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
    const { siteConfig } = usePage<{ siteConfig: SiteConfig | null }>().props;

    const activeKey = siteConfig?.emeraldHeaderStyle ?? 'style-one';
    const found = headerStyles.find((s) => s.key === activeKey);
    const ActiveHeader = found ? found.component : headerStyles[0].component;
    const mainPadding = MAIN_PADDING[activeKey] ?? MAIN_PADDING['style-one'];

    return (
        <div className="flex min-h-screen flex-col bg-white font-[Plus_Jakarta_Sans] text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>
            <Suspense fallback={null}>
                <ActiveHeader />
            </Suspense>
            <main className={`flex-1 ${mainPadding}`}>{children}</main>
            <GuestFooter />
        </div>
    );
};

export default GuestLayout;
