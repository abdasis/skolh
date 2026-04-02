import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import type { DataTableFilter } from '@/components/data-table';
import * as ExtracurricularController from '@/actions/App/Http/Controllers/Admin/ExtracurricularController';
import { createExtracurricularColumns } from './components/extracurricular-columns';
import { ExtracurricularStatsCards } from './components/extracurricular-stats-cards';
import { type ExtracurricularResource, type ExtracurricularStats } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface Filters {
    search?: string;
    status?: string;
    category?: string;
}

interface Props {
    extracurriculars: ExtracurricularResource[];
    stats: ExtracurricularStats;
    filters: Filters;
    categories: EnumOption[];
    statuses: EnumOption[];
}

const AdminExtracurricularsIndex = ({
    extracurriculars,
    stats,
    filters,
    categories,
    statuses,
}: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Ekstrakurikuler', href: ExtracurricularController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<ExtracurricularResource | null>(null);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(ExtracurricularController.destroy.url({ extracurricular: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = (extracurricular: ExtracurricularResource) => {
        router.visit(ExtracurricularController.edit.url({ extracurricular: extracurricular.id }));
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            ExtracurricularController.index.url(),
            { ...filters, [key]: value || undefined },
            { preserveState: true, replace: true },
        );
    };

    const columns = createExtracurricularColumns(setToDelete, handleEdit);

    const tableFilters: DataTableFilter[] = [
        {
            type: 'select',
            key: 'status',
            label: 'Status',
            options: statuses,
        },
        {
            type: 'select',
            key: 'category',
            label: 'Kategori',
            options: categories,
        },
    ];

    return (
        <>
            <Head title="Manajemen Ekstrakurikuler" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Ekstrakurikuler</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola data kegiatan ekstrakurikuler sekolah.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={ExtracurricularController.create.url()}>
                            Tambah Ekskul
                        </Link>
                    </Button>
                </div>

                <ExtracurricularStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={extracurriculars}
                        searchPlaceholder="Cari ekstrakurikuler..."
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
                title="Hapus Ekstrakurikuler"
                itemName={toDelete?.title}
            />
        </>
    );
};

export default AdminExtracurricularsIndex;
