import type { SiteConfig } from '@/types';

interface HeroSectionProps {
    siteConfig: SiteConfig | null;
    canRegister: boolean;
}

const HeroSection = ({ siteConfig, canRegister }: HeroSectionProps) => {
    return (
        <section
            id="beranda"
            className="relative mt-[calc(1.75rem+3.75rem)] min-h-[560px] overflow-hidden sm:min-h-[600px] lg:min-h-[640px]"
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: siteConfig?.hero?.bg_image_url
                        ? `url('${siteConfig.hero.bg_image_url}')`
                        : "url('/images/hero.jpg')",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001F4D]/90 via-[#001F4D]/70 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#001F4D]/60 to-transparent" />

            <div className="relative flex h-full min-h-[560px] items-center sm:min-h-[600px] lg:min-h-[640px]">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-12">
                    <div>
                        {siteConfig?.hero?.subtitle && (
                            <p className="text-base font-medium text-white/80 sm:text-lg">
                                {siteConfig.hero.subtitle}
                            </p>
                        )}

                        <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            {siteConfig?.hero?.title}{' '}
                            {siteConfig?.hero?.title_accent && (
                                <span className="text-[#FFF100]">
                                    {siteConfig.hero.title_accent}
                                </span>
                            )}
                        </h1>

                        {siteConfig?.hero?.description && (
                            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                                {siteConfig.hero.description}
                            </p>
                        )}

                        <div className="mt-8 flex flex-wrap gap-3">
                            {siteConfig?.hero?.cta_buttons &&
                            siteConfig.hero.cta_buttons.length > 0
                                ? siteConfig.hero.cta_buttons.map((btn) => (
                                      <a
                                          key={btn.label}
                                          href={btn.href}
                                          className={
                                              btn.variant === 'primary'
                                                  ? 'rounded-lg bg-[#FFF100] px-7 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-[#E6D900]'
                                                  : 'rounded-lg bg-[#003D99] px-7 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-[#002966]'
                                          }
                                      >
                                          {btn.label}
                                      </a>
                                  ))
                                : null}
                        </div>

                        {siteConfig?.hero?.stats && siteConfig.hero.stats.length > 0 && (
                            <div className="mt-12 flex flex-wrap gap-6">
                                {siteConfig.hero.stats.map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <div className="text-2xl font-extrabold text-[#FFF100]">
                                            {stat.value}
                                        </div>
                                        <div className="mt-0.5 text-xs font-medium text-white/70">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="hidden items-center justify-end lg:flex">
                        <div className="relative pb-6">
                            <div className="absolute -inset-3 rounded-[2rem] border-2 border-white/20" />
                            <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-2xl bg-[#FFF100]/30 backdrop-blur-sm" />
                            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-xl bg-white/10 backdrop-blur-sm" />
                            <img
                                src={siteConfig?.hero?.side_image_url ?? '/images/hero-right.jpg'}
                                alt={siteConfig?.identity?.name ?? ''}
                                className="relative h-[420px] w-[340px] rounded-[1.75rem] object-cover object-center"
                            />
                            {siteConfig?.hero?.badge_text && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-xs font-bold whitespace-nowrap text-[#003D99] shadow-sm">
                                    {siteConfig.hero.badge_text}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
