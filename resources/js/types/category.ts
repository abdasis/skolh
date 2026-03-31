export interface CategoryStats {
    total: number;
}

export interface CategoryResource {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}
