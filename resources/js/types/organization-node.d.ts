export interface OrganizationNodeResource {
    id: number;
    position: string;
    name: string | null;
    nip: string | null;
    parent_id: number | null;
    teacher_id: number | null;
    sort_order: number;
    branch_side: 'left' | 'center' | 'right';
    connector_from: 'top' | 'bottom' | 'left' | 'right';
    position_x: number | null;
    position_y: number | null;
    display_name: string | null;
    avatar_url: string | null;
    is_broken_link: boolean;
    created_at: string;
    updated_at: string;
}

export interface OrganizationNodeStats {
    total: number;
    linked: number;
    manual: number;
    broken: number;
}

export interface OrganizationNodeSelectOption {
    id: number;
    position: string;
    parent_id: number | null;
}

export interface TeacherSelectOption {
    value: number;
    label: string;
}
