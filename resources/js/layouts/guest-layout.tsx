import GuestFooter from '@/components/guest/guest-footer';
import GuestHeader from '@/components/guest/guest-header';
import { Head } from '@inertiajs/react';

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col bg-white font-[Plus_Jakarta_Sans] text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>
            <GuestHeader />
            <main className="flex-1">{children}</main>
            <GuestFooter />
        </div>
    );
};

export default GuestLayout;
