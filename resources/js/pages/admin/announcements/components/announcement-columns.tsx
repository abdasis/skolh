import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader, DataTableRowActions, type RowAction } from '@/components/data-table';
import { type AnnouncementResource } from '@/types';

export const createAnnouncementColumns = (
    onDelete: (announcement: AnnouncementResource) => void,
    onEdit: (announcement: AnnouncementResource) => void,
): ColumnDef<AnnouncementResource>[] => {
    const actions: RowAction<AnnouncementResource>[] = [
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
            header: ({ column }) => <DataTableColumnHeader column={column} title="Judul" />,
            cell: ({ row }) => <span className="font-medium">{row.getValue('title')}</span>,
        },
        {
            accessorKey: 'categories',
            header: 'Kategori',
            enableSorting: false,
            cell: ({ row }) => {
                const categories = row.original.categories;
                if (!categories.length) {
                    return <span className="text-muted-foreground italic text-xs">Tidak ada</span>;
                }
                return (
                    <div className="flex flex-wrap gap-1">
                        {categories.map((cat) => (
                            <Badge key={cat.id} variant="secondary" className="text-xs">
                                {cat.name}
                            </Badge>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status: string = row.getValue('status');
                return (
                    <Badge variant={status === 'published' ? 'default' : 'secondary'}>
                        {status === 'published' ? 'Publik' : 'Draft'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'published_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Dipublikasikan" />,
            cell: ({ row }) => {
                const val: string | null = row.getValue('published_at');
                if (!val) {
                    return <span className="text-muted-foreground italic text-xs">Belum</span>;
                }
                return (
                    <span className="whitespace-nowrap text-sm text-muted-foreground">
                        {new Date(val).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                );
            },
        },
        {
            accessorKey: 'expired_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Kedaluwarsa" />,
            cell: ({ row }) => {
                const val: string | null = row.getValue('expired_at');
                if (!val) {
                    return <span className="text-muted-foreground italic text-xs">Tidak ada</span>;
                }
                const expired = new Date(val) < new Date();
                return (
                    <span className={`whitespace-nowrap text-sm ${expired ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {new Date(val).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
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
