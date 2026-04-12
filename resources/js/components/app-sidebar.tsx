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
    FolderOpen,
    Globe,
    GraduationCap,
    HelpCircle,
    Home,
    Image,
    KeyRound,
    LayoutGrid,
    MailOpen,
    MapPin,
    Megaphone,
    MessageSquare,
    Newspaper,
    Phone,
    Settings,
    Scroll,
    Settings2,
    ShieldCheck,
    ShieldHalf,
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
import { index as mediaIndex } from '@/actions/App/Http/Controllers/Admin/MediaController';
import { index as extracurricularsIndex } from '@/actions/App/Http/Controllers/Admin/ExtracurricularController';
import { index as teachersIndex } from '@/actions/App/Http/Controllers/Admin/TeacherController';
import { index as galleryAlbumsIndex } from '@/actions/App/Http/Controllers/Admin/GalleryAlbumController';
import { index as themesIndex } from '@/actions/App/Http/Controllers/Admin/ThemeController';
import { index as organizationNodesIndex } from '@/actions/App/Http/Controllers/Admin/OrganizationNodeController';
import { index as facilitiesIndex } from '@/actions/App/Http/Controllers/Admin/FacilityController';
import { index as majorsIndex } from '@/actions/App/Http/Controllers/Admin/MajorController';
import { index as announcementsIndex } from '@/actions/App/Http/Controllers/Admin/AnnouncementController';
import { index as articlesIndex } from '@/actions/App/Http/Controllers/Admin/ArticleController';
import { index as categoriesIndex } from '@/actions/App/Http/Controllers/Admin/CategoryController';
import { index as curriculaIndex } from '@/actions/App/Http/Controllers/Admin/CurriculumController';
import { index as contactMessagesIndex } from '@/actions/App/Http/Controllers/Admin/ContactMessageController';
import { index as testimonialsIndex } from '@/actions/App/Http/Controllers/Admin/TestimonialController';
import { index as alumniIndex } from '@/actions/App/Http/Controllers/Admin/AlumniController';
import { index as admissionPeriodsIndex } from '@/actions/App/Http/Controllers/Admin/AdmissionPeriodController';
import { index as customFieldsIndex } from '@/actions/App/Http/Controllers/Admin/CustomFieldController';
import { index as registrationsIndex } from '@/actions/App/Http/Controllers/Admin/RegistrationController';
import { index as studentsIndex } from '@/actions/App/Http/Controllers/Admin/StudentController';
import { index as reportsIndex } from '@/actions/App/Http/Controllers/Admin/ReportController';
import { show as visiMisiShow } from '@/actions/App/Http/Controllers/Admin/VisiMisiController';
import { show as schoolHistoryShow } from '@/actions/App/Http/Controllers/Admin/SchoolHistoryController';
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
    const { unreadContactMessagesCount } = usePage<{
        unreadContactMessagesCount: number;
    }>().props;

    const navGroups: NavGroup[] = [
        {
            label: 'Umum',
            items: [
                {
                    title: 'Dashboard',
                    href: dashboard(),
                    icon: LayoutGrid,
                    component: 'dashboard',
                },
            ],
        },
        {
            label: 'Profil Sekolah',
            items: [
                {
                    title: 'Visi & Misi',
                    href: visiMisiShow.url(),
                    icon: Star,
                    component: 'admin/visi-misi/show',
                },
                {
                    title: 'Sejarah Sekolah',
                    href: schoolHistoryShow.url(),
                    icon: Scroll,
                    component: 'admin/school-history/show',
                },
                {
                    title: 'Struktur Organisasi',
                    href: organizationNodesIndex.url(),
                    icon: Users2,
                    component: 'admin/organization-nodes/index',
                },
                {
                    title: 'Fasilitas',
                    href: facilitiesIndex.url(),
                    icon: MapPin,
                    component: 'admin/facilities/index',
                },
                {
                    title: 'Jurusan',
                    href: majorsIndex.url(),
                    icon: BookOpen,
                    component: 'admin/majors/index',
                },
                {
                    title: 'Prestasi',
                    href: achievementsIndex.url(),
                    icon: Award,
                    component: 'admin/achievements/index',
                },
                {
                    title: 'Ekstrakurikuler',
                    href: extracurricularsIndex.url(),
                    icon: BookOpenCheck,
                    component: 'admin/extracurriculars/index',
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
                    component: 'admin/articles/index',
                },
                {
                    title: 'Pengumuman',
                    href: announcementsIndex.url(),
                    icon: Megaphone,
                    component: 'admin/announcements/index',
                },
                {
                    title: 'Kategori',
                    href: categoriesIndex.url(),
                    icon: Tag,
                    component: 'admin/categories/index',
                },
                {
                    title: 'Agenda',
                    href: '/admin/agendas',
                    icon: CalendarDays,
                    component: 'admin/agendas/index',
                },
                {
                    title: 'Galeri',
                    href: galleryAlbumsIndex.url(),
                    icon: Image,
                    component: 'admin/gallery-albums/index',
                },
                {
                    title: 'Media Manager',
                    href: mediaIndex.url(),
                    icon: FolderOpen,
                    component: 'admin/media/index',
                },
            ],
        },
        {
            label: 'Akademik',
            items: [
                {
                    title: 'Pengaturan SPMB',
                    href: admissionPeriodsIndex.url(),
                    icon: Settings2,
                    component: 'admin/admission-periods/index',
                },
                {
                    title: 'Custom Fields SPMB',
                    href: customFieldsIndex.url(),
                    icon: ClipboardList,
                    component: 'admin/custom-fields/index',
                },
                {
                    title: 'Data Pendaftaran',
                    href: registrationsIndex.url(),
                    icon: FileText,
                    component: 'admin/registrations/index',
                },
                {
                    title: 'Data Guru',
                    href: teachersIndex.url(),
                    icon: Users,
                    component: 'admin/teachers/index',
                },
                {
                    title: 'Data Siswa',
                    href: studentsIndex.url(),
                    icon: Users2,
                    component: 'admin/students/index',
                },
                {
                    title: 'Alumni',
                    href: alumniIndex.url(),
                    icon: GraduationCap,
                    component: 'admin/alumni/index',
                },
                {
                    title: 'Kurikulum',
                    href: curriculaIndex.url(),
                    icon: BookOpen,
                    component: 'admin/curricula/index',
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
                    component: 'admin/contact-messages/index',
                },
                {
                    title: 'Testimoni',
                    href: testimonialsIndex.url(),
                    icon: MessageSquare,
                    component: 'admin/testimonials/index',
                },
                {
                    title: 'Laporan',
                    href: reportsIndex.url(),
                    icon: FileText,
                    component: 'admin/reports/index',
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
                    component: 'admin/themes/index',
                },
                {
                    title: 'Preferensi Situs',
                    href: '/admin/settings/site-identity',
                    icon: Settings2,
                },
                {
                    title: 'Manajemen User',
                    href: '/admin/users',
                    icon: ShieldCheck,
                    component: 'admin/users/index',
                },
                {
                    title: 'Roles',
                    href: '/admin/roles',
                    icon: ShieldHalf,
                    component: 'admin/roles/index',
                },
                {
                    title: 'Permissions',
                    href: '/admin/permissions',
                    icon: KeyRound,
                    component: 'admin/permissions/index',
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
