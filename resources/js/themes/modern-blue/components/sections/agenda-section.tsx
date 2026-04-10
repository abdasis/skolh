import { CalendarIcon } from 'lucide-react';
import type { AgendaPreview, SiteConfig } from '@/types';
import SectionHeader from '../section-header';

const AgendaDateDecoration = () => (
    <svg
        className="text-[#E6F1FF]0/30 pointer-events-none absolute -top-2 -right-2 h-16 w-16"
        fill="none"
        viewBox="0 0 60 60"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path d="M60 0 C60 33.14 33.14 60 0 60" />
        <path d="M60 10 C60 37.61 37.61 60 10 60" />
        <path d="M60 20 C60 42.09 42.09 60 20 60" />
    </svg>
);

interface AgendaSectionProps {
    agendas: AgendaPreview[];
    siteConfig: SiteConfig | null;
}

const AgendaSection = ({ agendas, siteConfig }: AgendaSectionProps) => {
    if (siteConfig?.sections?.agenda?.enabled === false) {
        return null;
    }

    return (
        <section id="agenda" className="bg-[#E6F1FF]/60 py-20 sm:py-28 dark:bg-[#001F4D]/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    icon={<CalendarIcon className="h-3.5 w-3.5 text-[#006BFF] dark:text-[#3B8BFF]" />}
                    label=""
                    accentWord="Agenda"
                    heading={siteConfig?.sections?.agenda?.heading ?? 'Agenda Kegiatan'}
                    description={siteConfig?.sections?.agenda?.description}
                />

                {agendas.length === 0 && (
                    <p className="mt-8 text-center text-sm text-gray-400">
                        Belum ada agenda yang dijadwalkan.
                    </p>
                )}

                <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    {agendas.map((item) => {
                        const d = new Date(item.date);
                        const day = d.getDate().toString().padStart(2, '0');
                        const month = d.toLocaleString('id-ID', { month: 'short' });
                        const year = d.getFullYear().toString();

                        return (
                            <div key={item.id} className="flex items-center gap-5">
                                <div className="dark:border-[#E6F1FF]0/30 relative flex h-28 w-28 flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-[#0052CC]/30 bg-[#006BFF] text-white dark:bg-[#0052CC]">
                                    <AgendaDateDecoration />
                                    <svg
                                        className="relative h-6 w-6 text-[#99C7FF]/70"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                        />
                                    </svg>
                                    <span className="relative mt-1 text-2xl leading-none font-extrabold">
                                        {day} {month}
                                    </span>
                                    <span className="relative mt-0.5 text-xs font-medium text-[#99C7FF]/80">
                                        {year}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg leading-snug font-bold text-gray-900 dark:text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                        {item.description ?? ''}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AgendaSection;
