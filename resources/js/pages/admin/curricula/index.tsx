import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import * as CurriculumController from '@/actions/App/Http/Controllers/Admin/CurriculumController';
import { createCurriculumColumns } from './components/curriculum-columns';
import { CurriculumStatsCards } from './components/curriculum-stats-cards';
import { type CurriculumResource, type CurriculumStats } from '@/types';

interface Props {
    curricula: CurriculumResource[];
    stats: CurriculumStats;
}

const AdminCurriculaIndex = ({ curricula, stats }: Props) => {
    const [curriculumToDelete, setCurriculumToDelete] =
        useState<CurriculumResource | null>(null);

    function handleDeleteConfirm() {
        if (!curriculumToDelete) {
            return;
        }
        router.delete(
            CurriculumController.destroy.url({
                curriculum: curriculumToDelete.id,
            }),
            {
                preserveScroll: true,
                onFinish: () => setCurriculumToDelete(null),
            },
        );
    }

    function handleEdit(curriculum: CurriculumResource) {
        router.visit(
            CurriculumController.edit.url({ curriculum: curriculum.id }),
        );
    }

    const columns = createCurriculumColumns(setCurriculumToDelete, handleEdit);

    return (
        <>
            <Head title="Manajemen Kurikulum" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Manajemen Kurikulum
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola kurikulum sekolah.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={CurriculumController.create.url()}>
                            Tambah Kurikulum
                        </Link>
                    </Button>
                </div>

                <CurriculumStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={curricula}
                        searchPlaceholder="Cari kurikulum..."
                    />
                </div>
            </div>

            <ConfirmationDelete
                open={curriculumToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setCurriculumToDelete(null);
                    }
                }}
                onConfirm={handleDeleteConfirm}
                title="Hapus Kurikulum"
                itemName={curriculumToDelete?.name}
            />
        </>
    );
};

export default AdminCurriculaIndex;

AdminCurriculaIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kurikulum', href: CurriculumController.index.url() },
    ],
};
