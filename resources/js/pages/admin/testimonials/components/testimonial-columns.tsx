import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DataTableColumnHeader,
    DataTableRowActions,
    type RowAction,
} from '@/components/data-table';
import { type Testimonial } from '@/types';

const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
    return (first + last).toUpperCase();
};

export const createTestimonialColumns = (
    onDelete: (testimonial: Testimonial) => void,
    onEdit: (testimonial: Testimonial) => void,
): ColumnDef<Testimonial>[] => {
    const actions: RowAction<Testimonial>[] = [
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
                const item = row.original;
                return (
                    <div className="flex items-center gap-3">
                        {item.avatar_url ? (
                            <img
                                src={item.avatar_url}
                                alt={item.name}
                                className="h-8 w-8 rounded-full object-cover ring-1 ring-muted"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                {getInitials(item.name)}
                            </div>
                        )}
                        <span className="font-medium">{item.name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'role',
            header: 'Peran',
            enableSorting: false,
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">{row.getValue('role')}</span>
            ),
        },
        {
            accessorKey: 'highlight',
            header: 'Highlight',
            enableSorting: false,
            cell: ({ row }) => (
                <Badge variant="secondary">{row.getValue('highlight')}</Badge>
            ),
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
            accessorKey: 'created_at',
            header: 'Dibuat',
            enableSorting: false,
            cell: ({ row }) => {
                const date: string = row.getValue('created_at');
                return (
                    <span className="text-sm text-muted-foreground">
                        {new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
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
};
