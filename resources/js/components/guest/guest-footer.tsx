import { index as announcementIndex } from '@/actions/App/Http/Controllers/AnnouncementController';
import { Link } from '@inertiajs/react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const GuestFooter = () => {
    return (
        <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 pt-12 pb-0 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">
                                SA
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">SDIT Al-Aziz</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-gray-400 dark:text-gray-500">
                            Pendidikan berkualitas berbasis nilai-nilai Islam untuk generasi unggul dan berakhlak mulia.
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-start gap-2 text-sm text-gray-400 dark:text-gray-500">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>Jl. KH. Abdul Hamid No. 23, Bangkalan, Jawa Timur 69116</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span>(031) 3095-xxxx</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>info@sditalaziz.sch.id</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                                <Clock className="h-4 w-4 shrink-0" />
                                <span>Sen – Jum, 07:00 – 15:00 WIB</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <p className="mb-3 text-[11px] font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                                Sekolah
                            </p>
                            <ul className="space-y-2">
                                {['Tentang Kami', 'Visi & Misi', 'Guru & Staff', 'Fasilitas', 'Kurikulum', 'Kontak'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-gray-400 transition hover:text-emerald-600 dark:text-gray-500 dark:hover:text-emerald-400">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="mb-3 text-[11px] font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                                Akademik
                            </p>
                            <ul className="space-y-2">
                                {['Program Unggulan', 'Ekstrakurikuler', 'Prestasi', 'Kalender Akademik', 'PPDB', 'Berita'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-gray-400 transition hover:text-emerald-600 dark:text-gray-500 dark:hover:text-emerald-400">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="mb-3 text-[11px] font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                                Informasi
                            </p>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href={announcementIndex.url()}
                                        className="text-sm text-gray-400 transition hover:text-emerald-600 dark:text-gray-500 dark:hover:text-emerald-400"
                                    >
                                        Pengumuman
                                    </Link>
                                </li>
                                {['Agenda', 'Galeri', 'Artikel', 'Syarat Layanan', 'Kebijakan Privasi'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-gray-400 transition hover:text-emerald-600 dark:text-gray-500 dark:hover:text-emerald-400">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 border-t border-gray-100 py-5 dark:border-gray-800">
                    <p className="text-center text-xs text-gray-400 dark:text-gray-600">
                        &copy; {new Date().getFullYear()} SDIT Al-Aziz. Hak cipta dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default GuestFooter;
