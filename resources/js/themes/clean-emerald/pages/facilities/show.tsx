import { Head, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

import { type FacilityResource } from '@/types';

interface Props {
    facility: FacilityResource;
}

const FacilityShow = ({ facility }: Props) => {
    const IconComponent = (Icons[facility.icon as keyof typeof Icons] ?? Icons.Building2) as React.ComponentType<{ className?: string }>;

    return (
        <>
            <Head title={`${facility.title} - SDIT Al-Aziz`}>
                <meta name="description" content={facility.description} />
                <meta property="og:title" content={`${facility.title} - SDIT Al-Aziz`} />
                <meta property="og:description" content={facility.description} />
                <meta property="og:type" content="article" />
                {facility.featured_image_url && <meta property="og:image" content={facility.featured_image_url} />}
                <link rel="canonical" href={window.location.href.split('?')[0]} />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-white font-[Plus_Jakarta_Sans] text-gray-900 dark:bg-gray-950 dark:text-gray-100">
                {/* Back nav */}
                <div className="border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
                    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                        <Link
                            href="/#fasilitas"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Fasilitas
                        </Link>
                    </div>
                </div>

                {/* Hero */}
                {facility.featured_image_url && (
                    <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
                        <img
                            src={facility.featured_image_url}
                            alt={facility.title}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                )}

                {/* Content */}
                <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
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
                            className="prose prose-emerald mt-10 max-w-none dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: facility.content }}
                        />
                    )}
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
                        ...(facility.featured_image_url ? { image: facility.featured_image_url } : {}),
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
