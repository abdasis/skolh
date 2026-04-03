export type AdmissionPeriod = {
    id: number;
    academic_year: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    is_open: boolean;
    description: string | null;
    created_at: string;
    updated_at: string;
};
