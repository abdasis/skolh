import { type ColumnDef } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableRowActions, type RowAction } from '@/components/data-table/data-table-row-actions';
import * as UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import type { User } from '@/types/auth';

interface ColumnOptions {
    onDeleteRequest: (user: User) => void;
}

export function userColumns({ onDeleteRequest }: ColumnOptions): ColumnDef<User>[] {
    const actions: RowAction<User>[] = [
        {
            label: 'Edit',
            icon: <Pencil />,
            onClick: (user) => {
                window.location.href = UserController.edit.url({ user: user.id });
            },
        },
        {
            label: 'Hapus',
            icon: <Trash2 />,
            onClick: onDeleteRequest,
            variant: 'destructive',
            separator: true,
        },
    ];

    return [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nama" />
            ),
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
        },
        {
            accessorKey: 'roles',
            header: 'Role',
            cell: ({ row }) => {
                const roles = row.original.roles ?? [];
                return (
                    <div className="flex gap-1">
                        {roles.map((role) => (
                            <Badge key={role.id} variant="secondary">
                                {role.name}
                            </Badge>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'is_active',
            header: 'Status',
            cell: ({ row }) => (
                <Badge variant={row.original.is_active ? 'default' : 'destructive'}>
                    {row.original.is_active ? 'Aktif' : 'Nonaktif'}
                </Badge>
            ),
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Dibuat" />
            ),
            cell: ({ row }) =>
                new Date(row.original.created_at).toLocaleDateString('id-ID'),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <DataTableRowActions row={row.original} actions={actions} />
            ),
        },
    ];
}
