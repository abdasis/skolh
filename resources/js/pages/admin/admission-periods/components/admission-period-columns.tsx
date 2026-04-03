import { type ColumnDef } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader, DataTableRowActions, type RowAction } from '@/components/data-table';
import { type AdmissionPeriod } from '@/types';

const statusBadge = (period: AdmissionPeriod) => {
    if (period.is_open) return <Badge variant="default">Buka</Badge>;
    if (period.is_active) return <Badge variant="secondary">Aktif</Badge>;
    return <Badge variant="outline">Nonaktif</Badge>;
};

export const createAdmissionPeriodColumns = (
    onEdit: (period: AdmissionPeriod) => void,
): ColumnDef<AdmissionPeriod>[] => {
    const actions: RowAction<AdmissionPeriod>[] = [
        {
            label: 'Edit',
            icon: <Pencil />,
            onClick: onEdit,
        },
    ];

    return [
        {
            accessorKey: 'academic_year',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tahun Ajaran" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">{row.getValue('academic_year')}</span>
            ),
        },
        {
            accessorKey: 'start_date',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tanggal Buka" />
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">{row.getValue('start_date')}</span>
            ),
        },
        {
            accessorKey: 'end_date',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tanggal Tutup" />
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">{row.getValue('end_date')}</span>
            ),
        },
        {
            accessorKey: 'description',
            header: 'Keterangan',
            enableSorting: false,
            cell: ({ row }) => {
                const desc = row.getValue<string | null>('description');
                return (
                    <span className="text-sm text-muted-foreground">
                        {desc ?? <span className="italic opacity-50">-</span>}
                    </span>
                );
            },
        },
        {
            id: 'status',
            header: 'Status',
            enableSorting: false,
            cell: ({ row }) => statusBadge(row.original),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DataTableRowActions row={row.original} actions={actions} />
            ),
        },
    ];
};
