import type { CategoryResource } from './category';
import type { SeoMetaResource } from './seo';

export type ArticleStatus = 'published' | 'draft';

export interface ArticleStats {
    total: number;
    published: number;
    draft: number;
    with_image: number;
}

export interface ArticleResource {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    featured_image: string | null;
    featured_image_url: string | null;
    status: ArticleStatus;
    published_at: string | null;
    author: {
        id: number;
        name: string;
    };
    categories: CategoryResource[];
    seo: SeoMetaResource | null;
    created_at: string;
    updated_at: string;
}
