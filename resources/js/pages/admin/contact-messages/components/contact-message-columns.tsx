import { type ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader, DataTableRowActions, type RowAction } from '@/components/data-table';
import { type ContactMessageResource } from '@/types';

export const createContactMessageColumns = (
    onDelete: (message: ContactMessageResource) => void,
    onView: (message: ContactMessageResource) => void,
): ColumnDef<ContactMessageResource>[] => {
    const actions: RowAction<ContactMessageResource>[] = [
        {
            label: 'Lihat',
            icon: <Eye />,
            onClick: onView,
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
            header: ({ column }) => <DataTableColumnHeader column={column} title="Pengirim" />,
            cell: ({ row }) => (
                <div>
                    <span className="font-medium">{row.getValue('name')}</span>
                    <p className="text-xs text-muted-foreground">{row.original.email}</p>
                </div>
            ),
        },
        {
            accessorKey: 'subject',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Subjek" />,
            cell: ({ row }) => <span className="text-sm">{row.getValue('subject')}</span>,
        },
        {
            accessorKey: 'is_read',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const isRead: boolean = row.getValue('is_read');
                return (
                    <Badge variant={isRead ? 'secondary' : 'default'}>
                        {isRead ? 'Dibaca' : 'Belum Dibaca'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />,
            cell: ({ row }) => {
                const val: string = row.getValue('created_at');
                return (
                    <span className="whitespace-nowrap text-sm text-muted-foreground">
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
