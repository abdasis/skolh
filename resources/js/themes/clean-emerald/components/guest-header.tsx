import { dashboard, home, login, register } from '@/routes';
import type { SiteConfig, SiteNavItem } from '@/types/site-config';
import { Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

const SubmenuItems = ({
    items,
    level = 2,
}: {
    items: SiteNavItem[];
    level?: number;
}) => {
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
                const hasChildren =
                    (item.children?.filter((c) => c.visible)?.length ?? 0) > 0;
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
                                <svg
                                    className="ml-2 h-3.5 w-3.5 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            )}
                        </Link>
                        {hasChildren && level < 3 && openId === item.id && (
                            <div className="absolute top-0 left-full z-50 ml-0.5">
                                <SubmenuItems
                                    items={item.children!}
                                    level={level + 1}
                                />
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

    const hasChildren =
        (item.children?.filter((c) => c.visible)?.length ?? 0) > 0;

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
            <Link
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
            >
                {item.label}
            </Link>
        );
    }

    return (
        <div
            className="relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <Link
                href={item.href}
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
            >
                {item.label}
                <svg
                    className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
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

const MobileNavItem = ({
    item,
    depth = 0,
}: {
    item: SiteNavItem;
    depth?: number;
}) => {
    const [open, setOpen] = useState(false);
    const hasChildren =
        (item.children?.filter((c) => c.visible)?.length ?? 0) > 0;

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
                        <svg
                            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </button>
                )}
            </div>
            {hasChildren && open && (
                <div className="flex flex-col gap-0.5">
                    {item
                        .children!.filter((c) => c.visible)
                        .map((child) => (
                            <MobileNavItem
                                key={child.id}
                                item={child}
                                depth={depth + 1}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

const GuestHeader = ({ canRegister = true }: { canRegister?: boolean }) => {
    const { auth, siteConfig } = usePage<{
        auth: { user: unknown };
        siteConfig: SiteConfig | null;
    }>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = siteConfig
        ? siteConfig.navigation.header.filter((item) => item.visible)
        : [];

    const socialSvgPaths: Record<string, string> = {
        facebook:
            'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
        youtube:
            'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
        instagram:
            'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
        whatsapp:
            'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z',
    };

    const socialLinks = siteConfig
        ? (Object.entries(siteConfig.social) as [string, string | null][])
              .filter(([, url]) => url !== null && url !== '')
              .map(([key, url]) => ({
                  key,
                  label: key.charAt(0).toUpperCase() + key.slice(1),
                  href: url as string,
                  path: socialSvgPaths[key] ?? '',
              }))
              .filter((item) => item.path !== '')
        : [];

    return (
        <header className="fixed top-0 right-0 left-0 z-50">
            {/* Top Bar */}
            <div className="bg-emerald-800 dark:bg-emerald-950">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                    {/* Left: info */}
                    <div className="hidden items-center divide-x divide-white/20 md:flex">
                        <div className="flex items-center gap-2 pr-5 text-xs text-white/90">
                            <svg
                                className="h-3.5 w-3.5 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <span>
                                {siteConfig?.identity.hours ??
                                    '07.00 - 15.00 Sen - Jum'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-5 text-xs text-white/90">
                            <svg
                                className="h-3.5 w-3.5 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                />
                            </svg>
                            <span>{siteConfig?.identity.phone ?? ''}</span>
                        </div>
                        <div className="flex items-center gap-2 pl-5 text-xs text-white/90">
                            <svg
                                className="h-3.5 w-3.5 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                />
                            </svg>
                            <span>{siteConfig?.identity.address ?? ''}</span>
                        </div>
                    </div>
                    {/* Mobile: just phone */}
                    <div className="flex items-center gap-2 text-xs text-white/90 md:hidden">
                        <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                            />
                        </svg>
                        <span>{siteConfig?.identity.phone ?? ''}</span>
                    </div>
                    {/* Right: social media */}
                    <div className="flex items-center gap-1">
                        {socialLinks.map((social) => (
                            <a
                                key={social.key}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-7 w-7 items-center justify-center rounded text-white/80 transition hover:bg-white/10 hover:text-white"
                            >
                                <svg
                                    className="h-3.5 w-3.5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d={social.path} />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/95">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href={home().url} className="flex items-center gap-3">
                        {siteConfig?.identity.logo_url ? (
                            <img
                                src={siteConfig.identity.logo_url}
                                alt={siteConfig.identity.name}
                                className="h-11 w-11 rounded-xl object-contain"
                            />
                        ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-sm">
                                {siteConfig?.identity.name
                                    ?.slice(0, 2)
                                    .toUpperCase() ?? 'SA'}
                            </div>
                        )}
                        <div>
                            <h1 className="text-base leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white">
                                {siteConfig?.identity.name ?? ''}
                            </h1>
                            <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                {siteConfig?.identity.tagline ?? ''}
                            </p>
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
                            <Link
                                href={dashboard()}
                                className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-emerald-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-orange-600"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                )}
                                <Link
                                    href={login()}
                                    className="rounded-lg border-2 border-emerald-600 px-5 py-2 text-sm font-bold text-emerald-600 transition hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
                                >
                                    Masuk
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="rounded-lg p-2 text-gray-600 md:hidden dark:text-gray-300"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
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
                                    <Link
                                        href={dashboard()}
                                        className="rounded-lg bg-emerald-600 py-3 text-center text-sm font-bold tracking-wide text-white uppercase"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="rounded-lg bg-orange-500 py-3 text-center text-sm font-bold tracking-wide text-white uppercase"
                                            >
                                                Daftar Sekarang
                                            </Link>
                                        )}
                                        <Link
                                            href={login()}
                                            className="rounded-lg border-2 border-emerald-600 py-2.5 text-center text-sm font-bold text-emerald-600"
                                        >
                                            Masuk
                                        </Link>
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

export default GuestHeader;
