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
    file_name: string;
    file_path: string;
    file_url: string;
    mime_type: string | null;
    file_size: number | null;
    created_at: string;
}

export interface AnnouncementResource {
    id: number;
    title: string;
    slug: string;
    content: string;
    status: AnnouncementStatus;
    published_at: string | null;
    expired_at: string | null;
    categories: CategoryResource[];
    attachments: AnnouncementAttachmentResource[];
    created_at: string;
    updated_at: string;
}
