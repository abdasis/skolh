import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader, DataTableRowActions, type RowAction } from '@/components/data-table';
import { type FacilityResource } from '@/types';

export function createFacilityColumns(
    onDelete: (facility: FacilityResource) => void,
    onEdit: (facility: FacilityResource) => void,
): ColumnDef<FacilityResource>[] {
    const actions: RowAction<FacilityResource>[] = [
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
            accessorKey: 'icon',
            header: 'Icon',
            enableSorting: false,
            cell: ({ row }) => (
                <span className="font-mono text-xs text-muted-foreground">{row.getValue('icon')}</span>
            ),
        },
        {
            accessorKey: 'title',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Judul" />,
            cell: ({ row }) => (
                <span className="font-medium">{row.getValue('title')}</span>
            ),
        },
        {
            accessorKey: 'description',
            header: 'Deskripsi',
            enableSorting: false,
            cell: ({ row }) => {
                const desc: string = row.getValue('description');
                return (
                    <span className="text-muted-foreground">
                        {desc.length > 80 ? desc.slice(0, 80) + '…' : desc}
                    </span>
                );
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status: string = row.getValue('status');
                return (
                    <Badge variant={status === 'public' ? 'default' : 'secondary'}>
                        {status === 'public' ? 'Publik' : 'Draft'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Dibuat" />,
            cell: ({ row }) => {
                const d = new Date(row.getValue('created_at'));
                return (
                    <span className="whitespace-nowrap text-muted-foreground">
                        {d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
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
}
