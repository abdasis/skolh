import * as Icons from 'lucide-react';
import { InfoIcon } from 'lucide-react';
import type { SiteConfig } from '@/types';
import SectionHeader from '../section-header';

interface AboutSectionProps {
    siteConfig: SiteConfig | null;
}

const AboutSection = ({ siteConfig }: AboutSectionProps) => {
    return (
        <section id="tentang" className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col">
                        <SectionHeader
                            icon={<InfoIcon className="h-3.5 w-3.5 text-[#006BFF] dark:text-[#3B8BFF]" />}
                            label="Tentang"
                            accentWord="Kami"
                            heading={siteConfig?.about?.heading ?? ''}
                            align="left"
                        />

                        {siteConfig?.about?.content && (
                            <div
                                className="prose prose-sm dark:prose-invert mt-6 max-w-none text-base leading-relaxed text-gray-600 dark:text-gray-400"
                                dangerouslySetInnerHTML={{ __html: siteConfig.about.content }}
                            />
                        )}

                        {siteConfig?.about?.feature_cards && siteConfig.about.feature_cards.length > 0 && (
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {siteConfig.about.feature_cards.map((card) => {
                                    const IconComponent = (Icons[
                                        card.icon as keyof typeof Icons
                                    ] ?? Icons.BookOpen) as React.ComponentType<{ className?: string }>;
                                    return (
                                        <div
                                            key={card.title}
                                            className="relative overflow-hidden rounded-xl bg-[#006BFF] p-4 text-white dark:bg-[#0052CC]"
                                        >
                                            <IconComponent className="absolute right-3 bottom-3 h-16 w-16 text-white/10" />
                                            <h3 className="text-sm leading-tight font-semibold">
                                                {card.title}
                                            </h3>
                                            <p className="mt-1 text-[11px] leading-snug text-[#CCE3FF]/80">
                                                {card.description}
                                            </p>
                                            <div className="mt-3 flex items-baseline gap-1.5">
                                                <span className="text-3xl leading-none font-extrabold">
                                                    {card.stat_value}
                                                </span>
                                                <span className="text-xs font-medium text-[#CCE3FF]/90">
                                                    {card.stat_label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-5">
                        <div className="relative min-h-[280px] overflow-hidden rounded-3xl bg-gray-50 lg:col-span-3 dark:bg-gray-800/50">
                            <img
                                src={siteConfig?.about?.mascot_image_url ?? '/images/maskot.png'}
                                alt={siteConfig?.identity?.name ?? ''}
                                className="absolute inset-0 h-full w-full object-contain object-bottom"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:flex lg:flex-col">
                            <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl bg-gray-50 p-5 dark:bg-gray-800/60">
                                <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-white/60 dark:bg-white/5" />
                                <div className="absolute -bottom-4 -left-4 h-16 w-16 rotate-45 rounded-2xl bg-white/50 dark:bg-white/5" />
                                <div className="absolute top-1/2 right-3 h-10 w-10 rounded-full border-2 border-white/40 dark:border-white/5" />
                                <img
                                    src="/images/opportunity.png"
                                    alt=""
                                    className="absolute right-2 bottom-2 h-16 w-16 object-contain opacity-15"
                                />
                                <div className="relative z-10">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                                        Visi Kami
                                    </h4>
                                    <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                        Menjadi lembaga pendidikan Islam terpadu yang unggul dalam membentuk generasi Qurani, berilmu, berakhlak mulia, dan berprestasi.
                                    </p>
                                </div>
                            </div>

                            <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl bg-gray-900 p-5 dark:bg-gray-950">
                                <div className="absolute -top-5 -right-5 h-18 w-18 rounded-full bg-gray-800 dark:bg-gray-800/80" />
                                <div className="absolute -bottom-3 -left-3 h-14 w-14 rotate-45 rounded-2xl bg-gray-800 dark:bg-gray-800/80" />
                                <div className="absolute right-4 bottom-1/2 h-8 w-8 rounded-full border-2 border-gray-700 dark:border-gray-700/80" />
                                {siteConfig?.hero?.stats && siteConfig.hero.stats.length > 0 && (
                                    <div className="relative z-10 flex flex-col gap-3">
                                        {siteConfig.hero.stats.map((stat) => (
                                            <div key={stat.label} className="flex items-baseline gap-1">
                                                <span className="text-2xl font-extrabold text-white">
                                                    {stat.value}
                                                </span>
                                                <span className="text-xs font-semibold text-[#3B8BFF]">
                                                    {stat.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
