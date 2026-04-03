import { type ColumnDef } from '@tanstack/react-table';
import { ImageIcon, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DataTableColumnHeader,
    DataTableRowActions,
    type RowAction,
} from '@/components/data-table';
import { type GalleryAlbumResource } from '@/types';

export const createGalleryAlbumColumns = (
    onDelete: (album: GalleryAlbumResource) => void,
    onEdit: (album: GalleryAlbumResource) => void,
): ColumnDef<GalleryAlbumResource>[] => {
    const actions: RowAction<GalleryAlbumResource>[] = [
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
            accessorKey: 'images_count',
            header: 'Foto',
            enableSorting: false,
            cell: ({ row }) => {
                const count: number = row.getValue('images_count');
                return (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <ImageIcon className="h-3.5 w-3.5" />
                        <span>{count} foto</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            enableSorting: false,
            cell: ({ row }) => {
                const status: string = row.getValue('status');
                return (
                    <Badge variant={status === 'published' ? 'default' : 'outline'}>
                        {status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Dibuat" />
            ),
            cell: ({ row }) => {
                const date = new Date(row.getValue('created_at'));
                return (
                    <span className="text-sm text-muted-foreground">
                        {date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
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
