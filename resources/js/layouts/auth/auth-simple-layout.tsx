import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col bg-background">
            {/* Header — sticky top, transparent */}
            <header className="sticky top-0 z-10 px-6 py-4 md:px-10">
                <Link href={home()} className="inline-flex items-center gap-2">
                    <AppLogoIcon className="size-8 fill-current text-[var(--foreground)] dark:text-white" />
                </Link>
            </header>

            {/* Content — centered */}
            <main className="flex flex-1 flex-col items-center justify-center px-6 pb-6">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        {(title || description) && (
                            <div className="space-y-2 text-center">
                                {title && (
                                    <h1 className="text-xl font-medium">
                                        {title}
                                    </h1>
                                )}
                                {description && (
                                    <p className="text-sm text-muted-foreground">
                                        {description}
                                    </p>
                                )}
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </main>

            {/* Footer — bottom, transparent */}
            <footer className="flex items-center justify-between px-6 py-4 md:px-10">
                <p className="text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </p>
                <nav className="flex items-center gap-4">
                    <Link
                        href={home()}
                        className="text-xs text-muted-foreground hover:text-foreground"
                    >
                        Beranda
                    </Link>
                    <Link
                        href="#"
                        className="text-xs text-muted-foreground hover:text-foreground"
                    >
                        Tentang
                    </Link>
                    <Link
                        href="#"
                        className="text-xs text-muted-foreground hover:text-foreground"
                    >
                        Kontak
                    </Link>
                    <Link
                        href="#"
                        className="text-xs text-muted-foreground hover:text-foreground"
                    >
                        Bantuan
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
