import { type ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { DataTableColumnHeader, DataTableRowActions, type RowAction } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { type Registration } from '@/types';

const STATUS_LABELS: Record<string, string> = {
    pending: 'Menunggu',
    verified: 'Terverifikasi',
    accepted: 'Diterima',
    rejected: 'Ditolak',
};

const STATUS_VARIANTS: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    pending: 'secondary',
    verified: 'default',
    accepted: 'default',
    rejected: 'destructive',
};

export const createRegistrationColumns = (
    onView: (registration: Registration) => void,
): ColumnDef<Registration>[] => {
    const actions: RowAction<Registration>[] = [
        {
            label: 'Lihat Detail',
            icon: <Eye />,
            onClick: onView,
        },
    ];

    return [
        {
            accessorKey: 'registration_number',
            header: ({ column }) => <DataTableColumnHeader column={column} title="No. Pendaftaran" />,
            cell: ({ row }) => (
                <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {row.original.registration_number}
                </span>
            ),
        },
        {
            accessorKey: 'full_name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Lengkap" />,
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => (
                <Badge variant={STATUS_VARIANTS[row.original.status] ?? 'outline'}>
                    {STATUS_LABELS[row.original.status] ?? row.original.status}
                </Badge>
            ),
        },
        {
            accessorKey: 'gender',
            header: 'JK',
            cell: ({ row }) => row.original.gender === 'L' ? 'L' : 'P',
        },
        {
            accessorKey: 'address_city',
            header: 'Kota',
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Daftar" />,
            cell: ({ row }) => {
                const date = row.original.created_at;
                return date ? new Date(date).toLocaleDateString('id-ID') : '-';
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => <DataTableRowActions row={row.original} actions={actions} />,
        },
    ];
};
