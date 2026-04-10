import * as Icons from 'lucide-react';
import { GraduationCapIcon } from 'lucide-react';
import type { Alumni, SiteConfig } from '@/types';
import SectionHeader from '../section-header';

const COLOR_PRESETS = [
    { blob: 'bg-yellow-300', ring: 'border-yellow-400', dot: 'bg-yellow-400' },
    { blob: 'bg-[#66ABFF]', ring: 'border-[#3B8BFF]', dot: 'bg-[#3B8BFF]' },
    { blob: 'bg-[#FFF566]', ring: 'border-[#FFF100]', dot: 'bg-[#FFF100]' },
    { blob: 'bg-[#66ABFF]', ring: 'border-[#3B8BFF]', dot: 'bg-[#3B8BFF]' },
];

interface AlumniSectionProps {
    alumni: Alumni[];
    siteConfig: SiteConfig | null;
}

const AlumniSection = ({ alumni, siteConfig }: AlumniSectionProps) => {
    if (alumni.length === 0 || siteConfig?.sections?.alumni?.enabled === false) {
        return null;
    }

    return (
        <section id="alumni" className="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    icon={<GraduationCapIcon className="h-3.5 w-3.5 text-[#006BFF] dark:text-[#3B8BFF]" />}
                    label=""
                    accentWord="Alumni"
                    heading={siteConfig?.sections?.alumni?.heading ?? 'Jejak Prestasi Alumni Kami'}
                    description={siteConfig?.sections?.alumni?.description}
                />

                <div className="mt-16 grid gap-6 sm:grid-cols-2">
                    {alumni.map((alumniItem, index) => {
                        const preset = COLOR_PRESETS[index % COLOR_PRESETS.length]!;
                        return (
                            <div
                                key={alumniItem.id}
                                className="group relative flex overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#006BFF]/5 dark:bg-gray-900"
                            >
                                <div className="relative w-36 shrink-0 overflow-hidden sm:w-44">
                                    <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800" />
                                    <div className={`absolute -bottom-8 -left-8 h-40 w-40 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] ${preset.blob} opacity-90`} />
                                    <div className={`absolute -top-6 -right-6 h-20 w-20 rounded-[60%_40%_45%_55%/50%_60%_40%_50%] ${preset.blob} opacity-40`} />
                                    <div className={`absolute bottom-6 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border-4 ${preset.ring} opacity-30`} />
                                    <div className={`absolute top-4 left-4 h-2.5 w-2.5 rounded-full ${preset.dot} opacity-60`} />
                                    <div className={`absolute top-8 left-7 h-1.5 w-1.5 rounded-full ${preset.dot} opacity-40`} />
                                    <div className={`absolute top-5 left-9 h-1 w-1 rounded-full ${preset.dot} opacity-30`} />

                                    <div className="relative z-10 flex h-full items-end justify-center pt-6 pb-3 pl-3">
                                        <div className="h-28 w-24 overflow-hidden rounded-2xl shadow-lg ring-2 ring-white/60 sm:h-36 sm:w-28">
                                            {alumniItem.avatar_url ? (
                                                <img
                                                    src={alumniItem.avatar_url}
                                                    alt={alumniItem.name}
                                                    className="h-full w-full object-cover object-top"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                                                    <Icons.User className="h-10 w-10 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col justify-between p-6 pl-5">
                                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                        {alumniItem.quote}
                                    </p>

                                    <div className="mt-4">
                                        <p className="inline rounded bg-[#006BFF] px-2 py-0.5 text-sm font-bold text-white">
                                            {alumniItem.name}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            {alumniItem.batch}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <div className="inline-flex items-center gap-2 rounded-lg bg-[#002966] px-4 py-2 text-xs font-semibold text-white dark:bg-[#003D99]">
                                            <svg
                                                className="h-3.5 w-3.5 shrink-0 text-[#66ABFF]"
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
                                            {alumniItem.destination}
                                        </div>
                                    </div>

                                    {alumniItem.socials.length > 0 && (
                                        <div className="mt-3 flex items-center gap-2">
                                            {alumniItem.socials.map((social) => (
                                                <a
                                                    key={social.id}
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-md p-1 text-gray-400 transition hover:text-[#006BFF] dark:hover:text-[#3B8BFF]"
                                                    aria-label={social.platform}
                                                >
                                                    <Icons.Link2 className="h-4 w-4" />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AlumniSection;
