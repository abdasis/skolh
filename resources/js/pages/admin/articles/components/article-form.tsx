import type { ArticleResource, ArticleStatus, CategoryResource } from '@/types';

interface UserOption {
    id: number;
    name: string;
}

export interface ArticleFormData {
    title: string;
    user_id: number | string;
    excerpt: string;
    content: string;
    featured_image: File | null;
    status: ArticleStatus;
    published_at: string;
    category_ids: number[];
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    og_image: File | null;
}

interface Props {
    users: UserOption[];
    categories: CategoryResource[];
    article?: ArticleResource;
}

const ArticleForm = (_props: Props) => {
    return null;
};

export default ArticleForm;
