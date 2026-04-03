import { Head, Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import * as AchievementController from '@/actions/App/Http/Controllers/AchievementController';
import { type AchievementResource } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface Filters {
    category?: string;
    level?: string;
    year?: string;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    achievements: {
        data: AchievementResource[];
        meta: PaginationMeta;
    };
    filters: Filters;
    categories: EnumOption[];
    levels: EnumOption[];
}

const AchievementsIndex = ({ achievements, filters, categories, levels }: Props) => {
    const handleFilterChange = (key: string, value: string) => {
        router.get(
            AchievementController.index.url(),
            { ...filters, [key]: value || undefined },
            { preserveState: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Prestasi Sekolah" />

            <div className="container mx-auto px-4 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Prestasi Sekolah</h1>
                    <p className="mt-2 text-muted-foreground">
                        Daftar prestasi yang telah diraih oleh siswa dan sekolah.
                    </p>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                    <Select
                        value={filters.category ?? ''}
                        onValueChange={(val) => handleFilterChange('category', val === 'all' ? '' : val)}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kategori</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filters.level ?? ''}
                        onValueChange={(val) => handleFilterChange('level', val === 'all' ? '' : val)}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Tingkat" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Tingkat</SelectItem>
                            {levels.map((lvl) => (
                                <SelectItem key={lvl.value} value={lvl.value}>
                                    {lvl.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filters.year ?? ''}
                        onValueChange={(val) => handleFilterChange('year', val === 'all' ? '' : val)}
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Tahun</SelectItem>
                            {Array.from(
                                { length: new Date().getFullYear() - 2009 },
                                (_, i) => new Date().getFullYear() - i,
                            ).map((year) => (
                                <SelectItem key={year} value={String(year)}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {achievements.data.length === 0 ? (
                    <p className="text-center text-muted-foreground py-16">
                        Belum ada prestasi yang ditemukan.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {achievements.data.map((achievement) => (
                            <Link
                                key={achievement.id}
                                href={AchievementController.show.url({ achievement: achievement.id })}
                                className="group block overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8 transition-shadow hover:ring-foreground/20"
                            >
                                <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                    <div className="p-4">
                                        <div className="mb-2 flex flex-wrap gap-1">
                                            <Badge variant="secondary">
                                                {achievement.category_label}
                                            </Badge>
                                            <Badge variant="outline">
                                                {achievement.level_label}
                                            </Badge>
                                        </div>
                                        <h2 className="font-semibold leading-snug group-hover:underline">
                                            {achievement.title}
                                        </h2>
                                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                            {achievement.description}
                                        </p>
                                        <p className="mt-3 text-xs text-muted-foreground">
                                            {achievement.year}
                                        </p>
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

export default AchievementsIndex;
