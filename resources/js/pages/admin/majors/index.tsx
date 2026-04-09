import { useCallback, useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import * as MajorController from '@/actions/App/Http/Controllers/Admin/MajorController';
import { createMajorColumns } from './components/major-columns';
import { MajorStatsCards } from './components/major-stats-cards';
import { type MajorResource, type MajorStats } from '@/types';

interface Props {
    majors?: MajorResource[];
    stats?: MajorStats;
}

const AdminMajorsIndex = ({ majors, stats }: Props) => {
    const [majorToDelete, setMajorToDelete] = useState<MajorResource | null>(null);

    const handleDeleteConfirm = useCallback(() => {
        if (!majorToDelete) {
            return;
        }
        router.delete(MajorController.destroy.url({ major: majorToDelete.id }), {
            preserveScroll: true,
            onFinish: () => setMajorToDelete(null),
        });
    }, [majorToDelete]);

    const handleEdit = useCallback((major: MajorResource) => {
        router.visit(MajorController.edit.url({ major: major.id }));
    }, []);

    const columns = useMemo(
        () => createMajorColumns(setMajorToDelete, handleEdit),
        [handleEdit],
    );

    return (
        <>
            <Head title="Manajemen Jurusan" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Jurusan</h1>
                        <p className="text-sm text-muted-foreground">Kelola jurusan sekolah.</p>
                    </div>
                    <Button asChild>
                        <Link href={MajorController.create.url()}>Tambah Jurusan</Link>
                    </Button>
                </div>

                <MajorStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={majors ?? []}
                        searchPlaceholder="Cari jurusan..."
                    />
                </div>
            </div>

            <ConfirmationDelete
                open={majorToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setMajorToDelete(null);
                    }
                }}
                onConfirm={handleDeleteConfirm}
                title="Hapus Jurusan"
                itemName={majorToDelete?.title}
            />
        </>
    );
};

AdminMajorsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Jurusan', href: MajorController.index.url() },
    ],
};

export default AdminMajorsIndex;
