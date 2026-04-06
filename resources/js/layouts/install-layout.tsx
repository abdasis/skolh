import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const InstallLayout = ({ children }: Props) => {
    return (
        <div className="flex min-h-svh flex-col bg-background">
            <header className="sticky top-0 z-10 px-6 py-4 md:px-10">
                <Link href={home()} className="inline-flex items-center gap-2">
                    <AppLogoIcon className="size-8 fill-current text-[var(--foreground)] dark:text-white" />
                </Link>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center px-6 pb-6">
                {children}
            </main>

            <footer className="flex items-center justify-between px-6 py-4 md:px-10">
                <p className="text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </p>
                <nav className="flex items-center gap-4">
                    <Link href={home()} className="text-xs text-muted-foreground hover:text-foreground">
                        Beranda
                    </Link>
                    <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                        Tentang
                    </Link>
                    <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                        Kontak
                    </Link>
                    <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                        Bantuan
                    </Link>
                </nav>
            </footer>
        </div>
    );
};

export default InstallLayout;
