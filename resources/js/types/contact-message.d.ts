export interface ContactMessageResource {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export interface ContactMessageStats {
    total: number;
    unread: number;
    this_month: number;
    this_year: number;
}
