import { show as facilityShow } from '@/actions/App/Http/Controllers/FacilityController';
import { type FacilityCardResource, type FacilityResource } from '@/types';
import { Head, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { ArrowLeft, Building2 } from 'lucide-react';

interface Props {
    facility: FacilityResource;
    others: FacilityCardResource[];
}

const FacilityShow = ({ facility, others }: Props) => {
    const IconComponent = (Icons[facility.icon as keyof typeof Icons] ??
        Icons.Building2) as React.ComponentType<{ className?: string }>;

    return (
        <>
            <Head title={`${facility.title} - SDIT Al-Aziz`}>
                <meta name="description" content={facility.description} />
                <meta
                    property="og:title"
                    content={`${facility.title} - SDIT Al-Aziz`}
                />
                <meta
                    property="og:description"
                    content={facility.description}
                />
                <meta property="og:type" content="article" />
                {facility.featured_image_url && (
                    <meta
                        property="og:image"
                        content={facility.featured_image_url}
                    />
                )}
                <link
                    rel="canonical"
                    href={window.location.href.split('?')[0]}
                />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div className="mx-auto mt-[calc(1.75rem+3.75rem)] max-w-7xl px-4 py-12 font-[Plus_Jakarta_Sans] sm:px-6 lg:px-8">
                <Link
                    href="/#fasilitas"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Fasilitas
                </Link>

                <div className="mt-8 flex gap-10 lg:items-start">
                    {/* Main content */}
                    <article className="min-w-0 flex-1">
                        {/* Hero image */}
                        {facility.featured_image_url && (
                            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-96">
                                <img
                                    src={facility.featured_image_url}
                                    alt={facility.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                        )}

                        {/* Header */}
                        <div className="flex items-start gap-4">
                            <div className="inline-flex shrink-0 rounded-xl bg-emerald-600 p-3 text-white">
                                <IconComponent className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    {facility.title}
                                </h1>
                                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                                    {facility.description}
                                </p>
                            </div>
                        </div>

                        {/* Rich-text content */}
                        {facility.content && (
                            <div
                                className="prose prose-emerald dark:prose-invert mt-10 max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: facility.content,
                                }}
                            />
                        )}
                    </article>

                    {/* Right Sidebar */}
                    <aside className="hidden w-64 shrink-0 lg:block">
                        <div>
                            <span className="bg-emerald-600 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase dark:bg-emerald-500">
                                Fasilitas Lainnya
                            </span>
                            <div className="h-0.5 w-full bg-emerald-600 dark:bg-emerald-500" />
                        </div>

                        {others.length === 0 ? (
                            <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
                                Belum ada fasilitas lain.
                            </p>
                        ) : (
                            <ul className="mt-4 space-y-4">
                                {others.map((item) => {
                                    const ItemIcon = (Icons[
                                        item.icon as keyof typeof Icons
                                    ] ?? Building2) as React.ComponentType<{
                                        className?: string;
                                    }>;
                                    return (
                                        <li key={item.id}>
                                            <Link
                                                href={
                                                    facilityShow({
                                                        facility: item.slug,
                                                    }).url
                                                }
                                                className="group flex items-start gap-3"
                                            >
                                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:group-hover:bg-emerald-900/50">
                                                    <ItemIcon className="h-4 w-4" />
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
                                    );
                                })}
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
                        '@type': 'Place',
                        name: facility.title,
                        description: facility.description,
                        ...(facility.featured_image_url
                            ? { image: facility.featured_image_url }
                            : {}),
                        containedInPlace: {
                            '@type': 'EducationalOrganization',
                            name: 'SDIT Al-Aziz',
                        },
                    }),
                }}
            />
        </>
    );
};

export default FacilityShow;
