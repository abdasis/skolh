import { useState } from 'react';
import { Head, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import * as CategoryController from '@/actions/App/Http/Controllers/Admin/CategoryController';
import { createCategoryColumns } from './components/category-columns';
import { CategoryStatsCards } from './components/category-stats-cards';
import { CategoryFormDialog } from './components/category-form-dialog';
import { type CategoryResource, type CategoryStats } from '@/types';

interface Props {
    categories: CategoryResource[];
    stats: CategoryStats;
}

const AdminCategoriesIndex = ({ categories, stats }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Kategori', href: CategoryController.index.url() },
        ],
    });

    const [categoryToDelete, setCategoryToDelete] = useState<CategoryResource | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<CategoryResource | null>(null);

    const handleDeleteConfirm = () => {
        if (!categoryToDelete) {
            return;
        }
        router.delete(CategoryController.destroy.url({ category: categoryToDelete.id }), {
            preserveScroll: true,
            onFinish: () => setCategoryToDelete(null),
        });
    };

    const handleEdit = (category: CategoryResource) => {
        setCategoryToEdit(category);
        setDialogOpen(true);
    };

    const handleCreate = () => {
        setCategoryToEdit(null);
        setDialogOpen(true);
    };

    const handleDialogOpenChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) {
            setCategoryToEdit(null);
        }
    };

    const columns = createCategoryColumns(setCategoryToDelete, handleEdit);

    return (
        <>
            <Head title="Manajemen Kategori" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Kategori</h1>
                        <p className="text-sm text-muted-foreground">Kelola kategori pengumuman.</p>
                    </div>
                    <Button onClick={handleCreate}>Tambah Kategori</Button>
                </div>

                <CategoryStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={categories}
                        searchPlaceholder="Cari kategori..."
                        title="Daftar Kategori"
                        description="Semua kategori yang tersedia untuk pengumuman."
                    />
                </div>
            </div>

            <CategoryFormDialog
                open={dialogOpen}
                onOpenChange={handleDialogOpenChange}
                category={categoryToEdit}
            />

            <ConfirmationDelete
                open={categoryToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setCategoryToDelete(null);
                    }
                }}
                onConfirm={handleDeleteConfirm}
                title="Hapus Kategori"
                itemName={categoryToDelete?.name}
                description={
                    categoryToDelete
                        ? `Kategori "${categoryToDelete.name}" akan dihapus secara permanen. Kategori yang masih digunakan tidak dapat dihapus.`
                        : undefined
                }
            />
        </>
    );
};

export default AdminCategoriesIndex;
