import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as ArticleController from '@/actions/App/Http/Controllers/Admin/ArticleController';
import { ArticleForm, type ArticleFormData } from './components/article-form';
import { type ArticleResource, type CategoryResource } from '@/types';

interface UserOption {
    id: number;
    name: string;
}

interface Props {
    article: ArticleResource;
    users: UserOption[];
    categories: CategoryResource[];
}

const AdminArticlesEdit = ({ article, users, categories }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Artikel', href: ArticleController.index.url() },
            { title: 'Edit Artikel' },
        ],
    });

    const form = useForm<ArticleFormData>({
        _method: 'PUT',
        title: article.title,
        user_id: article.author.id,
        excerpt: article.excerpt ?? '',
        content: article.content ?? '',
        featured_image: null,
        status: article.status,
        published_at: article.published_at ?? '',
        category_ids: article.categories.map((c) => c.id),
        meta_title: article.seo?.meta_title ?? '',
        meta_description: article.seo?.meta_description ?? '',
        meta_keywords: article.seo?.meta_keywords ?? '',
        og_image: null,
    });

    return (
        <>
            <Head title="Edit Artikel" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Artikel</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah data artikel.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <ArticleForm
                                form={form}
                                url={ArticleController.update.url({
                                    article: article.id,
                                })}
                                cancelUrl={ArticleController.index.url()}
                                users={users}
                                categories={categories}
                                article={article}
                                submitLabel="Simpan Perubahan"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminArticlesEdit;
