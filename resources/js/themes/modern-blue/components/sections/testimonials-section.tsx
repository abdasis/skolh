import { MessageSquareQuoteIcon } from 'lucide-react';
import type { SiteConfig, Testimonial } from '@/types';
import SectionHeader from '../section-header';

const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
    return (first + last).toUpperCase();
};

const QuoteIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32">
        <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.379 1.121-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.379 1.121-2.5 2.5-2.5V8z" />
    </svg>
);

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
    siteConfig: SiteConfig | null;
}

const TestimonialsSection = ({ testimonials, siteConfig }: TestimonialsSectionProps) => {
    if (siteConfig?.sections?.testimonials?.enabled === false) {
        return null;
    }

    return (
        <section id="testimoni" className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    icon={<MessageSquareQuoteIcon className="h-3.5 w-3.5 text-[#006BFF] dark:text-[#3B8BFF]" />}
                    label=""
                    accentWord="Testimoni"
                    heading={siteConfig?.sections?.testimonials?.heading ?? 'Apa Kata Wali Murid'}
                    description={siteConfig?.sections?.testimonials?.description}
                />

                {testimonials.length === 0 ? (
                    <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-3xl border border-dashed border-[#99C7FF] bg-[#E6F1FF]/50 px-8 py-20 text-center dark:border-[#003D99]/50 dark:bg-[#001F4D]/10">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute h-20 w-20 rounded-full bg-[#CCE3FF] dark:bg-[#002966]/30" />
                            <QuoteIcon className="relative h-10 w-10 text-[#3B8BFF] dark:text-[#006BFF]" />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                                Belum ada testimoni
                            </p>
                            <p className="mt-1.5 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                                Testimoni dari wali murid akan tampil di sini setelah ditambahkan.
                            </p>
                        </div>
                        <div className="mt-2 grid w-full max-w-2xl grid-cols-3 gap-3 opacity-40">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-24 rounded-2xl bg-[#CCE3FF] dark:bg-[#002966]/30" />
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
                                <div className="bg-[#E6F1FF]0 h-1 w-0 transition-all duration-500 ease-out group-hover:w-full" />

                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg
                                                key={i}
                                                className="h-4 w-4 text-[#FFF100]"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <QuoteIcon className="mt-4 h-8 w-8 text-[#CCE3FF] dark:text-[#002966]/50" />

                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        {item.quote}
                                    </p>

                                    <div className="mt-5">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F1FF] px-3 py-1 text-[11px] font-semibold text-[#0052CC] dark:bg-[#001F4D]/60 dark:text-[#3B8BFF]">
                                            <span className="bg-[#E6F1FF]0 h-1 w-1 rounded-full dark:bg-[#3B8BFF]" />
                                            {item.highlight}
                                        </span>
                                    </div>

                                    <div className="mt-5 border-t border-gray-100 pt-5 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            {item.avatar_url ? (
                                                <img
                                                    src={item.avatar_url}
                                                    alt={item.name}
                                                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[#99C7FF] dark:ring-[#003D99]"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#CCE3FF] text-xs font-extrabold text-[#0052CC] dark:bg-[#001F4D] dark:text-[#3B8BFF]">
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
