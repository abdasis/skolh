import type { CategoryResource } from './category';

export type AnnouncementStatus = 'published' | 'draft';

export interface AnnouncementStats {
    total: number;
    published: number;
    draft: number;
    with_attachments: number;
}

export interface AnnouncementAttachmentResource {
    id: number;
    path: string;
    original_name: string;
    url: string;
    mime_type: string;
    created_at: string;
}

export interface AnnouncementResource {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string | null;
    status: AnnouncementStatus;
    published_at: string | null;
    expired_at: string | null;
    categories: CategoryResource[];
    attachments: AnnouncementAttachmentResource[];
    created_at: string;
    updated_at: string;
}

export interface AnnouncementCardResource {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    categories: CategoryResource[];
    published_at: string | null;
}
