import { Head, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import type {
    Auth,
    DashboardAgenda,
    DashboardAnnouncement,
    DashboardAchievement,
    DashboardReportSummary,
} from '@/types';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type DashboardProps = {
    auth: Auth;
    totalStudents: number;
    totalTeachers: number;
    todayAgendas: DashboardAgenda[];
    recentAnnouncements: DashboardAnnouncement[];
    recentAchievements: DashboardAchievement[];
    totalReports: number;
    reportSummary: DashboardReportSummary[];
};

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

const todayDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

const AGENDA_COLORS = [
    'bg-emerald-500',
    'bg-blue-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-purple-500',
    'bg-rose-500',
];

const LEVEL_LABEL: Record<string, string> = {
    district: 'Kota',
    province: 'Provinsi',
    national: 'Nasional',
    international: 'Internasional',
};

const Dashboard = () => {
    const {
        auth,
        totalStudents,
        totalTeachers,
        todayAgendas,
        recentAnnouncements,
        recentAchievements,
        totalReports,
        reportSummary,
    } = usePage<DashboardProps>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-4 p-4">
                {/* Welcome Banner - CAT style with Maskot */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 dark:from-emerald-900 dark:via-emerald-800 dark:to-teal-800">
                    {/* Decorative shapes */}
                    <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
                    <div className="absolute -bottom-8 -left-8 h-32 w-32 rotate-45 rounded-3xl bg-white/5" />
                    <div className="absolute top-1/2 right-1/4 h-20 w-20 rounded-full border-2 border-white/10" />
                    <div className="absolute right-1/3 bottom-4 h-10 w-10 rounded-full bg-orange-400/20" />
                    <div className="absolute top-6 right-[15%] h-6 w-6 rounded-full bg-white/8" />

                    <div className="relative z-10 grid grid-cols-1 items-end gap-0 lg:grid-cols-[1fr_auto]">
                        {/* Left: greeting text */}
                        <div className="flex flex-col gap-6 p-6 sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="hidden sm:block">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold text-white backdrop-blur-sm">
                                        {getInitials(auth.user.name)}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-emerald-100/80">
                                        {todayDate}
                                    </p>
                                    <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                        {getGreeting()},{' '}
                                        <span className="text-orange-300">
                                            {auth.user.name.split(' ')[0]}
                                        </span>
                                    </h1>
                                    <p className="mt-2 max-w-md text-sm leading-relaxed text-emerald-100/70">
                                        Selamat datang di panel admin SDIT
                                        Al-Aziz. Berikut ringkasan informasi
                                        sekolah hari ini.
                                    </p>
                                </div>
                            </div>

                            {/* Quick info pills */}
                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                                    <span className="h-2 w-2 rounded-full bg-green-400" />
                                    Tahun Ajaran 2025/2026
                                </div>
                                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                                    Semester Genap
                                </div>
                            </div>
                        </div>

                        {/* Right: Maskot image - like CAT in welcome */}
                        <div className="relative hidden h-52 w-48 lg:block">
                            <img
                                src="/images/cta-student.png"
                                alt="Siswa SDIT Al-Aziz"
                                className="absolute right-4 bottom-0 h-60 w-auto object-contain object-bottom drop-shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-2 px-2 lg:grid-cols-4">
                    {[
                        {
                            title: 'Total Siswa',
                            value: totalStudents.toString(),
                            sub: 'Siswa aktif',
                            icon: StudentsIcon,
                            iconColor: 'text-emerald-600 dark:text-emerald-400',
                            bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
                            valueColor: '',
                        },
                        {
                            title: 'Total Guru',
                            value: totalTeachers.toString(),
                            sub: 'Guru aktif',
                            icon: TeachersIcon,
                            iconColor: 'text-blue-600 dark:text-blue-400',
                            bgColor: 'bg-blue-50 dark:bg-blue-950/50',
                            valueColor: '',
                        },
                        {
                            title: 'Kelas Aktif',
                            value: '18',
                            sub: '6 tingkat',
                            icon: ClassIcon,
                            iconColor: 'text-orange-600 dark:text-orange-400',
                            bgColor: 'bg-orange-50 dark:bg-orange-950/50',
                            valueColor: '',
                        },
                        {
                            title: 'Kehadiran Hari Ini',
                            value: '96%',
                            sub: 'Rata-rata kehadiran',
                            icon: AttendanceIcon,
                            iconColor: 'text-teal-600 dark:text-teal-400',
                            bgColor: 'bg-teal-50 dark:bg-teal-950/50',
                            valueColor: 'text-teal-700 dark:text-teal-400',
                        },
                    ].map((card) => (
                        <div
                            key={card.title}
                            className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8"
                        >
                            <div className="px-4 pt-3 pb-3">
                                <p className="text-xs font-medium text-muted-foreground">
                                    {card.title}
                                </p>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="flex items-center gap-3 p-4">
                                    <div
                                        className={`shrink-0 rounded-lg p-2.5 ${card.bgColor}`}
                                    >
                                        <card.icon
                                            className={`h-5 w-5 ${card.iconColor}`}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className={`text-2xl leading-tight font-bold ${card.valueColor}`}
                                        >
                                            {card.value}
                                        </p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {card.sub}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two column layout */}
                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Agenda Hari Ini - 2 col */}
                    <div className="lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                            <div className="flex items-center justify-between gap-2 px-5 py-4">
                                <div className="space-y-0.5">
                                    <h3 className="text-sm leading-none font-semibold">
                                        Agenda Hari Ini
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Jadwal kegiatan sekolah
                                    </p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                    {todayAgendas.length} kegiatan
                                </Badge>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                {todayAgendas.length === 0 ? (
                                    <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                                        Tidak ada agenda hari ini
                                    </div>
                                ) : (
                                    <div className="divide-y divide-foreground/6">
                                        {todayAgendas.map((agenda, index) => (
                                            <div
                                                key={agenda.id}
                                                className="flex items-start gap-4 px-5 py-4"
                                            >
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-sm font-bold tabular-nums">
                                                        {agenda.time}
                                                    </span>
                                                    <div
                                                        className={`h-2 w-2 rounded-full ${AGENDA_COLORS[index % AGENDA_COLORS.length]}`}
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-semibold">
                                                        {agenda.title}
                                                    </p>
                                                    {agenda.desc && (
                                                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                                            {agenda.desc}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pengumuman - 1 col */}
                    <div>
                        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                            <div className="flex items-center justify-between gap-2 px-5 py-4">
                                <div className="space-y-0.5">
                                    <h3 className="text-sm leading-none font-semibold">
                                        Pengumuman
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Info terbaru sekolah
                                    </p>
                                </div>
                                <Badge
                                    variant="default"
                                    className="bg-orange-500 text-[10px] text-white hover:bg-orange-600"
                                >
                                    {recentAnnouncements.length} terbaru
                                </Badge>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                {recentAnnouncements.length === 0 ? (
                                    <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                                        Belum ada pengumuman
                                    </div>
                                ) : (
                                    <div className="divide-y divide-foreground/6">
                                        {recentAnnouncements.map((item) => (
                                            <div
                                                key={item.id}
                                                className="px-5 py-4"
                                            >
                                                <p className="text-sm leading-snug font-semibold">
                                                    {item.title}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {item.date}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row - 3 columns */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Ringkasan Laporan */}
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="flex items-center justify-between gap-2 px-5 py-4">
                            <div className="space-y-0.5">
                                <h3 className="text-sm leading-none font-semibold">
                                    Laporan Masuk
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Ringkasan status laporan
                                </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                                {totalReports} total
                            </Badge>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="p-5">
                                {totalReports === 0 ? (
                                    <p className="py-4 text-center text-sm text-muted-foreground">
                                        Belum ada laporan masuk
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {reportSummary.map((item) => (
                                            <div key={item.status}>
                                                <div className="mb-1.5 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={`h-2 w-2 rounded-full ${item.color}`}
                                                        />
                                                        <span className="text-xs font-semibold">
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {item.count} laporan
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={
                                                        totalReports > 0
                                                            ? (item.count /
                                                                  totalReports) *
                                                              100
                                                            : 0
                                                    }
                                                    className="h-2"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Prestasi Terbaru */}
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="flex items-center justify-between gap-2 px-5 py-4">
                            <div className="space-y-0.5">
                                <h3 className="text-sm leading-none font-semibold">
                                    Prestasi Terbaru
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Pencapaian sekolah terkini
                                </p>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            {recentAchievements.length === 0 ? (
                                <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                                    Belum ada prestasi tercatat
                                </div>
                            ) : (
                                <div className="divide-y divide-foreground/6">
                                    {recentAchievements.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 px-5 py-3.5"
                                        >
                                            <Avatar>
                                                <AvatarFallback className="bg-amber-500 text-[10px] font-bold text-white">
                                                    {item.year}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold">
                                                    {item.title}
                                                </p>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="shrink-0 text-[10px]"
                                            >
                                                {LEVEL_LABEL[item.level] ??
                                                    item.level}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Keuangan Ringkas */}
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="flex items-center justify-between gap-2 px-5 py-4">
                            <div className="space-y-0.5">
                                <h3 className="text-sm leading-none font-semibold">
                                    SPP Bulan Ini
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Status pembayaran Maret 2026
                                </p>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="p-5">
                                {/* Donut-like summary */}
                                <div className="flex items-center gap-5">
                                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                                        <svg
                                            className="h-full w-full -rotate-90"
                                            viewBox="0 0 36 36"
                                        >
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="15.5"
                                                fill="none"
                                                className="stroke-muted"
                                                strokeWidth="3"
                                            />
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="15.5"
                                                fill="none"
                                                className="stroke-emerald-500"
                                                strokeWidth="3"
                                                strokeDasharray="97.4"
                                                strokeDashoffset="22.4"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="absolute text-lg font-extrabold">
                                            77%
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                            <span className="text-xs text-muted-foreground">
                                                Lunas
                                            </span>
                                            <span className="ml-auto text-xs font-bold">
                                                405
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                            <span className="text-xs text-muted-foreground">
                                                Cicilan
                                            </span>
                                            <span className="ml-auto text-xs font-bold">
                                                68
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                            <span className="text-xs text-muted-foreground">
                                                Belum Bayar
                                            </span>
                                            <span className="ml-auto text-xs font-bold">
                                                51
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            Total Terkumpul
                                        </span>
                                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                            Rp 182.250.000
                                        </span>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            Target Bulan Ini
                                        </span>
                                        <span className="text-sm font-bold">
                                            Rp 236.600.000
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

/* ------------------------------------------------------------------ */
/*  Inline SVG Icon Components                                        */
/* ------------------------------------------------------------------ */

const StudentsIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
    </svg>
);

const TeachersIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
    </svg>
);

const ClassIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
        />
    </svg>
);

const AttendanceIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
        />
    </svg>
);
