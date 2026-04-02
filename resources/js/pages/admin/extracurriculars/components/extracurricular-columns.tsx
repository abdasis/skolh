import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DataTableColumnHeader,
    DataTableRowActions,
    type RowAction,
} from '@/components/data-table';
import { type ExtracurricularResource } from '@/types';

export const createExtracurricularColumns = (
    onDelete: (extracurricular: ExtracurricularResource) => void,
    onEdit: (extracurricular: ExtracurricularResource) => void,
): ColumnDef<ExtracurricularResource>[] => {
    const actions: RowAction<ExtracurricularResource>[] = [
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
            accessorKey: 'title',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Judul" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">{row.getValue('title')}</span>
            ),
        },
        {
            accessorKey: 'category_label',
            header: 'Kategori',
            enableSorting: false,
            cell: ({ row }) => (
                <Badge variant="secondary">{row.getValue('category_label')}</Badge>
            ),
        },
        {
            accessorKey: 'day_label',
            header: 'Hari',
            enableSorting: false,
            cell: ({ row }) => (
                <span className="text-sm">{row.getValue('day_label')}</span>
            ),
        },
        {
            accessorKey: 'time',
            header: 'Waktu',
            enableSorting: false,
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">{row.getValue('time')}</span>
            ),
        },
        {
            accessorKey: 'supervisor',
            header: 'Pembina',
            enableSorting: false,
            cell: ({ row }) => (
                <span className="text-sm">{row.getValue('supervisor')}</span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            enableSorting: false,
            cell: ({ row }) => {
                const status: string = row.getValue('status');
                return (
                    <Badge variant={status === 'active' ? 'default' : 'outline'}>
                        {status === 'active' ? 'Aktif' : 'Draft'}
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
