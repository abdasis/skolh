import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import type { DataTableFilter, DataTableState } from '@/components/data-table';
import * as StudentController from '@/actions/App/Http/Controllers/Admin/StudentController';
import { createStudentColumns } from './components/student-columns';
import ConvertFromSpmbDialog from './components/convert-from-spmb-dialog';
import { type Student } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface PaginatedStudents {
    data: Student[];
    meta: { total: number; per_page: number; current_page: number };
}

interface Props {
    students: PaginatedStudents;
    filters: {
        search: string | null;
        status: string | null;
    };
}

const statusOptions: EnumOption[] = [
    { value: 'active', label: 'Aktif' },
    { value: 'graduated', label: 'Lulus' },
    { value: 'transferred', label: 'Pindah' },
    { value: 'dropped_out', label: 'Keluar' },
];

const AdminStudentsIndex = ({ students, filters }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Siswa', href: StudentController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<Student | null>(null);
    const [convertOpen, setConvertOpen] = useState(false);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(StudentController.destroy.url({ student: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = (student: Student) => {
        router.visit(StudentController.edit.url({ student: student.id }));
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

        router.get(StudentController.index.url(), params as Record<string, string | number | boolean | undefined>, {
            preserveState: true,
            replace: true,
        });
    };

    const columns = createStudentColumns(setToDelete, handleEdit);

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
            <Head title="Manajemen Siswa" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Siswa</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola data siswa sekolah.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => setConvertOpen(true)}>
                            Konversi dari SPMB
                        </Button>
                        <Button asChild>
                            <Link href={StudentController.create.url()}>
                                Tambah Siswa
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={students.data}
                        mode="server"
                        totalRows={students.meta.total}
                        searchPlaceholder="Cari nama, NIS, atau NISN..."
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
                title="Hapus Siswa"
                itemName={toDelete?.full_name}
            />

            <ConvertFromSpmbDialog
                open={convertOpen}
                onOpenChange={setConvertOpen}
            />
        </>
    );
};

export default AdminStudentsIndex;
