import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import type { DataTableFilter } from '@/components/data-table';
import * as ArticleController from '@/actions/App/Http/Controllers/Admin/ArticleController';
import { createArticleColumns } from './components/article-columns';
import { ArticleStatsCards } from './components/article-stats-cards';
import { type ArticleResource, type ArticleStats } from '@/types';

interface Props {
    articles: ArticleResource[];
    stats?: ArticleStats;
    filters: { status?: string; category_id?: string };
    categories: Array<{ id: number; name: string }>;
}

const AdminArticlesIndex = ({
    articles,
    stats,
    filters,
    categories,
}: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Artikel', href: ArticleController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<ArticleResource | null>(null);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(ArticleController.destroy.url({ article: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = (article: ArticleResource) => {
        router.visit(ArticleController.edit.url({ article: article.id }));
    };

    const columns = createArticleColumns(setToDelete, handleEdit);

    const tableFilters: DataTableFilter[] = [
        {
            type: 'select',
            key: 'status',
            label: 'Status',
            options: [
                { value: 'published', label: 'Dipublikasikan' },
                { value: 'draft', label: 'Draft' },
            ],
        },
        {
            type: 'select',
            key: 'category_id',
            label: 'Kategori',
            options: (categories ?? []).map((c) => ({
                value: String(c.id),
                label: c.name,
            })),
        },
    ];

    return (
        <>
            <Head title="Manajemen Artikel" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Manajemen Artikel
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola artikel sekolah.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={ArticleController.create.url()}>
                            Tambah Artikel
                        </Link>
                    </Button>
                </div>

                <ArticleStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={articles}
                        searchPlaceholder="Cari artikel..."
                        filters={tableFilters}
                        filterValues={
                            filters as Record<string, string | undefined>
                        }
                        filterUrl={ArticleController.index.url()}
                    />
                </div>
            </div>

            <ConfirmationDelete
                open={toDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setToDelete(null);
                    }
                }}
                onConfirm={handleDeleteConfirm}
                title="Hapus Artikel"
                itemName={toDelete?.title}
            />
        </>
    );
};

export default AdminArticlesIndex;
