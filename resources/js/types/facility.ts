export type FacilityStatus = 'public' | 'draft';

export interface FacilityStats {
    total: number;
    public: number;
    draft: number;
    with_image: number;
}

export interface FacilityResource {
    id: number;
    icon: string;
    title: string;
    slug: string;
    description: string;
    content: string | null;
    featured_image: string | null;
    status: FacilityStatus;
    created_at: string;
    updated_at: string;
}
