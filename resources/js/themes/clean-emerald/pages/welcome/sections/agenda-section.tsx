import { CalendarIcon } from 'lucide-react';
import { type SiteConfig } from '@/types';

interface AgendaPreview {
    id: number;
    date: string;
    title: string;
    description: string | null;
}

const AgendaSection = ({
    siteConfig,
    agendas,
}: {
    siteConfig: SiteConfig | null;
    agendas: AgendaPreview[];
}) => {
    return (
        <section
            id="agenda"
            className="bg-emerald-50/60 py-20 sm:py-28 dark:bg-emerald-950/10"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                        <CalendarIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-emerald-600 dark:text-emerald-400">
                                Agenda
                            </span>
                            <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/50" />
                        </span>
                    </span>
                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                        {siteConfig?.sections?.agenda?.heading ??
                            'Agenda Kegiatan'}
                    </h2>
                    {siteConfig?.sections?.agenda?.description && (
                        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
                            {siteConfig.sections.agenda.description}
                        </p>
                    )}
                </div>

                {agendas.length === 0 && (
                    <p className="mt-8 text-center text-sm text-gray-400">
                        Belum ada agenda yang dijadwalkan.
                    </p>
                )}
                <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    {agendas.map((item) => {
                        const d = new Date(item.date);
                        const agenda = {
                            day: d.getDate().toString().padStart(2, '0'),
                            month: d.toLocaleString('id-ID', {
                                month: 'short',
                            }),
                            year: d.getFullYear().toString(),
                            title: item.title,
                            desc: item.description ?? '',
                        };
                        return (
                            <div
                                key={item.id}
                                className="flex items-center gap-5"
                            >
                                <div className="relative flex h-28 w-28 shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-emerald-700/30 bg-emerald-600 text-white dark:border-emerald-500/30 dark:bg-emerald-700">
                                    <svg
                                        className="pointer-events-none absolute -top-2 -right-2 h-16 w-16 text-emerald-500/30"
                                        fill="none"
                                        viewBox="0 0 60 60"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path d="M60 0 C60 33.14 33.14 60 0 60" />
                                        <path d="M60 10 C60 37.61 37.61 60 10 60" />
                                        <path d="M60 20 C60 42.09 42.09 60 20 60" />
                                    </svg>
                                    <svg
                                        className="relative h-6 w-6 text-emerald-200/70"
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
                                        {agenda.day} {agenda.month}
                                    </span>
                                    <span className="relative mt-0.5 text-xs font-medium text-emerald-200/80">
                                        {agenda.year}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg leading-snug font-bold text-gray-900 dark:text-white">
                                        {agenda.title}
                                    </h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                        {agenda.desc}
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
export type { AgendaPreview };
