import {
    index as majorIndex,
    show as majorShow,
} from '@/actions/App/Http/Controllers/MajorController';
import {
    type MajorCardResource,
    type MajorResource,
    type SiteConfig,
} from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, GraduationCap } from 'lucide-react';

interface Props {
    major: MajorResource;
    others: MajorCardResource[];
}

const MajorShow = ({ major, others }: Props) => {
    const { siteConfig } = usePage<{ siteConfig: SiteConfig | null }>().props;

    return (
        <>
            <Head title={`${major.title} - SDIT Al-Aziz`}>
                <meta name="description" content={major.description} />
                <meta
                    property="og:title"
                    content={`${major.title} - SDIT Al-Aziz`}
                />
                <meta property="og:description" content={major.description} />
                <meta property="og:type" content="article" />
                {major.featured_image_url && (
                    <meta
                        property="og:image"
                        content={major.featured_image_url}
                    />
                )}
                <link
                    rel="canonical"
                    href={majorShow({ major: major.slug }).url}
                />
            </Head>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <Link
                    href={majorIndex.url()}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Jurusan
                </Link>

                <div className="mt-8 flex gap-10 lg:items-start">
                    <article className="min-w-0 flex-1">
                        {major.featured_image_url ? (
                            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-96">
                                <img
                                    src={major.featured_image_url}
                                    alt={major.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                        ) : (
                            <div className="relative mb-8 flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-emerald-600 sm:h-80 lg:h-96 dark:bg-emerald-700">
                                <GraduationCap className="h-24 w-24 text-white/70" />
                            </div>
                        )}

                        <div className="flex items-start gap-4">
                            <div className="inline-flex shrink-0 rounded-xl bg-emerald-600 p-3 text-white">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    {major.title}
                                </h1>
                                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                                    {major.description}
                                </p>
                            </div>
                        </div>

                        {major.content && (
                            <div
                                className="prose prose-emerald dark:prose-invert mt-10 max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: major.content,
                                }}
                            />
                        )}
                    </article>

                    <aside className="hidden w-64 shrink-0 lg:block">
                        <div>
                            <span className="bg-emerald-600 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase dark:bg-emerald-500">
                                Jurusan Lainnya
                            </span>
                            <div className="h-0.5 w-full bg-emerald-600 dark:bg-emerald-500" />
                        </div>

                        {others.length === 0 ? (
                            <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
                                Belum ada jurusan lain.
                            </p>
                        ) : (
                            <ul className="mt-4 space-y-4">
                                {others.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={
                                                majorShow({ major: item.slug })
                                                    .url
                                            }
                                            className="group flex items-start gap-3"
                                        >
                                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:group-hover:bg-emerald-900/50">
                                                <GraduationCap className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="line-clamp-2 text-sm leading-snug font-medium text-gray-700 transition group-hover:text-emerald-600 dark:text-gray-300 dark:group-hover:text-emerald-400">
                                                    {item.title}
                                                </p>
                                                <p className="mt-0.5 line-clamp-2 text-[11px] text-gray-400 dark:text-gray-500">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </aside>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'EducationalOccupationalProgram',
                        name: major.title,
                        description: major.description,
                        ...(major.featured_image_url
                            ? { image: major.featured_image_url }
                            : {}),
                        provider: {
                            '@type': 'EducationalOrganization',
                            name: siteConfig?.identity?.name ?? 'SDIT Al-Aziz',
                        },
                    }),
                }}
            />
        </>
    );
};

export default MajorShow;
