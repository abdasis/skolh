export interface CategoryStats {
    total: number;
    in_use: number;
}

export interface CategoryResource {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}
