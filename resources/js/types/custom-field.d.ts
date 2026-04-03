export type CustomFieldType = 'text' | 'number' | 'select' | 'textarea' | 'date' | 'file';

export type CustomField = {
    id: number;
    admission_period_id: number;
    label: string;
    type: CustomFieldType;
    placeholder: string | null;
    is_required: boolean;
    sort_order: number;
    options: string[] | null;
    created_at: string;
    updated_at: string;
};
