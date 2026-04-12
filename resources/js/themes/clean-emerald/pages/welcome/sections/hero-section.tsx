import { type SiteConfig } from '@/types';

/**
 * style-three: header transparan overlay di atas hero → hero harus min-h-screen
 * style-one/two: header fixed di atas, hero pakai tinggi tetap
 */
const HeroSection = ({ siteConfig }: { siteConfig: SiteConfig | null }) => {
    const headerStyle = siteConfig?.emeraldHeaderStyle ?? 'style-one';
    const isTransparent = headerStyle === 'style-three';

    const sectionClass = isTransparent
        ? 'relative min-h-screen overflow-hidden'
        : 'relative min-h-[560px] overflow-hidden sm:min-h-[600px] lg:min-h-[640px]';

    const contentClass = isTransparent
        ? 'relative flex h-full min-h-screen items-center'
        : 'relative flex h-full min-h-[560px] items-center sm:min-h-[600px] lg:min-h-[640px]';

    const contentPadding = isTransparent ? 'py-32 lg:py-40' : 'py-20';

    return (
        <section id="beranda" className={sectionClass}>
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: siteConfig?.hero?.bg_image_url
                        ? `url('${siteConfig.hero.bg_image_url}')`
                        : "url('/images/hero.jpg')",
                }}
            />

            {/* Left gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/70 to-transparent" />
            {/* Extra dark overlay on very left for text legibility */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-emerald-950/60 to-transparent" />

            {/* Content */}
            <div className={contentClass}>
                <div className={`mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 ${contentPadding} sm:px-8 lg:grid-cols-2 lg:px-12`}>
                    {/* Left: text */}
                    <div>
                        {siteConfig?.hero?.subtitle && (
                            <p className="text-base font-medium text-white/80 sm:text-lg">
                                {siteConfig.hero.subtitle}
                            </p>
                        )}

                        <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            {siteConfig?.hero?.title}{' '}
                            {siteConfig?.hero?.title_accent && (
                                <span className="text-orange-400">
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
                                                  ? 'rounded-lg bg-orange-500 px-7 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-orange-600'
                                                  : 'rounded-lg bg-emerald-800 px-7 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-emerald-900'
                                          }
                                      >
                                          {btn.label}
                                      </a>
                                  ))
                                : null}
                        </div>

                        {/* Stats strip */}
                        {siteConfig?.hero?.stats &&
                            siteConfig.hero.stats.length > 0 && (
                                <div className="mt-12 flex flex-wrap gap-6">
                                    {siteConfig.hero.stats.map((stat) => (
                                        <div key={stat.label} className="text-center">
                                            <div className="text-2xl font-extrabold text-orange-400">
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

                    {/* Right: floating image with decorations */}
                    <div className="hidden items-center justify-end lg:flex">
                        <div className="relative pb-6">
                            <div className="absolute -inset-3 rounded-[2rem] border-2 border-white/20" />
                            <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-2xl bg-orange-500/30 backdrop-blur-sm" />
                            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-xl bg-white/10 backdrop-blur-sm" />
                            <img
                                src={siteConfig?.hero?.side_image_url ?? '/images/hero-right.jpg'}
                                alt={siteConfig?.identity?.name ?? ''}
                                className="relative h-[420px] w-[340px] rounded-[1.75rem] object-cover object-center"
                            />
                            {siteConfig?.hero?.badge_text && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-xs font-bold whitespace-nowrap text-emerald-800 shadow-sm">
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
