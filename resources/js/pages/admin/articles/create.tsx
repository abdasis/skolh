import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as ArticleController from '@/actions/App/Http/Controllers/Admin/ArticleController';
import { ArticleForm, type ArticleFormData } from './components/article-form';
import { type CategoryResource } from '@/types';

interface UserOption {
    id: number;
    name: string;
}

interface Props {
    users: UserOption[];
    categories: CategoryResource[];
}

const AdminArticlesCreate = ({ users, categories }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Artikel', href: ArticleController.index.url() },
            { title: 'Tambah Artikel', href: ArticleController.create.url() },
        ],
    });

    const form = useForm<ArticleFormData>({
        title: '',
        user_id: '',
        excerpt: '',
        content: '',
        featured_image: null,
        status: 'draft',
        published_at: '',
        category_ids: [],
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        og_image: null,
    });

    return (
        <>
            <Head title="Tambah Artikel" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Artikel</h1>
                    <p className="text-sm text-muted-foreground">
                        Buat artikel baru.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <ArticleForm
                                form={form}
                                url={ArticleController.store.url()}
                                cancelUrl={ArticleController.index.url()}
                                users={users}
                                categories={categories}
                                submitLabel="Buat Artikel"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminArticlesCreate;
