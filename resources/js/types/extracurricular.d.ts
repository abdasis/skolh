export interface ExtracurricularResource {
    id: number;
    title: string;
    slug: string;
    category: string;
    category_label: string;
    day: string;
    day_label: string;
    time: string;
    supervisor: string;
    description: string | null;
    content: string | null;
    featured_image: string | null;
    featured_image_url: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface ExtracurricularStats {
    total: number;
    active: number;
    draft: number;
    by_category: Record<string, number>;
}
