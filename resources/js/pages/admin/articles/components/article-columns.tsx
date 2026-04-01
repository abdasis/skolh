import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DataTableColumnHeader,
    DataTableRowActions,
    type RowAction,
} from '@/components/data-table';
import { type ArticleResource } from '@/types';

export const createArticleColumns = (
    onDelete: (article: ArticleResource) => void,
    onEdit: (article: ArticleResource) => void,
): ColumnDef<ArticleResource>[] => {
    const actions: RowAction<ArticleResource>[] = [
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
            accessorKey: 'author',
            header: 'Penulis',
            enableSorting: false,
            cell: ({ row }) => {
                const author = row.original.author;
                return (
                    <span className="text-sm text-muted-foreground">
                        {author?.name ?? '-'}
                    </span>
                );
            },
        },
        {
            accessorKey: 'categories',
            header: 'Kategori',
            enableSorting: false,
            cell: ({ row }) => {
                const categories = row.original.categories;
                if (!categories.length) {
                    return (
                        <span className="text-xs text-muted-foreground italic">
                            Tidak ada
                        </span>
                    );
                }
                return (
                    <div className="flex flex-wrap gap-1">
                        {categories.map((cat) => (
                            <Badge
                                key={cat.id}
                                variant="secondary"
                                className="text-xs"
                            >
                                {cat.name}
                            </Badge>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status: string = row.getValue('status');
                return (
                    <Badge
                        variant={
                            status === 'published' ? 'default' : 'secondary'
                        }
                    >
                        {status === 'published' ? 'Publik' : 'Draft'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'published_at',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Dipublikasikan" />
            ),
            cell: ({ row }) => {
                const val: string | null = row.getValue('published_at');
                if (!val) {
                    return (
                        <span className="text-xs text-muted-foreground italic">
                            Belum
                        </span>
                    );
                }
                return (
                    <span className="text-sm whitespace-nowrap text-muted-foreground">
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
            cell: ({ row }) => (
                <DataTableRowActions row={row.original} actions={actions} />
            ),
        },
    ];
};
