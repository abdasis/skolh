import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import * as AchievementController from '@/actions/App/Http/Controllers/AchievementController';
import { type AchievementResource } from '@/types';

interface Props {
    achievement: AchievementResource;
}

const AchievementsShow = ({ achievement }: Props) => {
    const isImage = achievement.attachment
        ? /\.(jpg|jpeg|png|webp)$/i.test(achievement.attachment)
        : false;

    return (
        <>
            <Head title={achievement.title} />

            <div className="container mx-auto px-4 py-10">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="-ml-3">
                        <Link href={AchievementController.index.url()}>
                            &larr; Kembali ke Daftar Prestasi
                        </Link>
                    </Button>
                </div>

                <div className="mx-auto max-w-2xl">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="p-6">
                                <div className="mb-3 flex flex-wrap gap-2">
                                    <Badge variant="secondary">
                                        {achievement.category_label}
                                    </Badge>
                                    <Badge variant="outline">
                                        {achievement.level_label}
                                    </Badge>
                                    <Badge variant="outline">
                                        {achievement.year}
                                    </Badge>
                                </div>

                                <h1 className="text-2xl font-bold leading-snug">
                                    {achievement.title}
                                </h1>

                                <p className="mt-4 whitespace-pre-wrap text-muted-foreground">
                                    {achievement.description}
                                </p>

                                {achievement.attachment && (
                                    <div className="mt-6">
                                        <p className="mb-2 text-sm font-medium">
                                            Lampiran
                                        </p>
                                        {isImage ? (
                                            <img
                                                src={achievement.attachment}
                                                alt={achievement.title}
                                                className="max-w-full rounded-lg"
                                            />
                                        ) : (
                                            <Button variant="outline" asChild>
                                                <a
                                                    href={achievement.attachment}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Unduh Lampiran
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AchievementsShow;
