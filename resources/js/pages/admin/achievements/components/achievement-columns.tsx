import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DataTableColumnHeader,
    DataTableRowActions,
    type RowAction,
} from '@/components/data-table';
import { type AchievementResource } from '@/types';

export const createAchievementColumns = (
    onDelete: (achievement: AchievementResource) => void,
    onEdit: (achievement: AchievementResource) => void,
): ColumnDef<AchievementResource>[] => {
    const actions: RowAction<AchievementResource>[] = [
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
            accessorKey: 'level_label',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tingkat" />
            ),
            cell: ({ row }) => {
                const level: string = row.original.level;
                const label: string = row.getValue('level_label');
                const variantMap: Record<string, 'default' | 'secondary' | 'outline'> = {
                    international: 'default',
                    national: 'default',
                    province: 'secondary',
                    district: 'outline',
                };
                return (
                    <Badge variant={variantMap[level] ?? 'secondary'}>{label}</Badge>
                );
            },
        },
        {
            accessorKey: 'year',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tahun" />
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {row.getValue('year')}
                </span>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DataTableRowActions row={row.original} actions={actions} />
            ),
        },
    ];
};
