import { MessageSquareQuoteIcon } from 'lucide-react';
import { type SiteConfig, type Testimonial } from '@/types';

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const TestimonialsSection = ({
    siteConfig,
    testimonials,
}: {
    siteConfig: SiteConfig | null;
    testimonials: Testimonial[];
}) => {
    return (
        <section id="testimoni" className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                        <MessageSquareQuoteIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-emerald-600 dark:text-emerald-400">
                                Testimoni
                            </span>
                            <span className="absolute bottom-0.5 left-0 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/50" />
                        </span>
                    </span>
                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                        {siteConfig?.sections?.testimonials?.heading ??
                            'Apa Kata Wali Murid'}
                    </h2>
                    {siteConfig?.sections?.testimonials?.description && (
                        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
                            {siteConfig.sections.testimonials.description}
                        </p>
                    )}
                </div>

                {testimonials.length === 0 ? (
                    <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/50 px-8 py-20 text-center dark:border-emerald-800/50 dark:bg-emerald-950/10">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30" />
                            <svg
                                className="relative h-10 w-10 text-emerald-400 dark:text-emerald-600"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                            >
                                <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.379 1.121-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.379 1.121-2.5 2.5-2.5V8z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                                Belum ada testimoni
                            </p>
                            <p className="mt-1.5 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                                Testimoni dari wali murid akan tampil di sini
                                setelah ditambahkan.
                            </p>
                        </div>
                        <div className="mt-2 grid w-full max-w-2xl grid-cols-3 gap-3 opacity-40">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="h-24 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30"
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((item) => (
                            <div
                                key={item.id}
                                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.05)] dark:bg-gray-900 dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3),0_10px_20px_-2px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4),0_20px_25px_-5px_rgba(0,0,0,0.3)]"
                            >
                                <div className="h-1 w-0 bg-emerald-500 transition-all duration-500 ease-out group-hover:w-full" />

                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map(
                                            (_, i) => (
                                                <svg
                                                    key={i}
                                                    className="h-4 w-4 text-orange-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ),
                                        )}
                                    </div>

                                    <svg
                                        className="mt-4 h-8 w-8 text-emerald-100 dark:text-emerald-900/50"
                                        fill="currentColor"
                                        viewBox="0 0 32 32"
                                    >
                                        <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.379 1.121-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.379 1.121-2.5 2.5-2.5V8z" />
                                    </svg>

                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        {item.quote}
                                    </p>

                                    <div className="mt-5">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                            <span className="h-1 w-1 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                            {item.highlight}
                                        </span>
                                    </div>

                                    <div className="mt-5 border-t border-gray-100 pt-5 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            {item.avatar_url ? (
                                                <img
                                                    src={item.avatar_url}
                                                    alt={item.name}
                                                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-emerald-200 dark:ring-emerald-800"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                                    {getInitials(item.name)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {item.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestimonialsSection;
