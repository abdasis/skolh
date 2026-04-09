import { Head } from '@inertiajs/react';
import PageHero from '@/themes/clean-emerald/components/page-hero';
import { type TeacherResource } from '@/types';

interface Props {
    teachers: TeacherResource[];
}

const PLATFORM_LABELS: Record<string, string> = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    twitter: 'Twitter / X',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    website: 'Website',
};

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();
};

const TeacherCard = ({ teacher }: { teacher: TeacherResource }) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-emerald-600 shadow-md shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-900/30 dark:bg-emerald-700">
            {/* Background decorative shapes */}
            <div className="pointer-events-none absolute inset-0">
                {/* Large circle top-right */}
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full border border-white/10 bg-white/5" />
                {/* Small circle top-right inner */}
                <div className="absolute -top-3 right-4 h-14 w-14 rounded-full border border-white/8 bg-white/4" />
                {/* Arc bottom-left */}
                <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full border border-white/8 bg-white/4" />
                {/* Diagonal line top-left */}
                <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
                    <div className="absolute top-6 -left-4 h-px w-24 rotate-[30deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute top-10 -left-2 h-px w-16 rotate-[30deg] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                </div>
                {/* Dot grid accent */}
                <div className="absolute right-4 bottom-4 flex flex-col gap-1">
                    <div className="flex gap-1">
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                    </div>
                    <div className="flex gap-1">
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative flex flex-col items-center px-5 pt-8 pb-6 text-center">
                {/* Avatar */}
                {teacher.avatar_url ? (
                    <img
                        src={teacher.avatar_url}
                        alt={teacher.name}
                        className="mb-4 h-20 w-20 rounded-full object-cover ring-2 ring-white/40 ring-offset-2 ring-offset-emerald-600 dark:ring-offset-emerald-700"
                    />
                ) : (
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/15 text-xl font-bold text-white ring-2 ring-white/30 ring-offset-2 ring-offset-emerald-600 backdrop-blur-sm dark:ring-offset-emerald-700">
                        {getInitials(teacher.name)}
                    </div>
                )}

                {/* Name */}
                <p className="leading-snug font-semibold text-white">
                    {teacher.name}
                </p>

                {/* Subject badge */}
                {teacher.subject && (
                    <span className="mt-2.5 inline-flex items-center rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white/90 ring-1 ring-white/20">
                        {teacher.subject}
                    </span>
                )}

                {/* NIP */}
                {teacher.nip && (
                    <p className="mt-1.5 text-xs text-white/55">
                        {teacher.nip}
                    </p>
                )}

                {/* Divider */}
                {teacher.socials && teacher.socials.length > 0 && (
                    <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                )}

                {/* Socials */}
                {teacher.socials && teacher.socials.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5">
                        {teacher.socials.map((social) => (
                            <a
                                key={social.id}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-full bg-white/12 px-2.5 py-0.5 text-xs font-medium text-white/80 ring-1 ring-white/15 transition-colors hover:bg-white/20 hover:text-white"
                            >
                                {PLATFORM_LABELS[social.platform] ??
                                    social.platform}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const PublicTeachersPage = ({ teachers }: Props) => {
    return (
        <>
            <Head title="Daftar Guru" />

            <div className="relative min-h-screen overflow-hidden">
                {/* Page background shapes */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-900/20" />
                    <div className="absolute top-16 right-0 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl dark:bg-teal-900/15" />
                    <div className="absolute top-1/2 left-1/3 h-56 w-56 rounded-full bg-emerald-50/60 blur-2xl dark:bg-emerald-950/20" />
                    <div className="absolute right-1/3 bottom-24 h-64 w-64 rounded-full bg-teal-100/30 blur-3xl dark:bg-teal-900/10" />
                    <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-900/15" />

                    {/* Subtle line accents */}
                    <div className="absolute top-32 left-1/4 h-px w-48 rotate-12 bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent dark:via-emerald-700/30" />
                    <div className="absolute top-64 right-1/4 h-px w-32 -rotate-6 bg-gradient-to-r from-transparent via-teal-300/30 to-transparent dark:via-teal-700/20" />
                    <div className="absolute bottom-48 left-1/3 h-px w-40 rotate-3 bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent dark:via-emerald-700/20" />

                    {/* Small geometric accents */}
                    <div className="absolute top-44 right-28 h-5 w-5 rotate-45 rounded-sm border border-emerald-300/40 dark:border-emerald-700/30" />
                    <div className="absolute top-72 left-20 h-3.5 w-3.5 rotate-12 rounded-sm border border-teal-300/40 dark:border-teal-700/30" />
                    <div className="absolute right-20 bottom-52 h-4 w-4 -rotate-12 rounded-sm border border-emerald-400/30 dark:border-emerald-600/25" />
                    <div className="absolute bottom-36 left-36 h-3 w-3 rotate-45 rounded-sm border border-teal-300/35 dark:border-teal-700/25" />
                </div>

                <div className="relative mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <PageHero
                        badge="Tenaga Pendidik"
                        title="Daftar"
                        highlight="Guru"
                        description="Kenali para pendidik kami yang berdedikasi dalam mencerdaskan generasi bangsa."
                    />

                    {teachers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <p className="text-sm text-muted-foreground">
                                Belum ada data guru.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                    {teachers.length} guru terdaftar
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {teachers.map((teacher) => (
                                    <TeacherCard
                                        key={teacher.id}
                                        teacher={teacher}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default PublicTeachersPage;
