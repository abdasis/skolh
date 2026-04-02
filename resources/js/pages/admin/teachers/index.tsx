import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import type { DataTableFilter, DataTableState } from '@/components/data-table';
import * as TeacherController from '@/actions/App/Http/Controllers/Admin/TeacherController';
import { createTeacherColumns } from './components/teacher-columns';
import { TeacherStatsCards } from './components/teacher-stats-cards';
import { type TeacherResource, type TeacherStats } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface PaginatedTeachers {
    data: TeacherResource[];
    meta: { total: number; per_page: number; current_page: number };
}

interface Props {
    teachers: PaginatedTeachers;
    stats: TeacherStats;
    statusOptions: EnumOption[];
}

const AdminTeachersIndex = ({ teachers, stats, statusOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Guru', href: TeacherController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<TeacherResource | null>(null);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(TeacherController.destroy.url({ teacher: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = (teacher: TeacherResource) => {
        router.visit(TeacherController.edit.url({ teacher: teacher.id }));
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

        state.columnFilters.forEach((f) => {
            params[f.id] = f.value;
        });

        router.get(TeacherController.index.url(), params as Record<string, string | number | boolean | undefined>, {
            preserveState: true,
            replace: true,
        });
    };

    const columns = createTeacherColumns(setToDelete, handleEdit);

    const tableFilters: DataTableFilter[] = [
        {
            type: 'select',
            key: 'status',
            label: 'Status',
            options: statusOptions,
        },
    ];

    return (
        <>
            <Head title="Manajemen Guru" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Guru</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola data guru sekolah.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={TeacherController.create.url()}>
                            Tambah Guru
                        </Link>
                    </Button>
                </div>

                <TeacherStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={teachers.data}
                        mode="server"
                        totalRows={teachers.meta.total}
                        searchPlaceholder="Cari nama atau email..."
                        filters={tableFilters}
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
                title="Hapus Guru"
                itemName={toDelete?.name}
            />
        </>
    );
};

export default AdminTeachersIndex;
