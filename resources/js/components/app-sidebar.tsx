import { Link, usePage } from '@inertiajs/react';
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
    Palette,
    Tag,
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
import { index as achievementsIndex } from '@/actions/App/Http/Controllers/Admin/AchievementController';
import { index as extracurricularsIndex } from '@/actions/App/Http/Controllers/Admin/ExtracurricularController';
import { index as teachersIndex } from '@/actions/App/Http/Controllers/Admin/TeacherController';
import { index as galleryAlbumsIndex } from '@/actions/App/Http/Controllers/Admin/GalleryAlbumController';
import { index as themesIndex } from '@/actions/App/Http/Controllers/Admin/ThemeController';
import { index as organizationNodesIndex } from '@/actions/App/Http/Controllers/Admin/OrganizationNodeController';
import { index as facilitiesIndex } from '@/actions/App/Http/Controllers/Admin/FacilityController';
import { index as announcementsIndex } from '@/actions/App/Http/Controllers/Admin/AnnouncementController';
import { index as articlesIndex } from '@/actions/App/Http/Controllers/Admin/ArticleController';
import { index as categoriesIndex } from '@/actions/App/Http/Controllers/Admin/CategoryController';
import { index as curriculaIndex } from '@/actions/App/Http/Controllers/Admin/CurriculumController';
import { index as contactMessagesIndex } from '@/actions/App/Http/Controllers/Admin/ContactMessageController';
import { index as testimonialsIndex } from '@/actions/App/Http/Controllers/Admin/TestimonialController';
import { dashboard } from '@/routes';
import type { NavGroup } from '@/types';

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
    const { unreadContactMessagesCount } = usePage<{ unreadContactMessagesCount: number }>().props;

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
                    href: organizationNodesIndex.url(),
                    icon: Users2,
                },
                {
                    title: 'Fasilitas',
                    href: facilitiesIndex.url(),
                    icon: MapPin,
                },
                {
                    title: 'Prestasi',
                    href: achievementsIndex.url(),
                    icon: Award,
                },
                {
                    title: 'Ekstrakurikuler',
                    href: extracurricularsIndex.url(),
                    icon: BookOpenCheck,
                },
            ],
        },
        {
            label: 'Konten',
            items: [
                {
                    title: 'Artikel',
                    href: articlesIndex.url(),
                    icon: Newspaper,
                },
                {
                    title: 'Pengumuman',
                    href: announcementsIndex.url(),
                    icon: Megaphone,
                },
                {
                    title: 'Kategori',
                    href: categoriesIndex.url(),
                    icon: Tag,
                },
                {
                    title: 'Agenda',
                    href: '/admin/agendas',
                    icon: CalendarDays,
                },
                {
                    title: 'Galeri',
                    href: galleryAlbumsIndex.url(),
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
                    title: 'Data Guru',
                    href: teachersIndex.url(),
                    icon: Users,
                },
                {
                    title: 'Data Siswa',
                    href: '/akademik/siswa',
                    icon: Users2,
                },
                {
                    title: 'Alumni',
                    href: '/alumni',
                    icon: GraduationCap,
                },
                {
                    title: 'Kurikulum',
                    href: curriculaIndex.url(),
                    icon: BookOpen,
                },
            ],
        },
        {
            label: 'Komunikasi',
            items: [
                {
                    title: 'Pesan Masuk',
                    href: contactMessagesIndex.url(),
                    icon: MailOpen,
                    badge: unreadContactMessagesCount,
                },
                {
                    title: 'Testimoni',
                    href: testimonialsIndex.url(),
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
                    title: 'Manajemen Tema',
                    href: themesIndex.url(),
                    icon: Palette,
                },
                {
                    title: 'Preferensi Situs',
                    href: '/preferensi',
                    icon: Settings2,
                },
                {
                    title: 'Manajemen User',
                    href: '/admin/users',
                    icon: ShieldCheck,
                },
                {
                    title: 'Pengaturan Akun',
                    href: '/settings/profile',
                    icon: Settings,
                },
            ],
        },
    ];

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
