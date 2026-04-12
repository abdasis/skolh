import { dashboard, home, register } from '@/routes';
import type { SiteConfig, SiteNavItem } from '@/types/site-config';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const SubmenuItems = ({ items, level = 2 }: { items: SiteNavItem[]; level?: number }) => {
    const [openId, setOpenId] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

    const handleEnter = (id: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setOpenId(id);
    };

    const handleLeave = () => {
        timeoutRef.current = setTimeout(() => setOpenId(null), 150);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const visible = items.filter((item) => item.visible);

    return (
        <div className="min-w-48 rounded-lg border border-gray-100 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {visible.map((item) => {
                const hasChildren = (item.children?.filter((c) => c.visible)?.length ?? 0) > 0;
                return (
                    <div
                        key={item.id}
                        className="relative"
                        onMouseEnter={() => hasChildren && handleEnter(item.id)}
                        onMouseLeave={handleLeave}
                    >
                        <Link
                            href={item.href}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                        >
                            {item.label}
                            {hasChildren && level < 3 && (
                                <svg className="ml-2 h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            )}
                        </Link>
                        {hasChildren && level < 3 && openId === item.id && (
                            <div className="absolute top-0 left-full z-50 ml-0.5">
                                <SubmenuItems items={item.children!} level={level + 1} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const DesktopNavItem = ({ item }: { item: SiteNavItem }) => {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
    const hasChildren = (item.children?.filter((c) => c.visible)?.length ?? 0) > 0;

    const handleEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setOpen(true);
    };

    const handleLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (!hasChildren) {
        return (
            <Link href={item.href} className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400">
                {item.label}
            </Link>
        );
    }

    return (
        <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <Link
                href={item.href}
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
            >
                {item.label}
                <svg className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </Link>
            {open && (
                <div className="absolute top-full left-0 z-50 pt-1">
                    <SubmenuItems items={item.children!} />
                </div>
            )}
        </div>
    );
};

const MobileNavItem = ({ item, depth = 0 }: { item: SiteNavItem; depth?: number }) => {
    const [open, setOpen] = useState(false);
    const hasChildren = (item.children?.filter((c) => c.visible)?.length ?? 0) > 0;

    return (
        <div>
            <div className="flex items-center">
                <Link
                    href={item.href}
                    className="flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    style={{ paddingLeft: `${12 + depth * 16}px` }}
                >
                    {item.label}
                </Link>
                {hasChildren && (
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="shrink-0 rounded-lg p-2.5 text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                )}
            </div>
            {hasChildren && open && (
                <div className="flex flex-col gap-0.5">
                    {item
                        .children!.filter((c) => c.visible)
                        .map((child) => (
                            <MobileNavItem key={child.id} item={child} depth={depth + 1} />
                        ))}
                </div>
            )}
        </div>
    );
};

const HeaderStyleTwo = ({ canRegister = true }: { canRegister?: boolean }) => {
    const { auth, siteConfig } = usePage<{
        auth: { user: unknown };
        siteConfig: SiteConfig | null;
    }>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = siteConfig ? siteConfig.navigation.header.filter((item) => item.visible) : [];

    return (
        <header className="fixed top-0 right-0 left-0 z-50">
            <nav className="border-b border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href={home().url} className="flex items-center gap-3">
                        {siteConfig?.identity.logo_url ? (
                            <img src={siteConfig.identity.logo_url} alt={siteConfig.identity.name} className="h-10 w-10 rounded-xl object-contain" />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-sm">
                                {siteConfig?.identity.name?.slice(0, 2).toUpperCase() ?? 'SA'}
                            </div>
                        )}
                        <div>
                            <h1 className="text-base leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white">
                                {siteConfig?.identity.name ?? ''}
                            </h1>
                            <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{siteConfig?.identity.tagline ?? ''}</p>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => (
                            <DesktopNavItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden items-center gap-3 md:flex">
                        {auth.user ? (
                            <Link href={dashboard()} className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-emerald-700">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                {canRegister && (
                                    <Link href={register()} className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-orange-600">
                                        Daftar Sekarang
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="rounded-lg p-2 text-gray-600 md:hidden dark:text-gray-300"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden dark:border-gray-800 dark:bg-gray-950">
                        <div className="flex flex-col gap-0.5">
                            {navItems.map((item) => (
                                <MobileNavItem key={item.id} item={item} />
                            ))}
                            <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                                {auth.user ? (
                                    <Link href={dashboard()} className="rounded-lg bg-emerald-600 py-3 text-center text-sm font-bold tracking-wide text-white uppercase">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        {canRegister && (
                                            <Link href={register()} className="rounded-lg bg-orange-500 py-3 text-center text-sm font-bold tracking-wide text-white uppercase">
                                                Daftar Sekarang
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default HeaderStyleTwo;
