import { Link, usePage } from '@inertiajs/react';
import { useEffect, type PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import AppLogo from '@/components/app-logo';
import { NavUser } from '@/components/nav-user';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { useCurrentUrl } from '@/hooks/use-current-url';
import {
    identity as siteIdentity,
    welcomeContent as siteWelcomeContent,
    navigation as siteNavigation,
    pageMeta as sitePageMeta,
    sectionPreferences as siteSectionPreferences,
} from '@/actions/App/Http/Controllers/Admin/SiteSettingController';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import {
    ArrowLeft,
    FileText,
    Globe,
    Home,
    LayoutGrid,
    Settings2,
} from 'lucide-react';

const navItems = [
    {
        title: 'Identitas Situs',
        href: siteIdentity.url(),
        icon: Settings2,
    },
    {
        title: 'Konten Beranda',
        href: siteWelcomeContent.url(),
        icon: Home,
    },
    {
        title: 'Navigasi',
        href: siteNavigation.url(),
        icon: Globe,
    },
    {
        title: 'Meta Halaman',
        href: sitePageMeta.url(),
        icon: FileText,
    },
    {
        title: 'Preferensi Seksi',
        href: siteSectionPreferences.url(),
        icon: LayoutGrid,
    },
];

const SiteSettingsLayout = ({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) => {
    const { isCurrentUrl } = useCurrentUrl();
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string };
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppShell variant="sidebar">
            <Sidebar collapsible="icon" variant="inset">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href={dashboard()} prefetch>
                                    <AppLogo />
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup className="px-2 py-0">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={{ children: 'Kembali ke Menu Utama' }}>
                                    <Link href={dashboard()}>
                                        <ArrowLeft />
                                        <span>Kembali</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>

                    <SidebarGroup className="px-2 py-0">
                        <SidebarGroupLabel>Preferensi Situs</SidebarGroupLabel>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isCurrentUrl(item.href)}
                                        tooltip={{ children: item.title }}
                                    >
                                        <Link href={item.href} prefetch>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
            </Sidebar>

            <AppContent variant="sidebar" className="overflow-hidden">
                <header className="flex h-12 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear md:px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    {children}
                </main>
            </AppContent>
            <Toaster />
        </AppShell>
    );
};

export default SiteSettingsLayout;
