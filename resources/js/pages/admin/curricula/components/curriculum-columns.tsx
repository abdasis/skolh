import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DataTableColumnHeader,
    DataTableRowActions,
    type RowAction,
} from '@/components/data-table';
import { type CurriculumResource } from '@/types';

const createCurriculumColumns = (
    onDelete: (curriculum: CurriculumResource) => void,
    onEdit: (curriculum: CurriculumResource) => void,
): ColumnDef<CurriculumResource>[] => {
    const actions: RowAction<CurriculumResource>[] = [
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
            meta: { label: 'Icon' },
            enableSorting: false,
            cell: ({ row }) => (
                <span className="font-mono text-xs text-muted-foreground">
                    {row.getValue('icon')}
                </span>
            ),
        },
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nama" />
            ),
            meta: { label: 'Nama' },
            cell: ({ row }) => (
                <span className="font-medium">{row.getValue('name')}</span>
            ),
        },
        {
            accessorKey: 'code',
            header: 'Kode',
            meta: { label: 'Kode' },
            enableSorting: false,
            cell: ({ row }) => (
                <span className="font-mono text-xs">
                    {row.getValue('code')}
                </span>
            ),
        },
        {
            accessorKey: 'level',
            header: 'Jenjang',
            meta: { label: 'Jenjang' },
            enableSorting: false,
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('level')}
                </span>
            ),
        },
        {
            accessorKey: 'year',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tahun" />
            ),
            meta: { label: 'Tahun' },
            cell: ({ row }) => (
                <span className="tabular-nums">{row.getValue('year')}</span>
            ),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            meta: { label: 'Status' },
            cell: ({ row }) => {
                const status: string = row.getValue('status');
                return (
                    <Badge
                        variant={status === 'active' ? 'default' : 'secondary'}
                    >
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

export { createCurriculumColumns };
