import type { ArticleResource, CategoryResource } from '@/types';

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
    return null;
};

export default AdminArticlesEdit;
