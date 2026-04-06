export type ReportStatus = 'new' | 'in_progress' | 'resolved' | 'rejected';
export type ReportCategory =
    | 'facilities'
    | 'teaching_quality'
    | 'administration'
    | 'safety'
    | 'other';

export type ReportStatusHistory = {
    id: number;
    status: ReportStatus;
    status_label: string;
    note: string | null;
    changed_by_name: string;
    created_at: string;
};

export type Report = {
    id: number;
    reference_code: string;
    category: ReportCategory;
    category_label: string;
    subject: string;
    message: string;
    reporter_name: string | null;
    reporter_contact: string | null;
    status: ReportStatus;
    status_label: string;
    created_at: string;
    updated_at: string;
    status_histories: ReportStatusHistory[];
};

export type ReportStats = {
    total: number;
    new: number;
    in_progress: number;
    resolved: number;
    rejected: number;
    by_category: Record<ReportCategory, number>;
};
