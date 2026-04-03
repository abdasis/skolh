import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import * as ExtracurricularController from '@/actions/App/Http/Controllers/ExtracurricularController';
import { type ExtracurricularResource } from '@/types';

interface Props {
    extracurriculars: ExtracurricularResource[];
}

const ExtracurricularsIndex = ({ extracurriculars }: Props) => {
    return (
        <>
            <Head title="Ekstrakurikuler" />

            <div className="container mx-auto px-4 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Kegiatan Ekstrakurikuler</h1>
                    <p className="mt-2 text-muted-foreground">
                        Daftar kegiatan ekstrakurikuler yang tersedia di sekolah.
                    </p>
                </div>

                {extracurriculars.length === 0 ? (
                    <p className="py-16 text-center text-muted-foreground">
                        Belum ada kegiatan ekstrakurikuler yang tersedia.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {extracurriculars.map((extracurricular) => (
                            <Link
                                key={extracurricular.id}
                                href={ExtracurricularController.show.url({ extracurricular: extracurricular.slug })}
                                className="group block overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8 transition-shadow hover:ring-foreground/20"
                            >
                                <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                    {extracurricular.featured_image_url && (
                                        <img
                                            src={extracurricular.featured_image_url}
                                            alt={extracurricular.title}
                                            className="h-48 w-full object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <div className="mb-2 flex flex-wrap gap-1">
                                            <Badge variant="secondary">
                                                {extracurricular.category_label}
                                            </Badge>
                                        </div>
                                        <h2 className="font-semibold leading-snug group-hover:underline">
                                            {extracurricular.title}
                                        </h2>
                                        {extracurricular.description && (
                                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                {extracurricular.description}
                                            </p>
                                        )}
                                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                            <span>{extracurricular.day_label}, {extracurricular.time}</span>
                                            <span>Pembina: {extracurricular.supervisor}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ExtracurricularsIndex;
