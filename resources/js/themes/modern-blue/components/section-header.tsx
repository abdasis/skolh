import type { ReactNode } from 'react';

interface SectionHeaderProps {
    icon: ReactNode;
    label: string;
    accentWord: string;
    heading: string;
    description?: string | null;
    align?: 'center' | 'left';
}

const SectionHeader = ({
    icon,
    label,
    accentWord,
    heading,
    description,
    align = 'center',
}: SectionHeaderProps) => {
    const alignClass = align === 'center' ? 'text-center' : '';

    return (
        <div className={alignClass}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                {icon}
                {label}{' '}
                <span className="relative inline-block">
                    <span className="relative z-10 text-[#006BFF] dark:text-[#3B8BFF]">
                        {accentWord}
                    </span>
                    <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-[#CCE3FF] dark:bg-[#002966]/50" />
                </span>
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                {heading}
            </h2>
            {description && (
                <p className={`mt-4 text-base text-gray-600 dark:text-gray-400 ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
