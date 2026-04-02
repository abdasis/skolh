import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DataTableColumnHeader,
    DataTableRowActions,
    type RowAction,
} from '@/components/data-table';
import { type TeacherResource } from '@/types';

export const createTeacherColumns = (
    onDelete: (teacher: TeacherResource) => void,
    onEdit: (teacher: TeacherResource) => void,
): ColumnDef<TeacherResource>[] => {
    const actions: RowAction<TeacherResource>[] = [
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
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nama" />
            ),
            cell: ({ row }) => {
                const teacher = row.original;
                return (
                    <div className="flex items-center gap-3">
                        {teacher.avatar_url ? (
                            <img
                                src={teacher.avatar_url}
                                alt={teacher.name}
                                className="h-8 w-8 rounded-full object-cover ring-1 ring-muted"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                {teacher.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <span className="font-medium">{teacher.name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'nip',
            header: 'NIP',
            enableSorting: false,
            cell: ({ row }) => (
                <span className="font-mono text-sm text-muted-foreground">{row.getValue('nip')}</span>
            ),
        },
        {
            accessorKey: 'subject',
            header: 'Mata Pelajaran',
            enableSorting: false,
            cell: ({ row }) => {
                const subject: string | null = row.getValue('subject');
                return subject ? (
                    <Badge variant="secondary">{subject}</Badge>
                ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                );
            },
        },
        {
            accessorKey: 'email',
            header: 'Email',
            enableSorting: false,
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">{row.getValue('email')}</span>
            ),
        },
        {
            accessorKey: 'joined_at',
            header: 'Bergabung',
            enableSorting: false,
            cell: ({ row }) => {
                const date: string | null = row.getValue('joined_at');
                return (
                    <span className="text-sm text-muted-foreground">
                        {date ? new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                    </span>
                );
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            enableSorting: false,
            cell: ({ row }) => {
                const status: string = row.getValue('status');
                return (
                    <Badge variant={status === 'active' ? 'default' : 'outline'}>
                        {status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
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
