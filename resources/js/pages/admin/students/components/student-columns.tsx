import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DataTableColumnHeader,
    DataTableRowActions,
    type RowAction,
} from '@/components/data-table';
import { type Student } from '@/types';

const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
    return (first + last).toUpperCase();
};

const statusVariantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    green: 'default',
    blue: 'secondary',
    yellow: 'outline',
    red: 'destructive',
};

export const createStudentColumns = (
    onDelete: (student: Student) => void,
    onEdit: (student: Student) => void,
): ColumnDef<Student>[] => {
    const actions: RowAction<Student>[] = [
        {
            label: 'Edit',
            icon: <Pencil />,
            onClick: onEdit,
        },
        {
            label: 'Hapus',
            icon: <Trash2 />,
            variant: 'destructive',
            separator: true,
            onClick: onDelete,
        },
    ];

    return [
        {
            accessorKey: 'full_name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nama" />
            ),
            cell: ({ row }) => {
                const student = row.original;
                return (
                    <div className="flex items-center gap-3">
                        {student.photo_url ? (
                            <img
                                src={student.photo_url}
                                alt={student.full_name}
                                className="h-8 w-8 rounded-full object-cover ring-1 ring-muted"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                {getInitials(student.full_name)}
                            </div>
                        )}
                        <span className="font-medium">{student.full_name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'nis',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="NIS" />
            ),
            cell: ({ row }) => {
                const nis: string | null = row.getValue('nis');
                return (
                    <span className="font-mono text-sm text-muted-foreground">{nis ?? '-'}</span>
                );
            },
        },
        {
            accessorKey: 'nisn',
            header: 'NISN',
            enableSorting: false,
            cell: ({ row }) => {
                const nisn: string | null = row.getValue('nisn');
                return (
                    <span className="font-mono text-sm text-muted-foreground">{nisn ?? '-'}</span>
                );
            },
        },
        {
            accessorKey: 'enrollment_year',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Angkatan" />
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">{row.getValue('enrollment_year')}</span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            enableSorting: false,
            cell: ({ row }) => {
                const student = row.original;
                const variant = statusVariantMap[student.status_color] ?? 'secondary';
                return (
                    <Badge variant={variant}>{student.status_label}</Badge>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DataTableRowActions row={row.original} actions={actions} />
            ),
        },
    ];
};
