import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DataTableColumnHeader,
    DataTableRowActions,
    type RowAction,
} from '@/components/data-table';
import { type OrganizationNodeResource } from '@/types';

export const createOrganizationNodeColumns = (
    onDelete: (node: OrganizationNodeResource) => void,
    onEdit: (node: OrganizationNodeResource) => void,
): ColumnDef<OrganizationNodeResource>[] => {
    const actions: RowAction<OrganizationNodeResource>[] = [
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
            accessorKey: 'position',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Jabatan" />
            ),
            cell: ({ row }) => {
                const node = row.original;
                return (
                    <div className="flex items-center gap-3">
                        {node.avatar_url ? (
                            <img
                                src={node.avatar_url}
                                alt={node.display_name ?? node.position}
                                className="h-8 w-8 rounded-full object-cover ring-1 ring-muted"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                {node.position.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <span className="font-medium">{node.position}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'display_name',
            header: 'Nama',
            enableSorting: false,
            cell: ({ row }) => {
                const node = row.original;
                const name = node.display_name;
                return name ? (
                    <span className="text-sm">{name}</span>
                ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                );
            },
        },
        {
            accessorKey: 'sort_order',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Urutan" />
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">{row.getValue('sort_order')}</span>
            ),
        },
        {
            accessorKey: 'is_broken_link',
            header: 'Status',
            enableSorting: false,
            cell: ({ row }) => {
                const isBroken: boolean = row.getValue('is_broken_link');
                return isBroken ? (
                    <Badge variant="outline" className="border-orange-400 text-orange-600 dark:text-orange-400">
                        Perlu Diperbarui
                    </Badge>
                ) : null;
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
