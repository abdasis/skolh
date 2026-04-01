import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as CategoryController from '@/actions/App/Http/Controllers/Admin/CategoryController';
import { CategoryForm, type CategoryFormData } from './components/category-form';
import { type CategoryResource } from '@/types';

interface Props {
    category: CategoryResource;
}

const AdminCategoriesEdit = ({ category }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Kategori', href: CategoryController.index.url() },
            { title: 'Edit Kategori' },
        ],
    });

    const form = useForm<CategoryFormData & { _method: string }>({
        _method: 'PUT',
        name: category.name,
        description: category.description ?? '',
    });

    return (
        <>
            <Head title="Edit Kategori" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Kategori</h1>
                    <p className="text-sm text-muted-foreground">Ubah data kategori.</p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <CategoryForm
                                form={form}
                                url={CategoryController.update.url({ category: category.id })}
                                submitLabel="Simpan Perubahan"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminCategoriesEdit;

