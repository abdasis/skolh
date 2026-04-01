import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { DataTableColumnHeader, DataTableRowActions, type RowAction } from '@/components/data-table';
import { type CategoryResource } from '@/types';

export const createCategoryColumns = (
    onDelete: (category: CategoryResource) => void,
    onEdit: (category: CategoryResource) => void,
): ColumnDef<CategoryResource>[] => {
    const actions: RowAction<CategoryResource>[] = [
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
            header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
            cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
        },
        {
            accessorKey: 'slug',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Slug" />,
            cell: ({ row }) => (
                <span className="font-mono text-xs text-muted-foreground">{row.getValue('slug')}</span>
            ),
        },
        {
            accessorKey: 'description',
            header: 'Deskripsi',
            enableSorting: false,
            cell: ({ row }) => {
                const desc: string | null = row.getValue('description');
                if (!desc) {
                    return <span className="text-muted-foreground italic">Tidak ada deskripsi</span>;
                }
                return (
                    <span className="text-muted-foreground">
                        {desc.length > 80 ? desc.slice(0, 80) + '…' : desc}
                    </span>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => <DataTableRowActions row={row.original} actions={actions} />,
        },
    ];
};
