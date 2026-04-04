import { SiteConfig } from '@/types';
import { usePage } from '@inertiajs/react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const GuestFooter = () => {
    const { siteConfig } = usePage<{ siteConfig: SiteConfig | null }>().props;

    return (
        <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 pt-12 pb-0 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5">
                            {siteConfig?.identity.logo_url ? (
                                <img
                                    src={siteConfig.identity.logo_url}
                                    alt={siteConfig.identity.name}
                                    className="h-8 w-8 rounded-lg object-contain"
                                />
                            ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">
                                    {siteConfig?.identity.name
                                        ?.slice(0, 2)
                                        .toUpperCase() ?? 'SA'}
                                </div>
                            )}
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {siteConfig?.identity.name}
                            </span>
                        </div>
                        {siteConfig?.identity.tagline && (
                            <p className="mt-3 text-sm leading-relaxed text-gray-400 dark:text-gray-500">
                                {siteConfig.identity.tagline}
                            </p>
                        )}
                        <div className="mt-4 space-y-2">
                            {siteConfig?.identity.address && (
                                <div className="flex items-start gap-2 text-sm text-gray-400 dark:text-gray-500">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span>{siteConfig.identity.address}</span>
                                </div>
                            )}
                            {siteConfig?.identity.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                                    <Phone className="h-4 w-4 shrink-0" />
                                    <span>{siteConfig.identity.phone}</span>
                                </div>
                            )}
                            {siteConfig?.identity.email && (
                                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                                    <Mail className="h-4 w-4 shrink-0" />
                                    <span>{siteConfig.identity.email}</span>
                                </div>
                            )}
                            {siteConfig?.identity.hours && (
                                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                                    <Clock className="h-4 w-4 shrink-0" />
                                    <span>{siteConfig.identity.hours}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Links */}
                    {siteConfig?.navigation.footer &&
                        siteConfig.navigation.footer.length > 0 && (
                            <div className="grid grid-cols-3 gap-6">
                                {siteConfig.navigation.footer.map((group) => (
                                    <div key={group.title}>
                                        <p className="mb-3 text-[11px] font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                                            {group.title}
                                        </p>
                                        <ul className="space-y-2">
                                            {group.links.map((link) => (
                                                <li key={link.label}>
                                                    <a
                                                        href={link.href}
                                                        className="text-sm text-gray-400 transition hover:text-emerald-600 dark:text-gray-500 dark:hover:text-emerald-400"
                                                    >
                                                        {link.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>

                {/* Bottom */}
                <div className="mt-10 border-t border-gray-100 py-5 dark:border-gray-800">
                    <p className="text-center text-xs text-gray-400 dark:text-gray-600">
                        &copy; {new Date().getFullYear()}{' '}
                        {siteConfig?.identity.name}. Hak cipta dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default GuestFooter;
