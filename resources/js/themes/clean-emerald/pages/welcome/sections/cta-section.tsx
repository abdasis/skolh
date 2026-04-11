import { type SiteConfig } from '@/types';

const CtaSection = ({
    siteConfig,
    canRegister,
}: {
    siteConfig: SiteConfig | null;
    canRegister: boolean;
}) => {
    return (
        <section className="relative bg-slate-100 dark:bg-slate-900">
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, #0f172a 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {(siteConfig?.cta?.image_url ?? '/images/cta-student.png') && (
                    <img
                        src={
                            siteConfig?.cta?.image_url ??
                            '/images/cta-student.png'
                        }
                        alt={siteConfig?.identity?.name ?? ''}
                        className="pointer-events-none absolute bottom-0 left-4 z-20 hidden object-contain object-bottom drop-shadow-2xl sm:left-6 sm:block lg:left-8"
                        style={{ height: 'calc(100% + 160px)', width: '420px' }}
                    />
                )}

                <div className="flex flex-1 flex-col justify-center py-12 sm:py-14 sm:pl-110">
                    {(siteConfig?.cta?.subtitle ??
                        siteConfig?.identity?.tagline) && (
                        <p className="max-w-lg text-lg leading-relaxed text-slate-500 dark:text-slate-400">
                            {siteConfig?.cta?.subtitle ??
                                siteConfig?.identity?.tagline}
                        </p>
                    )}
                    <p className="mt-3 max-w-lg text-2xl leading-snug font-extrabold text-slate-800 sm:text-3xl dark:text-white">
                        {siteConfig?.cta?.title ??
                            (siteConfig?.identity?.name
                                ? `Bergabung bersama ${siteConfig.identity.name}`
                                : 'Mari bergabung bersama kami.')}
                    </p>
                    {canRegister && (
                        <div className="mt-8">
                            <a
                                href={siteConfig?.cta?.button_href ?? '#kontak'}
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-8 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                            >
                                {siteConfig?.cta?.button_label ??
                                    'Daftar Sekarang'}
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
