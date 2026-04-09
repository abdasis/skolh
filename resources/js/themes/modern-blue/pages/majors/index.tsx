import {
    index as majorIndex,
    show as majorShow,
} from '@/actions/App/Http/Controllers/MajorController';
import { type MajorCardResource } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';

interface Props {
    majors: MajorCardResource[];
}

const MajorIndex = ({ majors }: Props) => {
    return (
        <>
            <Head title="Jurusan - SDIT Al-Aziz">
                <meta
                    name="description"
                    content="Daftar jurusan di SDIT Al-Aziz untuk mendukung pengembangan minat dan bakat siswa."
                />
                <meta property="og:title" content="Jurusan - SDIT Al-Aziz" />
                <meta
                    property="og:description"
                    content="Daftar jurusan di SDIT Al-Aziz untuk mendukung pengembangan minat dan bakat siswa."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={majorIndex.url()} />
            </Head>

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="relative">
                    <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-blue-100/60 blur-2xl dark:bg-blue-900/30" />
                    <div className="absolute top-2 left-32 h-12 w-12 rounded-full bg-sky-100/50 blur-xl dark:bg-sky-900/20" />

                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-700 uppercase dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                            Jurusan
                        </span>

                        <div className="mt-3 flex items-start gap-4">
                            <div className="mt-1 flex shrink-0 flex-col items-center gap-1">
                                <div className="h-6 w-0.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                                <div className="h-2 w-0.5 rounded-full bg-blue-300 dark:bg-blue-600" />
                                <div className="h-1 w-0.5 rounded-full bg-blue-200 dark:bg-blue-700" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Jurusan{' '}
                                    <span className="text-blue-600 dark:text-blue-400">
                                        Unggulan
                                    </span>
                                </h1>
                                <p className="mt-3 max-w-xl text-base text-gray-600 dark:text-gray-400">
                                    Pilihan jurusan untuk mendukung
                                    pengembangan minat dan bakat siswa di SDIT
                                    Al-Aziz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {majors.length === 0 ? (
                    <div className="mt-16 flex flex-col items-center justify-center py-20 text-center">
                        <div className="inline-flex rounded-2xl bg-blue-50 p-6 dark:bg-blue-950/30">
                            <GraduationCap className="h-10 w-10 text-blue-400" />
                        </div>
                        <p className="mt-4 text-base font-medium text-gray-500 dark:text-gray-400">
                            Belum ada jurusan yang dipublikasikan.
                        </p>
                    </div>
                ) : (
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {majors.map((major) => (
                            <Link
                                key={major.id}
                                href={majorShow({ major: major.slug }).url}
                                className="group relative overflow-hidden rounded-2xl bg-blue-600 text-white transition duration-300 hover:-translate-y-1 dark:bg-blue-700"
                            >
                                {major.featured_image_url ? (
                                    <div className="relative h-44 w-full overflow-hidden">
                                        <img
                                            src={major.featured_image_url}
                                            alt={major.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/30 to-transparent" />
                                    </div>
                                ) : (
                                    <div className="relative flex h-44 w-full items-center justify-center bg-blue-700 dark:bg-blue-800">
                                        <GraduationCap className="h-16 w-16 text-white/70" />
                                    </div>
                                )}

                                <div className="relative p-5">
                                    <h2 className="text-base font-bold text-white">
                                        {major.title}
                                    </h2>
                                    <p className="mt-2 line-clamp-3 text-xs text-blue-100/80">
                                        {major.description}
                                    </p>
                                    <div className="mt-4 h-px w-0 bg-linear-to-r from-white/50 to-transparent transition-all duration-300 group-hover:w-full" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default MajorIndex;
