import type { ArticleResource, CategoryResource } from '@/types';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface PaginatedArticles {
    data: ArticleResource[];
    links: PaginationLink[];
    meta: PaginationMeta;
}

interface Props {
    articles: PaginatedArticles;
    categories: CategoryResource[];
    selectedCategory: string | null;
}

const ArticlesIndex = (_props: Props) => {
    return null;
};

export default ArticlesIndex;
