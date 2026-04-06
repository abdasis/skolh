import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import {
    DataTableRowActions,
    type RowAction,
} from '@/components/data-table/data-table-row-actions';
import * as RoleController from '@/actions/App/Http/Controllers/Admin/RoleController';
import type { Role } from '@/types';

interface ColumnOptions {
    onDeleteRequest: (role: Role) => void;
}

export const roleColumns = ({
    onDeleteRequest,
}: ColumnOptions): ColumnDef<Role>[] => {
    const actions: RowAction<Role>[] = [
        {
            label: 'Edit',
            icon: <Pencil />,
            onClick: (role) => {
                window.location.href = RoleController.edit.url({
                    role: role.id,
                });
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
                <DataTableColumnHeader column={column} title="Nama Role" />
            ),
        },
        {
            accessorKey: 'guard_name',
            header: 'Guard',
            cell: ({ row }) => (
                <Badge variant="outline">{row.original.guard_name}</Badge>
            ),
        },
        {
            accessorKey: 'permissions_count',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Permissions" />
            ),
            cell: ({ row }) => (
                <Badge variant="secondary">
                    {row.original.permissions_count ?? 0}
                </Badge>
            ),
        },
        {
            accessorKey: 'users_count',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Users" />
            ),
            cell: ({ row }) => (
                <Badge variant="secondary">
                    {row.original.users_count ?? 0}
                </Badge>
            ),
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Dibuat" />
            ),
            cell: ({ row }) =>
                row.original.created_at
                    ? new Date(row.original.created_at).toLocaleDateString(
                          'id-ID',
                      )
                    : '-',
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <DataTableRowActions row={row.original} actions={actions} />
            ),
        },
    ];
};
