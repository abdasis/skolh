import { type ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader, DataTableRowActions, type RowAction } from '@/components/data-table';
import { type Report } from '@/types';

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    new: 'default',
    in_progress: 'secondary',
    resolved: 'outline',
    rejected: 'destructive',
};

export const createReportColumns = (
    onView: (report: Report) => void,
): ColumnDef<Report>[] => {
    const actions: RowAction<Report>[] = [
        {
            label: 'Lihat Detail',
            icon: <Eye />,
            onClick: onView,
        },
    ];

    return [
        {
            accessorKey: 'reference_code',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Kode" />,
            cell: ({ row }) => (
                <span className="font-mono text-xs font-semibold tracking-widest">
                    {row.getValue('reference_code')}
                </span>
            ),
        },
        {
            accessorKey: 'category_label',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori" />,
            cell: ({ row }) => <span className="text-sm">{row.getValue('category_label')}</span>,
        },
        {
            accessorKey: 'subject',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Subjek" />,
            cell: ({ row }) => (
                <span className="text-sm line-clamp-1 max-w-60">{row.getValue('subject')}</span>
            ),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status: string = row.getValue('status');
                const label = row.original.status_label;
                return (
                    <Badge variant={STATUS_VARIANT[status] ?? 'secondary'}>{label}</Badge>
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
                        {new Date(val).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}
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
