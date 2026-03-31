import { Link } from '@inertiajs/react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {
    Award,
    BookOpen,
    BookOpenCheck,
    CalendarDays,
    ClipboardList,
    FileText,
    Globe,
    GraduationCap,
    HelpCircle,
    Home,
    Image,
    LayoutGrid,
    MailOpen,
    MapPin,
    Megaphone,
    MessageSquare,
    Newspaper,
    Phone,
    Settings,
    Settings2,
    ShieldCheck,
    Star,
    Users,
    Users2,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavGroup } from '@/types';

const navGroups: NavGroup[] = [
    {
        label: 'Umum',
        items: [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ],
    },
    {
        label: 'Profil Sekolah',
        items: [
            {
                title: 'Tentang Sekolah',
                href: '/profil/tentang',
                icon: Home,
            },
            {
                title: 'Visi & Misi',
                href: '/profil/visi-misi',
                icon: Star,
            },
            {
                title: 'Struktur Organisasi',
                href: '/profil/struktur',
                icon: Users2,
            },
            {
                title: 'Fasilitas',
                href: '/profil/fasilitas',
                icon: MapPin,
            },
            {
                title: 'Prestasi',
                href: '/profil/prestasi',
                icon: Award,
            },
            {
                title: 'Ekstrakulikuler',
                href: '/profil/ekstrakulikuler',
                icon: BookOpenCheck,
            },
        ],
    },
    {
        label: 'Konten',
        items: [
            {
                title: 'Artikel',
                href: '/artikel',
                icon: Newspaper,
            },
            {
                title: 'Pengumuman',
                href: '/pengumuman',
                icon: Megaphone,
            },
            {
                title: 'Agenda',
                href: '/agenda',
                icon: CalendarDays,
            },
            {
                title: 'Galeri',
                href: '/galeri',
                icon: Image,
            },
        ],
    },
    {
        label: 'Akademik',
        items: [
            {
                title: 'SPMB',
                href: '/spmb',
                icon: ClipboardList,
            },
            {
                title: 'Data Siswa',
                href: '/akademik/siswa',
                icon: Users,
            },
            {
                title: 'Alumni',
                href: '/alumni',
                icon: GraduationCap,
            },
            {
                title: 'Kurikulum',
                href: '/akademik/kurikulum',
                icon: BookOpen,
            },
        ],
    },
    {
        label: 'Komunikasi',
        items: [
            {
                title: 'Pesan Masuk',
                href: '/pesan',
                icon: MailOpen,
            },
            {
                title: 'Testimoni',
                href: '/testimoni',
                icon: MessageSquare,
            },
            {
                title: 'Laporan',
                href: '/laporan',
                icon: FileText,
            },
        ],
    },
    {
        label: 'Pengaturan',
        items: [
            {
                title: 'Preferensi Situs',
                href: '/preferensi',
                icon: Settings2,
            },
            {
                title: 'Manajemen Admin',
                href: '/admin',
                icon: ShieldCheck,
            },
            // T028 [US1 Polish]: User Management menu item
            {
                title: 'Manajemen User',
                href: '/admin/users',
                icon: Users,
            },
            {
                title: 'Pengaturan Akun',
                href: '/settings/profile',
                icon: Settings,
            },
        ],
    },
];

const footerNavItems = [
    {
        title: 'Lihat Website',
        href: '/',
        icon: Globe,
    },
    {
        title: 'Hubungi Kami',
        href: '/kontak',
        icon: Phone,
    },
    {
        title: 'Bantuan',
        href: '/bantuan',
        icon: HelpCircle,
    },
];

export function AppSidebar() {
    return (
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
                <SimpleBar className="h-full">
                    <NavMain groups={navGroups} />
                </SimpleBar>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
