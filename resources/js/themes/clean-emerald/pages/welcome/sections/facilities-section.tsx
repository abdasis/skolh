import {
    index as facilityIndex,
    show as facilityShow,
} from '@/actions/App/Http/Controllers/FacilityController';
import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import { BuildingIcon } from 'lucide-react';
import { useRef } from 'react';
import { type SiteConfig } from '@/types';

interface FacilityCard {
    id: number;
    icon: string;
    title: string;
    slug: string;
    description: string;
}

const FacilitiesHeader = ({
    siteConfig,
}: {
    siteConfig: SiteConfig | null;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                <BuildingIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="relative inline-block">
                    <span className="relative z-10 text-emerald-600 dark:text-emerald-400">
                        Fasilitas
                    </span>
                    <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/50" />
                </span>
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                {siteConfig?.sections?.facilities?.heading ?? 'Fasilitas'}
            </h2>
            {siteConfig?.sections?.facilities?.description && (
                <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 dark:text-gray-400">
                    {siteConfig.sections.facilities.description}
                </p>
            )}
        </motion.div>
    );
};

const FacilitiesGrid = ({ facilities }: { facilities: FacilityCard[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <div
            ref={ref}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
            {facilities.map((facility, index) => {
                const IconComponent = (Icons[
                    facility.icon as keyof typeof Icons
                ] ?? Icons.Building2) as React.ComponentType<{
                    className?: string;
                }>;
                return (
                    <motion.div
                        key={facility.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.08,
                            ease: 'easeOut',
                        }}
                    >
                        <Link
                            href={facilityShow.url({ facility: facility.slug })}
                            className="group relative block h-full overflow-hidden rounded-2xl bg-emerald-600 p-5 text-white transition duration-300 hover:-translate-y-1 dark:bg-emerald-700"
                        >
                            <svg
                                className="pointer-events-none absolute -top-3 -right-3 h-20 w-20 text-emerald-500/30"
                                fill="none"
                                viewBox="0 0 80 80"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path d="M80 0 C80 44.18 44.18 80 0 80" />
                                <path d="M80 12 C80 49.56 49.56 80 12 80" />
                                <path d="M80 24 C80 54.93 54.93 80 24 80" />
                            </svg>

                            <div className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full border-2 border-emerald-500/20" />
                            <div className="pointer-events-none absolute -bottom-3 -left-3 h-14 w-14 rounded-full border-2 border-emerald-500/15" />
                            <div className="pointer-events-none absolute top-0 right-12 h-full w-px origin-top rotate-12 bg-gradient-to-b from-emerald-400/20 via-emerald-400/10 to-transparent" />

                            <div className="relative">
                                <div className="inline-flex rounded-xl bg-white/15 p-3">
                                    <IconComponent className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mt-4 text-sm font-bold text-white">
                                    {facility.title}
                                </h3>
                                <p className="mt-1 text-xs text-emerald-100/70">
                                    {facility.description}
                                </p>
                                <div className="mt-4 h-px w-0 bg-gradient-to-r from-white/40 to-transparent transition-all duration-300 group-hover:w-full" />
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
};

const FacilitiesSection = ({
    siteConfig,
    facilities,
    facilitiesTotal,
}: {
    siteConfig: SiteConfig | null;
    facilities: FacilityCard[];
    facilitiesTotal: number;
}) => {
    return (
        <section
            id="fasilitas"
            className="relative overflow-hidden py-24 sm:py-32"
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/fasilitas-bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-white/90 dark:bg-gray-950/90" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FacilitiesHeader siteConfig={siteConfig} />

                {facilities.length > 0 && (
                    <>
                        <FacilitiesGrid facilities={facilities} />

                        {facilitiesTotal > facilities.length && (
                            <div className="mt-10 text-center">
                                <Link
                                    href={facilityIndex.url()}
                                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-emerald-400 to-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(16,185,129,0.35)] hover:brightness-110"
                                >
                                    <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />
                                    Lihat Semua Fasilitas
                                    <Icons.ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default FacilitiesSection;
export type { FacilityCard };
