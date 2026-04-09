import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import * as ExtracurricularController from '@/actions/App/Http/Controllers/ExtracurricularController';
import { type ExtracurricularResource } from '@/types';

interface Props {
    extracurricular: ExtracurricularResource;
}

const ExtracurricularsShow = ({ extracurricular }: Props) => {
    const excerpt = (extracurricular.description ?? '').slice(0, 160);

    return (
        <>
            <Head title={extracurricular.title}>
                <meta name="description" content={excerpt} />
                <meta property="og:title" content={extracurricular.title} />
                <meta property="og:description" content={excerpt} />
                <meta property="og:type" content="article" />
                {extracurricular.featured_image_url && (
                    <meta property="og:image" content={extracurricular.featured_image_url} />
                )}
                <link rel="canonical" href={window.location.href.split('?')[0]} />
            </Head>

            <div className="container mx-auto px-4 py-10">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="-ml-3">
                        <Link href={ExtracurricularController.index.url()}>
                            &larr; Kembali ke Daftar Ekstrakurikuler
                        </Link>
                    </Button>
                </div>

                <div className="mx-auto max-w-2xl">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            {extracurricular.featured_image_url && (
                                <img
                                    src={extracurricular.featured_image_url}
                                    alt={extracurricular.title}
                                    className="h-64 w-full object-cover"
                                />
                            )}
                            <div className="p-6">
                                <div className="mb-3 flex flex-wrap gap-2">
                                    <Badge variant="secondary">
                                        {extracurricular.category_label}
                                    </Badge>
                                </div>

                                <h1 className="text-2xl font-bold leading-snug">
                                    {extracurricular.title}
                                </h1>

                                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                    <div>
                                        <span className="font-medium text-foreground">Hari: </span>
                                        {extracurricular.day_label}
                                    </div>
                                    <div>
                                        <span className="font-medium text-foreground">Waktu: </span>
                                        {extracurricular.time}
                                    </div>
                                    <div>
                                        <span className="font-medium text-foreground">Pembina: </span>
                                        {extracurricular.supervisor}
                                    </div>
                                </div>

                                {extracurricular.description && (
                                    <p className="mt-4 text-muted-foreground">
                                        {extracurricular.description}
                                    </p>
                                )}

                                {extracurricular.content && (
                                    <div
                                        className="prose prose-sm mt-6 max-w-none dark:prose-invert"
                                        dangerouslySetInnerHTML={{ __html: extracurricular.content }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExtracurricularsShow;
