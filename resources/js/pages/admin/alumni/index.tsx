import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import type { DataTableState } from '@/components/data-table';
import * as AlumniController from '@/actions/App/Http/Controllers/Admin/AlumniController';
import { createAlumniColumns } from './components/alumni-columns';
import { type Alumni } from '@/types';

interface PaginatedAlumni {
    data: Alumni[];
    meta: { total: number; per_page: number; current_page: number };
}

interface Props {
    alumni: PaginatedAlumni;
}

const AdminAlumniIndex = ({ alumni }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Alumni', href: AlumniController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<Alumni | null>(null);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(AlumniController.destroy.url({ alumnus: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = (alumniItem: Alumni) => {
        router.visit(AlumniController.edit.url({ alumnus: alumniItem.id }));
    };

    const handleStateChange = (state: DataTableState) => {
        const params: Record<string, unknown> = {
            search: state.globalFilter || undefined,
            per_page: state.pagination.pageSize,
            page: state.pagination.pageIndex + 1,
        };

        if (state.sorting.length > 0) {
            params.sort = state.sorting.map((s) => ({ id: s.id, desc: s.desc }));
        }

        router.get(AlumniController.index.url(), params as Record<string, string | number | boolean | undefined>, {
            preserveState: true,
            replace: true,
        });
    };

    const columns = createAlumniColumns(setToDelete, handleEdit);

    return (
        <>
            <Head title="Manajemen Alumni" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Alumni</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola data alumni yang ditampilkan di halaman publik.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={AlumniController.create.url()}>
                            Tambah Alumni
                        </Link>
                    </Button>
                </div>

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={alumni.data}
                        mode="server"
                        totalRows={alumni.meta.total}
                        searchPlaceholder="Cari nama, angkatan, atau tujuan..."
                        onStateChange={handleStateChange}
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
                title="Hapus Alumni"
                itemName={toDelete?.name}
            />
        </>
    );
};

export default AdminAlumniIndex;
