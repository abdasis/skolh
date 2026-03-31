import { dashboard, login, register } from '@/routes';
import { Head, Link, usePage } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="SDIT Al-Aziz - Sekolah Dasar Islam Terpadu">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-white font-[Plus_Jakarta_Sans] text-gray-900 dark:bg-gray-950 dark:text-gray-100">
                {/* Header */}
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
                                    <span>07.00 - 15.00 Sen - Jum</span>
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
                                    <span>(021) 1234-5678</span>
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
                                    <span>
                                        Jl. Pendidikan No. 1, Kota Contoh
                                    </span>
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
                                <span>(021) 1234-5678</span>
                            </div>
                            {/* Right: social media */}
                            <div className="flex items-center gap-1">
                                {/* Facebook */}
                                <a
                                    href="#"
                                    className="flex h-7 w-7 items-center justify-center rounded text-white/80 transition hover:bg-white/10 hover:text-white"
                                >
                                    <svg
                                        className="h-3.5 w-3.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                {/* YouTube */}
                                <a
                                    href="#"
                                    className="flex h-7 w-7 items-center justify-center rounded text-white/80 transition hover:bg-white/10 hover:text-white"
                                >
                                    <svg
                                        className="h-3.5 w-3.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                                {/* Instagram */}
                                <a
                                    href="#"
                                    className="flex h-7 w-7 items-center justify-center rounded text-white/80 transition hover:bg-white/10 hover:text-white"
                                >
                                    <svg
                                        className="h-3.5 w-3.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                    </svg>
                                </a>
                                {/* WhatsApp */}
                                <a
                                    href="#"
                                    className="flex h-7 w-7 items-center justify-center rounded text-white/80 transition hover:bg-white/10 hover:text-white"
                                >
                                    <svg
                                        className="h-3.5 w-3.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Main Navbar */}
                    <nav className="border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/95">
                        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-sm">
                                    SA
                                </div>
                                <div>
                                    <h1 className="text-base leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white">
                                        SDIT Al-Aziz
                                    </h1>
                                    <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                        Sekolah Dasar Islam Terpadu
                                    </p>
                                </div>
                            </div>

                            {/* Desktop Nav Links */}
                            <div className="hidden items-center gap-1 md:flex">
                                <a
                                    href="#beranda"
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                                >
                                    Beranda
                                </a>
                                <a
                                    href="#tentang"
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                                >
                                    Tentang
                                </a>
                                <a
                                    href="#program"
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                                >
                                    Program
                                </a>
                                <a
                                    href="#fasilitas"
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                                >
                                    Fasilitas
                                </a>
                                <a
                                    href="#berita"
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                                >
                                    Berita
                                </a>
                                <a
                                    href="#kontak"
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                                >
                                    Kontak
                                </a>
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
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
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
                                <div className="flex flex-col gap-1">
                                    <a
                                        href="#beranda"
                                        className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Beranda
                                    </a>
                                    <a
                                        href="#tentang"
                                        className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Tentang
                                    </a>
                                    <a
                                        href="#program"
                                        className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Program
                                    </a>
                                    <a
                                        href="#fasilitas"
                                        className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Fasilitas
                                    </a>
                                    <a
                                        href="#berita"
                                        className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Berita
                                    </a>
                                    <a
                                        href="#kontak"
                                        className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Kontak
                                    </a>
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

                {/* Hero Section */}
                <section
                    id="beranda"
                    className="relative mt-[calc(1.75rem+3.75rem)] min-h-[560px] overflow-hidden sm:min-h-[600px] lg:min-h-[640px]"
                >
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: "url('/images/hero.jpg')" }}
                    />

                    {/* Left gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/70 to-transparent" />
                    {/* Extra dark overlay on very left for text legibility */}
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-emerald-950/60 to-transparent" />

                    {/* Content */}
                    <div className="relative flex h-full min-h-[560px] items-center sm:min-h-[600px] lg:min-h-[640px]">
                        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-12">
                            {/* Left: text */}
                            <div>
                                <p className="text-base font-medium text-white/80 sm:text-lg">
                                    Pendekatan Baru dalam
                                </p>

                                <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    Pendidikan Islam{' '}
                                    <span className="text-orange-400">
                                        Terpadu
                                    </span>
                                </h1>

                                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                                    SDIT Al-Aziz memadukan kurikulum nasional
                                    dengan nilai-nilai keislaman untuk membentuk
                                    generasi yang cerdas, berkarakter, dan
                                    berakhlak mulia.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <a
                                        href="#kontak"
                                        className="rounded-lg bg-orange-500 px-7 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-orange-600"
                                    >
                                        Daftar Sekarang
                                    </a>
                                    <a
                                        href="#program"
                                        className="rounded-lg bg-emerald-800 px-7 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-emerald-900"
                                    >
                                        Program Kami
                                    </a>
                                </div>

                                {/* Stats strip */}
                                <div className="mt-12 flex flex-wrap gap-6">
                                    {[
                                        { value: '500+', label: 'Siswa Aktif' },
                                        { value: '50+', label: 'Pendidik' },
                                        {
                                            value: '15+',
                                            label: 'Tahun Berdiri',
                                        },
                                        { value: '98%', label: 'Kelulusan' },
                                    ].map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="text-center"
                                        >
                                            <div className="text-2xl font-extrabold text-orange-400">
                                                {stat.value}
                                            </div>
                                            <div className="mt-0.5 text-xs font-medium text-white/70">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: floating image with decorations */}
                            <div className="hidden items-center justify-end lg:flex">
                                <div className="relative pb-6">
                                    {/* Decorative ring */}
                                    <div className="absolute -inset-3 rounded-[2rem] border-2 border-white/20" />
                                    {/* Decorative orange box bottom-right */}
                                    <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-2xl bg-orange-500/30 backdrop-blur-sm" />
                                    {/* Decorative white box top-left */}
                                    <div className="absolute -top-4 -left-4 h-20 w-20 rounded-xl bg-white/10 backdrop-blur-sm" />
                                    {/* Image */}
                                    <img
                                        src="/images/hero-right.jpg"
                                        alt="Siswa SDIT Al-Aziz"
                                        className="relative h-[420px] w-[340px] rounded-[1.75rem] object-cover object-center"
                                    />
                                    {/* Badge */}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-xs font-bold whitespace-nowrap text-emerald-800 shadow-sm">
                                        Lingkungan Belajar Islami
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tentang Section */}
                <section id="tentang" className="py-20 sm:py-28">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                    Tentang Kami
                                </span>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Pendidikan Berkualitas dengan Nilai-Nilai
                                    Islam
                                </h2>
                                <p className="mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                    SDIT Al-Aziz adalah sekolah dasar Islam
                                    terpadu yang berkomitmen untuk memberikan
                                    pendidikan holistik kepada setiap siswa.
                                    Kami memadukan kurikulum nasional dengan
                                    kurikulum keislaman yang komprehensif,
                                    sehingga siswa tidak hanya unggul dalam
                                    akademik tetapi juga memiliki fondasi
                                    keimanan dan akhlak yang kuat.
                                </p>
                                <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                    Dengan tenaga pendidik yang profesional dan
                                    berpengalaman, kami menciptakan lingkungan
                                    belajar yang kondusif, menyenangkan, dan
                                    penuh kasih sayang.
                                </p>

                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    {[
                                        {
                                            icon: BookIcon,
                                            title: 'Kurikulum Terpadu',
                                            desc: 'Kurikulum nasional terintegrasi keislaman',
                                            stat: '6',
                                            statLabel: 'Tahun',
                                        },
                                        {
                                            icon: HeartIcon,
                                            title: 'Pembinaan Akhlak',
                                            desc: 'Pembiasaan ibadah dan akhlak mulia',
                                            stat: '15+',
                                            statLabel: 'Program',
                                        },
                                        {
                                            icon: StarIcon,
                                            title: 'Prestasi Gemilang',
                                            desc: 'Meraih prestasi di berbagai kompetisi',
                                            stat: '50+',
                                            statLabel: 'Prestasi',
                                        },
                                        {
                                            icon: UsersIcon,
                                            title: 'Guru Profesional',
                                            desc: 'Tenaga pendidik bersertifikasi',
                                            stat: '30+',
                                            statLabel: 'Guru',
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.title}
                                            className="relative overflow-hidden rounded-xl bg-emerald-600 p-4 text-white dark:bg-emerald-700"
                                        >
                                            <item.icon className="absolute right-3 bottom-3 h-16 w-16 text-white/10" />
                                            <h3 className="text-sm font-semibold leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="mt-1 text-[11px] leading-snug text-emerald-100/80">
                                                {item.desc}
                                            </p>
                                            <div className="mt-3 flex items-baseline gap-1.5">
                                                <span className="text-3xl font-extrabold leading-none">
                                                    {item.stat}
                                                </span>
                                                <span className="text-xs font-medium text-emerald-100/90">
                                                    {item.statLabel}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30">
                                    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-600/10 dark:bg-emerald-400/10">
                                            <svg
                                                className="h-10 w-10 text-emerald-600 dark:text-emerald-400"
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
                                        </div>
                                        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                                            Visi Kami
                                        </h3>
                                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                            "Menjadi lembaga pendidikan Islam
                                            terpadu yang unggul dalam membentuk
                                            generasi Qurani, berilmu, berakhlak
                                            mulia, dan berprestasi."
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute -right-4 -bottom-4 h-40 w-40 rounded-2xl bg-emerald-600/5 dark:bg-emerald-400/5" />
                                <div className="absolute -top-4 -left-4 h-24 w-24 rounded-2xl bg-teal-600/5 dark:bg-teal-400/5" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Program Unggulan */}
                <section
                    id="program"
                    className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                Program Unggulan
                            </span>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Kurikulum yang Komprehensif
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400">
                                Program pendidikan yang dirancang untuk
                                mengembangkan potensi siswa secara menyeluruh.
                            </p>
                        </div>

                        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    title: 'Tahfidz Al-Quran',
                                    desc: 'Program hafalan Al-Quran dengan metode yang menyenangkan dan terstruktur. Target hafalan minimal 3 juz selama 6 tahun.',
                                    icon: QuranIcon,
                                    color: 'emerald',
                                    num: '01',
                                    tag: 'Karakter Islami',
                                },
                                {
                                    title: 'Bahasa Arab & Inggris',
                                    desc: 'Pembelajaran bilingual yang intensif untuk mempersiapkan siswa menghadapi tantangan global.',
                                    icon: LanguageIcon,
                                    color: 'teal',
                                    num: '02',
                                    tag: 'Komunikasi Global',
                                },
                                {
                                    title: 'Sains & Teknologi',
                                    desc: 'Kurikulum STEM yang mengembangkan kemampuan berpikir kritis dan kreativitas siswa.',
                                    icon: ScienceIcon,
                                    color: 'orange',
                                    num: '03',
                                    tag: 'STEM',
                                },
                                {
                                    title: 'Kepemimpinan',
                                    desc: 'Program pengembangan karakter dan jiwa kepemimpinan melalui berbagai kegiatan.',
                                    icon: LeaderIcon,
                                    color: 'emerald',
                                    num: '04',
                                    tag: 'Soft Skills',
                                },
                                {
                                    title: 'Seni & Olahraga',
                                    desc: 'Pengembangan bakat dan minat siswa melalui ekstrakulikuler seni dan olahraga.',
                                    icon: ArtIcon,
                                    color: 'teal',
                                    num: '05',
                                    tag: 'Kreativitas',
                                },
                                {
                                    title: 'Life Skills',
                                    desc: 'Pembekalan keterampilan hidup seperti kemandirian, kerja tim, dan problem solving.',
                                    icon: LifeIcon,
                                    color: 'orange',
                                    num: '06',
                                    tag: 'Kecakapan Hidup',
                                },
                            ].map((program) => {
                                const palette: Record<
                                    string,
                                    {
                                        gradient: string;
                                        iconBg: string;
                                        iconText: string;
                                        tagBg: string;
                                        tagText: string;
                                        numText: string;
                                        line: string;
                                        arrow: string;
                                    }
                                > = {
                                    emerald: {
                                        gradient:
                                            'from-emerald-500/10 via-transparent to-transparent dark:from-emerald-500/15',
                                        iconBg: 'bg-emerald-100 dark:bg-emerald-950',
                                        iconText:
                                            'text-emerald-600 dark:text-emerald-400',
                                        tagBg: 'bg-emerald-50 dark:bg-emerald-950/60',
                                        tagText:
                                            'text-emerald-700 dark:text-emerald-400',
                                        numText:
                                            'text-emerald-200 dark:text-emerald-900',
                                        line: 'bg-emerald-500',
                                        arrow: 'text-emerald-600 dark:text-emerald-400',
                                    },
                                    teal: {
                                        gradient:
                                            'from-teal-500/10 via-transparent to-transparent dark:from-teal-500/15',
                                        iconBg: 'bg-teal-100 dark:bg-teal-950',
                                        iconText:
                                            'text-teal-600 dark:text-teal-400',
                                        tagBg: 'bg-teal-50 dark:bg-teal-950/60',
                                        tagText:
                                            'text-teal-700 dark:text-teal-400',
                                        numText:
                                            'text-teal-200 dark:text-teal-900',
                                        line: 'bg-teal-500',
                                        arrow: 'text-teal-600 dark:text-teal-400',
                                    },
                                    orange: {
                                        gradient:
                                            'from-orange-500/10 via-transparent to-transparent dark:from-orange-500/15',
                                        iconBg: 'bg-orange-100 dark:bg-orange-950',
                                        iconText:
                                            'text-orange-600 dark:text-orange-400',
                                        tagBg: 'bg-orange-50 dark:bg-orange-950/60',
                                        tagText:
                                            'text-orange-700 dark:text-orange-400',
                                        numText:
                                            'text-orange-200 dark:text-orange-900',
                                        line: 'bg-orange-500',
                                        arrow: 'text-orange-600 dark:text-orange-400',
                                    },
                                };
                                const p = palette[program.color];
                                return (
                                    <div
                                        key={program.title}
                                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                                    >
                                        {/* Colored top bar */}
                                        <div
                                            className={`h-1 w-0 ${p.line} transition-all duration-500 ease-out group-hover:w-full`}
                                        />

                                        {/* Gradient wash */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${p.gradient} pointer-events-none`}
                                        />

                                        {/* Big background number */}
                                        <span
                                            className={`pointer-events-none absolute top-3 right-4 text-7xl leading-none font-black select-none ${p.numText} transition duration-300 group-hover:opacity-60`}
                                        >
                                            {program.num}
                                        </span>

                                        <div className="relative flex flex-1 flex-col p-6">
                                            {/* Tag */}
                                            <span
                                                className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${p.tagBg} ${p.tagText}`}
                                            >
                                                {program.tag}
                                            </span>

                                            {/* Icon */}
                                            <div
                                                className={`mt-5 inline-flex rounded-xl p-3 ${p.iconBg} w-fit shadow-sm`}
                                            >
                                                <program.icon
                                                    className={`h-6 w-6 ${p.iconText}`}
                                                />
                                            </div>

                                            {/* Title */}
                                            <h3 className="mt-4 text-lg leading-snug font-bold text-gray-900 dark:text-white">
                                                {program.title}
                                            </h3>

                                            {/* Desc */}
                                            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                                {program.desc}
                                            </p>

                                            {/* Footer link */}
                                            <div className="mt-6 flex items-center gap-1.5 border-t border-gray-100 pt-4 dark:border-gray-800">
                                                <span
                                                    className={`text-xs font-semibold ${p.arrow} transition-all duration-200 group-hover:underline`}
                                                >
                                                    Selengkapnya
                                                </span>
                                                <svg
                                                    className={`h-3.5 w-3.5 ${p.arrow} transition-transform duration-200 group-hover:translate-x-1`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2.5}
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Fasilitas */}
                <section
                    id="fasilitas"
                    className="relative overflow-hidden py-24 sm:py-32"
                >
                    {/* Background image with light overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/images/fasilitas-bg.jpg')",
                        }}
                    />
                    <div className="absolute inset-0 bg-white/90 dark:bg-gray-950/90" />

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                Fasilitas
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Lingkungan Belajar yang Nyaman
                            </h2>
                            <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 dark:text-gray-400">
                                Fasilitas lengkap dan modern untuk mendukung
                                proses belajar mengajar yang optimal.
                            </p>
                        </div>

                        {/* Cards */}
                        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    name: 'Ruang Kelas Ber-AC',
                                    desc: 'Kelas nyaman & kondusif',
                                    icon: ClassroomIcon,
                                },
                                {
                                    name: 'Lab Komputer',
                                    desc: 'Teknologi terkini',
                                    icon: ComputerIcon,
                                },
                                {
                                    name: 'Perpustakaan',
                                    desc: 'Ribuan koleksi buku',
                                    icon: LibraryIcon,
                                },
                                {
                                    name: 'Masjid',
                                    desc: 'Sarana ibadah lengkap',
                                    icon: MosqueIcon,
                                },
                                {
                                    name: 'Lapangan Olahraga',
                                    desc: 'Area bermain & olahraga',
                                    icon: SportIcon,
                                },
                                {
                                    name: 'Kantin Sehat',
                                    desc: 'Menu halal & bergizi',
                                    icon: FoodIcon,
                                },
                                {
                                    name: 'UKS',
                                    desc: 'Kesehatan siswa terjaga',
                                    icon: HealthIcon,
                                },
                                {
                                    name: 'Taman Bermain',
                                    desc: 'Ruang kreativitas anak',
                                    icon: PlaygroundIcon,
                                },
                            ].map((facility) => (
                                <div
                                    key={facility.name}
                                    className="group relative overflow-hidden rounded-2xl bg-emerald-600 p-5 text-white transition duration-300 hover:-translate-y-1 dark:bg-emerald-700"
                                >
                                    {/* Decorative curved lines - top right */}
                                    <svg className="pointer-events-none absolute -top-3 -right-3 h-20 w-20 text-emerald-500/30" fill="none" viewBox="0 0 80 80" strokeWidth={1.5} stroke="currentColor">
                                        <path d="M80 0 C80 44.18 44.18 80 0 80" />
                                        <path d="M80 12 C80 49.56 49.56 80 12 80" />
                                        <path d="M80 24 C80 54.93 54.93 80 24 80" />
                                    </svg>

                                    {/* Decorative circle - bottom left */}
                                    <div className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full border-2 border-emerald-500/20" />
                                    <div className="pointer-events-none absolute -bottom-3 -left-3 h-14 w-14 rounded-full border-2 border-emerald-500/15" />

                                    {/* Diagonal accent line */}
                                    <div className="pointer-events-none absolute top-0 right-12 h-full w-px origin-top rotate-12 bg-gradient-to-b from-emerald-400/20 via-emerald-400/10 to-transparent" />

                                    <div className="relative">
                                        {/* Icon */}
                                        <div className="inline-flex rounded-xl bg-white/15 p-3">
                                            <facility.icon className="h-6 w-6 text-white" />
                                        </div>

                                        <h3 className="mt-4 text-sm font-bold text-white">
                                            {facility.name}
                                        </h3>
                                        <p className="mt-1 text-xs text-emerald-100/70">
                                            {facility.desc}
                                        </p>

                                        {/* Bottom accent line */}
                                        <div className="mt-4 h-px w-0 bg-gradient-to-r from-white/40 to-transparent transition-all duration-300 group-hover:w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Berita Terbaru */}
                <section
                    id="berita"
                    className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                    Berita & Kegiatan
                                </span>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Berita Terbaru
                                </h2>
                                <p className="mt-4 max-w-xl text-base text-gray-600 dark:text-gray-400">
                                    Ikuti perkembangan terkini tentang kegiatan
                                    dan prestasi SDIT Al-Aziz.
                                </p>
                            </div>
                            <a
                                href="#"
                                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                            >
                                Lihat Semua Berita
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </a>
                        </div>

                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Card Berita 1 - Featured */}
                            <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.05)] dark:bg-gray-900 dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3),0_10px_20px_-2px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4),0_20px_25px_-5px_rgba(0,0,0,0.3)]">
                                <div className="relative overflow-hidden">
                                    <div className="aspect-[16/9] bg-gradient-to-br from-emerald-600 to-teal-700">
                                        <div className="flex h-full items-center justify-center p-8">
                                            <svg
                                                className="h-16 w-16 text-white/30"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                                            Prestasi
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1.5">
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
                                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                                />
                                            </svg>
                                            <span>25 Maret 2026</span>
                                        </div>
                                        <span className="text-gray-300 dark:text-gray-600">
                                            &bull;
                                        </span>
                                        <div className="flex items-center gap-1.5">
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
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                            <span>3 menit baca</span>
                                        </div>
                                    </div>
                                    <h3 className="mt-3 text-base leading-snug font-bold text-gray-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                                        Siswa SDIT Al-Aziz Raih Juara 1
                                        Olimpiade Matematika Tingkat Nasional
                                    </h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        Kebanggaan bagi seluruh keluarga besar
                                        SDIT Al-Aziz. Ahmad Fauzi, siswa kelas
                                        5, berhasil meraih juara pertama dalam
                                        kompetisi bergengsi tersebut.
                                    </p>
                                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                                RA
                                            </div>
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                Redaksi Al-Aziz
                                            </span>
                                        </div>
                                        <a
                                            href="#"
                                            className="flex items-center gap-1 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
                                        >
                                            Baca selengkapnya
                                            <svg
                                                className="h-3.5 w-3.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </article>

                            {/* Card Berita 2 */}
                            <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.05)] dark:bg-gray-900 dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3),0_10px_20px_-2px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4),0_20px_25px_-5px_rgba(0,0,0,0.3)]">
                                <div className="relative overflow-hidden">
                                    <div className="aspect-[16/9] bg-gradient-to-br from-emerald-600 to-teal-700">
                                        <div className="flex h-full items-center justify-center p-8">
                                            <svg
                                                className="h-16 w-16 text-white/30"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                                            Kegiatan
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1.5">
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
                                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                                />
                                            </svg>
                                            <span>20 Maret 2026</span>
                                        </div>
                                        <span className="text-gray-300 dark:text-gray-600">
                                            &bull;
                                        </span>
                                        <div className="flex items-center gap-1.5">
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
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                            <span>4 menit baca</span>
                                        </div>
                                    </div>
                                    <h3 className="mt-3 text-base leading-snug font-bold text-gray-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                                        Kunjungan Edukatif ke Museum Nasional:
                                        Belajar Sejarah Langsung di Lapangan
                                    </h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        Ratusan siswa kelas 4, 5, dan 6
                                        mengikuti kunjungan edukatif ke Museum
                                        Nasional sebagai bagian dari program
                                        pembelajaran berbasis pengalaman nyata.
                                    </p>
                                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                                RA
                                            </div>
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                Redaksi Al-Aziz
                                            </span>
                                        </div>
                                        <a
                                            href="#"
                                            className="flex items-center gap-1 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
                                        >
                                            Baca selengkapnya
                                            <svg
                                                className="h-3.5 w-3.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </article>

                            {/* Card Berita 3 */}
                            <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.05)] dark:bg-gray-900 dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3),0_10px_20px_-2px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4),0_20px_25px_-5px_rgba(0,0,0,0.3)]">
                                <div className="relative overflow-hidden">
                                    <div className="aspect-[16/9] bg-gradient-to-br from-emerald-600 to-teal-700">
                                        <div className="flex h-full items-center justify-center p-8">
                                            <svg
                                                className="h-16 w-16 text-white/30"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                                            Pengumuman
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1.5">
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
                                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                                />
                                            </svg>
                                            <span>15 Maret 2026</span>
                                        </div>
                                        <span className="text-gray-300 dark:text-gray-600">
                                            &bull;
                                        </span>
                                        <div className="flex items-center gap-1.5">
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
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                            <span>2 menit baca</span>
                                        </div>
                                    </div>
                                    <h3 className="mt-3 text-base leading-snug font-bold text-gray-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                                        Pendaftaran Peserta Didik Baru Tahun
                                        Ajaran 2026/2027 Resmi Dibuka
                                    </h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        SDIT Al-Aziz membuka pendaftaran peserta
                                        didik baru untuk tahun ajaran 2026/2027.
                                        Kuota terbatas, segera daftarkan
                                        putra-putri Anda sebelum 30 April 2026.
                                    </p>
                                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                                RA
                                            </div>
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                Redaksi Al-Aziz
                                            </span>
                                        </div>
                                        <a
                                            href="#"
                                            className="flex items-center gap-1 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
                                        >
                                            Baca selengkapnya
                                            <svg
                                                className="h-3.5 w-3.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                {/* Agenda */}
                <section id="agenda" className="bg-emerald-50/60 py-20 sm:py-28 dark:bg-emerald-950/10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                Agenda
                            </span>
                            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                                Agenda{' '}
                                <span className="text-emerald-600 dark:text-emerald-400">
                                    Kegiatan
                                </span>
                            </h2>
                            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                Jadwal kegiatan dan acara penting SDIT Al-Aziz yang akan datang.
                            </p>
                        </div>

                        {/* Agenda grid */}
                        <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                            {[
                                {
                                    day: '15',
                                    month: 'Apr',
                                    year: '2026',
                                    title: 'Ujian Tengah Semester Genap',
                                    desc: 'Pelaksanaan UTS semester genap untuk seluruh kelas. Siswa diharapkan mempersiapkan diri dengan baik.',
                                },
                                {
                                    day: '22',
                                    month: 'Apr',
                                    year: '2026',
                                    title: 'Wisuda Tahfidz Al-Quran',
                                    desc: 'Acara wisuda bagi siswa yang telah menyelesaikan target hafalan Al-Quran semester ini.',
                                },
                                {
                                    day: '01',
                                    month: 'Mei',
                                    year: '2026',
                                    title: 'Penerimaan Rapor Mid Semester',
                                    desc: 'Orang tua/wali murid diundang untuk mengambil rapor dan berdiskusi dengan wali kelas.',
                                },
                                {
                                    day: '10',
                                    month: 'Mei',
                                    year: '2026',
                                    title: 'Lomba Tahfidz Antar Kelas',
                                    desc: 'Kompetisi hafalan Al-Quran antar kelas untuk memotivasi semangat menghafal siswa.',
                                },
                            ].map((agenda) => (
                                <div
                                    key={agenda.title}
                                    className="flex items-center gap-5"
                                >
                                    {/* Date box */}
                                    <div className="relative flex h-28 w-28 flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-emerald-700/30 bg-emerald-600 text-white dark:border-emerald-500/30 dark:bg-emerald-700">
                                        {/* Decorative curved lines top-right */}
                                        <svg className="pointer-events-none absolute -top-2 -right-2 h-16 w-16 text-emerald-500/30" fill="none" viewBox="0 0 60 60" strokeWidth={1.5} stroke="currentColor">
                                            <path d="M60 0 C60 33.14 33.14 60 0 60" />
                                            <path d="M60 10 C60 37.61 37.61 60 10 60" />
                                            <path d="M60 20 C60 42.09 42.09 60 20 60" />
                                        </svg>
                                        <svg className="relative h-6 w-6 text-emerald-200/70" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>
                                        <span className="relative mt-1 text-2xl font-extrabold leading-none">
                                            {agenda.day} {agenda.month}
                                        </span>
                                        <span className="relative mt-0.5 text-xs font-medium text-emerald-200/80">
                                            {agenda.year}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-white">
                                            {agenda.title}
                                        </h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                            {agenda.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimoni Wali Murid */}
                <section id="testimoni" className="py-20 sm:py-28">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                Testimoni
                            </span>
                            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                                Apa Kata{' '}
                                <span className="text-emerald-600 dark:text-emerald-400">
                                    Wali Murid
                                </span>
                            </h2>
                            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                Kepercayaan orang tua adalah amanah terbesar
                                kami. Simak pengalaman mereka bersama SDIT
                                Al-Aziz.
                            </p>
                        </div>

                        {/* Testimonial grid */}
                        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    name: 'Bpk. Ahmad Fauzi',
                                    role: 'Orang Tua Siswa Kelas 4',
                                    avatar: 'AF',
                                    quote: 'Alhamdulillah, anak saya sangat berkembang sejak bersekolah di sini. Bukan hanya nilai akademiknya yang meningkat, tapi akhlak dan hafalan Quran-nya pun luar biasa. Gurunya sabar dan profesional.',
                                    highlight: 'Akhlak & Hafalan Quran',
                                },
                                {
                                    name: 'Ibu Siti Rahmawati',
                                    role: 'Orang Tua Siswa Kelas 6',
                                    avatar: 'SR',
                                    quote: 'SDIT Al-Aziz benar-benar menjawab harapan saya sebagai orang tua. Anak saya diajarkan kemandirian, disiplin, dan nilai-nilai Islam sejak dini. Saya bangga dengan perkembangan mereka.',
                                    highlight: 'Kemandirian & Disiplin',
                                },
                                {
                                    name: 'Bpk. Hendra Wijaya',
                                    role: 'Orang Tua Siswa Kelas 2',
                                    avatar: 'HW',
                                    quote: 'Fasilitas lengkap, guru-guru yang peduli, dan lingkungan yang islami. Anak saya betah dan semangat berangkat sekolah setiap hari. Komunitas orang tua di sini juga sangat supportif.',
                                    highlight: 'Lingkungan Islami',
                                },
                                {
                                    name: 'Ibu Nurul Hidayah',
                                    role: 'Orang Tua Siswa Kelas 3',
                                    avatar: 'NH',
                                    quote: 'Program Tahfidz yang terstruktur membuat anak saya berhasil menghafal 2 juz hanya dalam setahun. Metode pengajarannya menyenangkan sehingga anak tidak merasa terbebani.',
                                    highlight: 'Program Tahfidz',
                                },
                                {
                                    name: 'Bpk. Rizky Pratama',
                                    role: 'Orang Tua Siswa Kelas 5',
                                    avatar: 'RP',
                                    quote: 'Komunikasi antara sekolah dan orang tua sangat baik. Kami selalu diinformasikan perkembangan anak secara berkala. Kepala sekolah dan guru sangat terbuka untuk berdiskusi.',
                                    highlight: 'Komunikasi Aktif',
                                },
                                {
                                    name: 'Ibu Dewi Kusuma',
                                    role: 'Orang Tua Siswa Kelas 1',
                                    avatar: 'DK',
                                    quote: 'Sejak hari pertama, anak saya langsung nyaman. Guru kelasnya sangat perhatian dan sabar menghadapi anak-anak. Pendekatan pembelajaran yang fun membuat anak cepat beradaptasi.',
                                    highlight: 'Guru yang Perhatian',
                                },
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.05)] dark:bg-gray-900 dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3),0_10px_20px_-2px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4),0_20px_25px_-5px_rgba(0,0,0,0.3)]"
                                >
                                    {/* Top accent bar */}
                                    <div className="h-1 w-0 bg-emerald-500 transition-all duration-500 ease-out group-hover:w-full" />

                                    <div className="flex flex-1 flex-col p-6">
                                        {/* Stars */}
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="h-4 w-4 text-orange-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ),
                                            )}
                                        </div>

                                        {/* Quote mark */}
                                        <svg
                                            className="mt-4 h-8 w-8 text-emerald-100 dark:text-emerald-900/50"
                                            fill="currentColor"
                                            viewBox="0 0 32 32"
                                        >
                                            <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.379 1.121-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.379 1.121-2.5 2.5-2.5V8z" />
                                        </svg>

                                        {/* Quote text */}
                                        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                            {item.quote}
                                        </p>

                                        {/* Highlight tag */}
                                        <div className="mt-5">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                                <span className="h-1 w-1 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                                {item.highlight}
                                            </span>
                                        </div>

                                        {/* Divider */}
                                        <div className="mt-5 border-t border-gray-100 pt-5 dark:border-gray-800">
                                            {/* Avatar + identity */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                                    {item.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {item.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Alumni */}
                <section
                    id="alumni"
                    className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                Alumni
                            </span>
                            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Jejak Prestasi{' '}
                                <span className="text-emerald-600 dark:text-emerald-400">
                                    Alumni Kami
                                </span>
                            </h2>
                            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                Lulusan SDIT Al-Aziz telah menapaki berbagai
                                bidang dan melanjutkan ke sekolah-sekolah
                                terbaik di dalam dan luar negeri.
                            </p>
                        </div>

                        {/* Alumni cards grid - 2 columns */}
                        <div className="mt-16 grid gap-6 sm:grid-cols-2">
                            {[
                                {
                                    name: 'Ahmad Fauzan R.',
                                    batch: 'Angkatan ke-5 SDIT Al-Aziz',
                                    destination:
                                        'Teknik Informatika, Universitas Indonesia',
                                    quote: 'Fondasi ilmu agama dan akademik yang kuat dari SDIT Al-Aziz membuat saya siap menghadapi tantangan di jenjang yang lebih tinggi.',
                                    avatar: 'AF',
                                    blob: 'bg-yellow-300',
                                    ring: 'border-yellow-400',
                                    dot: 'bg-yellow-400',
                                },
                                {
                                    name: 'Siti Aisyah N.',
                                    batch: 'Angkatan ke-4 SDIT Al-Aziz',
                                    destination:
                                        'Kedokteran, Universitas Gadjah Mada',
                                    quote: 'Tak hanya akademik, SDIT Al-Aziz memberikan support penuh secara mental dan emosional sehingga saya tumbuh percaya diri.',
                                    avatar: 'SA',
                                    blob: 'bg-emerald-300',
                                    ring: 'border-emerald-400',
                                    dot: 'bg-emerald-400',
                                },
                                {
                                    name: 'Muhammad Rizqi H.',
                                    batch: 'Angkatan ke-6 SDIT Al-Aziz',
                                    destination:
                                        'Hukum Islam, Universitas Al-Azhar Mesir',
                                    quote: 'Program Tahfidz dan bahasa Arab yang intensif membuka jalan saya menuju universitas impian di Timur Tengah.',
                                    avatar: 'MR',
                                    blob: 'bg-orange-300',
                                    ring: 'border-orange-400',
                                    dot: 'bg-orange-400',
                                },
                                {
                                    name: 'Nurul Fadhilah S.',
                                    batch: 'Angkatan ke-3 SDIT Al-Aziz',
                                    destination:
                                        'Akuntansi, Universitas Teknologi Malaysia',
                                    quote: 'Disiplin dan nilai-nilai keislaman yang ditanamkan sejak SD menjadi bekal paling berharga dalam kehidupan saya hingga hari ini.',
                                    avatar: 'NF',
                                    blob: 'bg-teal-300',
                                    ring: 'border-teal-400',
                                    dot: 'bg-teal-400',
                                },
                            ].map((alumni) => (
                                <div
                                    key={alumni.name}
                                    className="group relative flex overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/5 dark:bg-gray-900"
                                >
                                    {/* Left: photo area with layered decorative shapes */}
                                    <div className="relative w-36 shrink-0 overflow-hidden sm:w-44">
                                        {/* Base fill */}
                                        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800" />

                                        {/* Large organic blob — bottom-left anchor */}
                                        <div
                                            className={`absolute -bottom-8 -left-8 h-40 w-40 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] ${alumni.blob} opacity-90`}
                                        />

                                        {/* Secondary smaller blob — top-right accent */}
                                        <div
                                            className={`absolute -top-6 -right-6 h-20 w-20 rounded-[60%_40%_45%_55%/50%_60%_40%_50%] ${alumni.blob} opacity-40`}
                                        />

                                        {/* Ring circle — mid overlay */}
                                        <div
                                            className={`absolute bottom-6 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border-4 ${alumni.ring} opacity-30`}
                                        />

                                        {/* Small dot cluster */}
                                        <div
                                            className={`absolute top-4 left-4 h-2.5 w-2.5 rounded-full ${alumni.dot} opacity-60`}
                                        />
                                        <div
                                            className={`absolute top-8 left-7 h-1.5 w-1.5 rounded-full ${alumni.dot} opacity-40`}
                                        />
                                        <div
                                            className={`absolute top-5 left-9 h-1 w-1 rounded-full ${alumni.dot} opacity-30`}
                                        />

                                        {/* Photo / avatar */}
                                        <div className="relative z-10 flex h-full items-end justify-center pt-6 pb-3 pl-3">
                                            <div className="flex h-28 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/80 shadow-lg ring-2 ring-white/60 backdrop-blur-sm sm:h-36 sm:w-28 dark:bg-gray-900/80">
                                                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                                                    {alumni.avatar}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: content */}
                                    <div className="flex flex-1 flex-col justify-between p-6 pl-5">
                                        {/* Quote */}
                                        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                            {alumni.quote}
                                        </p>

                                        {/* Name + batch */}
                                        <div className="mt-4">
                                            <p className="inline rounded bg-emerald-600 px-2 py-0.5 text-sm font-bold text-white">
                                                {alumni.name}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                {alumni.batch}
                                            </p>
                                        </div>

                                        {/* Destination badge */}
                                        <div className="mt-4">
                                            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-900 px-4 py-2 text-xs font-semibold text-white dark:bg-emerald-800">
                                                <svg
                                                    className="h-3.5 w-3.5 shrink-0 text-emerald-300"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                                    />
                                                </svg>
                                                {alumni.destination}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="relative bg-slate-100 dark:bg-slate-900">
                    {/* Dot-grid texture */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle, #0f172a 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                        }}
                    />

                    {/* Student image — absolute to section, bottom-0 anchored, overflows top */}
                    <img
                        src="/images/cta-student.png"
                        alt="Siswa SDIT Al-Aziz"
                        className="pointer-events-none absolute bottom-0 left-4 z-20 hidden object-contain object-bottom drop-shadow-2xl sm:block lg:left-12"
                        style={{ height: 'calc(100% + 160px)', width: '420px' }}
                    />

                    <div className="relative mx-auto max-w-7xl">
                        {/* Right: text + CTA — pushed to right to avoid image overlap */}
                        <div className="flex flex-1 flex-col justify-center px-10 py-12 sm:pl-[420px] sm:pr-16 lg:pl-[460px] lg:py-14">
                            <p className="max-w-lg text-lg leading-relaxed text-slate-500 dark:text-slate-400">
                                Ayo jadi bagian dari generasi emas yang cerdas,
                                berkarakter, dan berakhlak mulia.
                            </p>
                            <p className="mt-3 max-w-lg text-2xl leading-snug font-extrabold text-slate-800 sm:text-3xl dark:text-white">
                                Mari bergabung bersama kami.
                            </p>
                            <div className="mt-8">
                                <a
                                    href="#kontak"
                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-8 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                                >
                                    Daftar Sekarang
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Kontak */}
                <section
                    id="kontak"
                    className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                    Kontak
                                </span>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Hubungi Kami
                                </h2>
                                <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                                    Silakan hubungi kami untuk informasi lebih
                                    lanjut tentang pendaftaran dan program
                                    sekolah.
                                </p>

                                <div className="mt-8 space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                                            <svg
                                                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
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
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Alamat
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                Jl. Pendidikan No. 1, Kelurahan
                                                Contoh,
                                                <br />
                                                Kecamatan Contoh, Kota Contoh
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                                            <svg
                                                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Telepon
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                (021) 1234-5678
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                                            <svg
                                                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Email
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                info@sditalaziz.sch.id
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                                            <svg
                                                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Jam Operasional
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                Senin - Jumat: 07.00 - 15.00 WIB
                                                <br />
                                                Sabtu: 07.00 - 12.00 WIB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Kirim Pesan
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Isi formulir di bawah ini dan kami akan
                                    segera menghubungi Anda.
                                </p>

                                <form
                                    className="mt-6 space-y-4"
                                    onSubmit={(e: FormEvent) =>
                                        e.preventDefault()
                                    }
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                            placeholder="contoh@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            No. Telepon
                                        </label>
                                        <input
                                            type="tel"
                                            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                            placeholder="08xxxxxxxxxx"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Pesan
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400"
                                            placeholder="Tulis pesan Anda..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        Kirim Pesan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-100 bg-white py-12 dark:border-gray-800 dark:bg-gray-950">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
                                    SA
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                                        SDIT Al-Aziz
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Sekolah Dasar Islam Terpadu
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                &copy; {new Date().getFullYear()} SDIT Al-Aziz.
                                Hak cipta dilindungi.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

// Icon Components

function BookIcon({ className }: { className?: string }) {
    return (
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
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
        </svg>
    );
}

function HeartIcon({ className }: { className?: string }) {
    return (
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
        </svg>
    );
}

function StarIcon({ className }: { className?: string }) {
    return (
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
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
        </svg>
    );
}

function UsersIcon({ className }: { className?: string }) {
    return (
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
}

function QuranIcon({ className }: { className?: string }) {
    return (
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
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
        </svg>
    );
}

function LanguageIcon({ className }: { className?: string }) {
    return (
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
                d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
            />
        </svg>
    );
}

function ScienceIcon({ className }: { className?: string }) {
    return (
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
                d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
        </svg>
    );
}

function LeaderIcon({ className }: { className?: string }) {
    return (
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
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
        </svg>
    );
}

function ArtIcon({ className }: { className?: string }) {
    return (
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
                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V4.846a2.25 2.25 0 0 0-1.632-2.163l-1.32-.377a1.803 1.803 0 1 0-.99 3.467l2.31.66A2.25 2.25 0 0 1 9 9Zm-8.25 6.75h.008v.008H.75v-.008Zm0-3h.008v.008H.75v-.008Z"
            />
        </svg>
    );
}

function LifeIcon({ className }: { className?: string }) {
    return (
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
                d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
        </svg>
    );
}

function ClassroomIcon({ className }: { className?: string }) {
    return (
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
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21"
            />
        </svg>
    );
}

function ComputerIcon({ className }: { className?: string }) {
    return (
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
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z"
            />
        </svg>
    );
}

function LibraryIcon({ className }: { className?: string }) {
    return (
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
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
            />
        </svg>
    );
}

function MosqueIcon({ className }: { className?: string }) {
    return (
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
                d="M12 3v1.5M12 4.5C9 4.5 6 7.5 6 10.5V21h12V10.5c0-3-3-6-6-6ZM6 21H3v-6a3 3 0 0 1 3-3m12 9h3v-6a3 3 0 0 0-3-3m-6-6V3m0 1.5c0-1 .5-1.5.5-1.5S12 2 12 3"
            />
        </svg>
    );
}

function SportIcon({ className }: { className?: string }) {
    return (
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
                d="M3 3v18h18M9 17V9m4 8V5m4 12v-4"
            />
        </svg>
    );
}

function FoodIcon({ className }: { className?: string }) {
    return (
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
                d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12"
            />
        </svg>
    );
}

function HealthIcon({ className }: { className?: string }) {
    return (
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
        </svg>
    );
}

function PlaygroundIcon({ className }: { className?: string }) {
    return (
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
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
        </svg>
    );
}
