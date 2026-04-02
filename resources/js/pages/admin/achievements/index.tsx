import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import type { DataTableFilter } from '@/components/data-table';
import * as AchievementController from '@/actions/App/Http/Controllers/Admin/AchievementController';
import { createAchievementColumns } from './components/achievement-columns';
import { AchievementStatsCards } from './components/achievement-stats-cards';
import { type AchievementResource, type AchievementStats } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface Filters {
    search?: string;
    category?: string;
    level?: string;
    year?: string;
}

interface Props {
    achievements: AchievementResource[];
    stats: AchievementStats;
    filters: Filters;
    categories: EnumOption[];
    levels: EnumOption[];
}

const AdminAchievementsIndex = ({
    achievements,
    stats,
    filters,
    categories,
    levels,
}: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Prestasi', href: AchievementController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<AchievementResource | null>(null);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(AchievementController.destroy.url({ achievement: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = (achievement: AchievementResource) => {
        router.visit(AchievementController.edit.url({ achievement: achievement.id }));
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            AchievementController.index.url(),
            { ...filters, [key]: value || undefined },
            { preserveState: true, replace: true },
        );
    };

    const columns = createAchievementColumns(setToDelete, handleEdit);

    const tableFilters: DataTableFilter[] = [
        {
            type: 'select',
            key: 'category',
            label: 'Kategori',
            options: categories,
        },
        {
            type: 'select',
            key: 'level',
            label: 'Tingkat',
            options: levels,
        },
        {
            type: 'year-range',
            key: 'year',
            label: 'Tahun',
        },
    ];

    return (
        <>
            <Head title="Manajemen Prestasi" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Prestasi</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola data prestasi sekolah.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={AchievementController.create.url()}>
                            Tambah Prestasi
                        </Link>
                    </Button>
                </div>

                <AchievementStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={achievements}
                        searchPlaceholder="Cari prestasi..."
                        filters={tableFilters}
                        filterValues={filters as Record<string, string | undefined>}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            </div>

            <ConfirmationDelete
                open={toDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setToDelete(null);
                    }
                }}
                onConfirm={handleDeleteConfirm}
                title="Hapus Prestasi"
                itemName={toDelete?.title}
            />
        </>
    );
};

export default AdminAchievementsIndex;
