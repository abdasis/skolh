interface Props {
    badge: string;
    title: string;
    highlight: string;
    description?: string;
}

const PageHero = ({ badge, title, highlight, description }: Props) => {
    return (
        <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-[#006BFF]/10 blur-2xl dark:bg-[#006BFF]/20" />
            <div className="absolute top-2 left-32 h-12 w-12 rounded-full bg-[#FFF100]/30 blur-xl dark:bg-[#FFF100]/15" />

            <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#006BFF]/30 bg-[#006BFF]/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#006BFF] uppercase dark:border-[#006BFF]/40 dark:bg-[#006BFF]/10 dark:text-[#3B8BFF]">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#006BFF] opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#006BFF] dark:bg-[#3B8BFF]" />
                    </span>
                    {badge}
                </span>

                <div className="mt-3 flex items-start gap-4">
                    <div className="mt-1 flex shrink-0 flex-col items-center gap-1">
                        <div className="h-6 w-0.5 rounded-full bg-[#006BFF] dark:bg-[#3B8BFF]" />
                        <div className="h-2 w-0.5 rounded-full bg-[#006BFF]/60 dark:bg-[#3B8BFF]/60" />
                        <div className="h-1 w-0.5 rounded-full bg-[#006BFF]/30 dark:bg-[#3B8BFF]/30" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        {title}{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-[#006BFF] dark:text-[#3B8BFF]">
                                {highlight}
                            </span>
                            <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-[#FFF100]/60 dark:bg-[#FFF100]/30" />
                        </span>
                    </h1>
                </div>

                {description && (
                    <div className="mt-3 flex items-start gap-3">
                        <div className="mt-1 h-4 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                        <p className="text-base text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageHero;
