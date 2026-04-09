export type MajorStatus = 'public' | 'draft';

export interface MajorCardResource {
    id: number;
    title: string;
    slug: string;
    description: string;
    featured_image_url: string | null;
}

export interface MajorResource {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string | null;
    featured_image: string | null;
    featured_image_url: string | null;
    status: MajorStatus;
    created_at: string;
    updated_at: string;
}

export interface MajorFormData {
    title: string;
    description: string;
    content: string;
    featured_image: string | null;
    status: string;
}

export interface MajorStats {
    total: number;
    public: number;
    draft: number;
    with_image: number;
}
