import { Head, useForm } from '@inertiajs/react';
import * as CategoryController from '@/actions/App/Http/Controllers/Admin/CategoryController';
import { CategoryForm, type CategoryFormData } from './components/category-form';

const AdminCategoriesCreate = () => {
    const form = useForm<CategoryFormData>({
        name: '',
        description: '',
    });

    return (
        <>
            <Head title="Tambah Kategori" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Kategori</h1>
                    <p className="text-sm text-muted-foreground">Buat kategori baru.</p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <CategoryForm
                                form={form}
                                url={CategoryController.store.url()}
                                submitLabel="Buat Kategori"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminCategoriesCreate;

AdminCategoriesCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kategori', href: CategoryController.index.url() },
        { title: 'Tambah Kategori', href: CategoryController.create.url() },
    ],
};
