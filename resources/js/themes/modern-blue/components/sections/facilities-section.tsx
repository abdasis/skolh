import * as Icons from 'lucide-react';
import { BuildingIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import {
    index as facilityIndex,
    show as facilityShow,
} from '@/actions/App/Http/Controllers/FacilityController';
import type { FacilityCardResource, SiteConfig } from '@/types';
import SectionHeader from '../section-header';

const FacilityCardDecoration = () => (
    <>
        <svg
            className="text-[#E6F1FF]0/30 pointer-events-none absolute -top-3 -right-3 h-20 w-20"
            fill="none"
            viewBox="0 0 80 80"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path d="M80 0 C80 44.18 44.18 80 0 80" />
            <path d="M80 12 C80 49.56 49.56 80 12 80" />
            <path d="M80 24 C80 54.93 54.93 80 24 80" />
        </svg>
        <div className="border-[#E6F1FF]0/20 pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full border-2" />
        <div className="border-[#E6F1FF]0/15 pointer-events-none absolute -bottom-3 -left-3 h-14 w-14 rounded-full border-2" />
        <div className="pointer-events-none absolute top-0 right-12 h-full w-px origin-top rotate-12 bg-gradient-to-b from-[#3B8BFF]/20 via-[#3B8BFF]/10 to-transparent" />
    </>
);

interface FacilitiesSectionProps {
    facilities: FacilityCardResource[];
    facilitiesTotal: number;
    siteConfig: SiteConfig | null;
}

const FacilitiesSection = ({ facilities, facilitiesTotal, siteConfig }: FacilitiesSectionProps) => {
    if (siteConfig?.sections?.facilities?.enabled === false) {
        return null;
    }

    return (
        <section id="fasilitas" className="relative overflow-hidden py-24 sm:py-32">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/fasilitas-bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-white/90 dark:bg-gray-950/90" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    icon={<BuildingIcon className="h-3.5 w-3.5 text-[#006BFF] dark:text-[#3B8BFF]" />}
                    label=""
                    accentWord="Fasilitas"
                    heading={siteConfig?.sections?.facilities?.heading ?? 'Fasilitas'}
                    description={siteConfig?.sections?.facilities?.description}
                />

                {facilities.length > 0 && (
                    <>
                        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {facilities.map((facility) => {
                                const IconComponent = (Icons[
                                    facility.icon as keyof typeof Icons
                                ] ?? Icons.Building2) as React.ComponentType<{ className?: string }>;
                                return (
                                    <Link
                                        key={facility.id}
                                        href={facilityShow.url({ facility: facility.slug })}
                                        className="group relative overflow-hidden rounded-2xl bg-[#006BFF] p-5 text-white transition duration-300 hover:-translate-y-1 dark:bg-[#0052CC]"
                                    >
                                        <FacilityCardDecoration />
                                        <div className="relative">
                                            <div className="inline-flex rounded-xl bg-white/15 p-3">
                                                <IconComponent className="h-6 w-6 text-white" />
                                            </div>
                                            <h3 className="mt-4 text-sm font-bold text-white">
                                                {facility.title}
                                            </h3>
                                            <p className="mt-1 text-xs text-[#CCE3FF]/70">
                                                {facility.description}
                                            </p>
                                            <div className="mt-4 h-px w-0 bg-gradient-to-r from-white/40 to-transparent transition-all duration-300 group-hover:w-full" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {facilitiesTotal > facilities.length && (
                            <div className="mt-10 text-center">
                                <Link
                                    href={facilityIndex.url()}
                                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-[#3B8BFF] to-[#006BFF] px-7 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,107,255,0.3)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,107,255,0.35)] hover:brightness-110"
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
