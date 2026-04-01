export type CurriculumStatus = 'active' | 'draft';

export interface CurriculumStats {
    total: number;
    active: number;
    draft: number;
    with_document: number;
}

export interface CurriculumResource {
    id: number;
    name: string;
    code: string;
    year: number;
    level: string;
    slug: string;
    description: string;
    content: string | null;
    icon: string;
    status: CurriculumStatus;
    effective_date: string;
    expired_date: string | null;
    document: string | null;
    document_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface CurriculumCardResource {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
}
