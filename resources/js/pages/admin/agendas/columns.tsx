import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/data-table';
import { DataTableRowActions, type RowAction } from '@/components/data-table';

export interface AgendaResource {
    id: number;
    date: string;
    title: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function createAgendaColumns(
    onDelete: (agenda: AgendaResource) => void,
    onEdit: (agenda: AgendaResource) => void,
): ColumnDef<AgendaResource>[] {
    const actions: RowAction<AgendaResource>[] = [
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
            accessorKey: 'date',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />,
            cell: ({ row }) => (
                <span className="whitespace-nowrap font-medium">
                    {formatDate(row.getValue('date'))}
                </span>
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
                const desc: string | null = row.getValue('description');
                if (!desc) {
                    return <span className="italic opacity-50">—</span>;
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
            cell: ({ row }) => (
                <DataTableRowActions row={row.original} actions={actions} />
            ),
        },
    ];
}
