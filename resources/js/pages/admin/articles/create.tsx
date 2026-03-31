import type { CategoryResource } from '@/types';

interface UserOption {
    id: number;
    name: string;
}

interface Props {
    users: UserOption[];
    categories: CategoryResource[];
}

const AdminArticlesCreate = ({ users, categories }: Props) => {
    return null;
};

export default AdminArticlesCreate;
