export interface TeacherSocial {
    id: number;
    platform: string;
    url: string;
}

export interface TeacherResource {
    id: number;
    name: string;
    nip: string;
    email: string;
    phone: string | null;
    address: string | null;
    subject: string | null;
    gender: string | null;
    gender_label: string | null;
    date_of_birth: string | null;
    joined_at: string | null;
    status: string;
    status_label: string;
    avatar_url: string | null;
    socials: TeacherSocial[];
    created_at: string;
    updated_at: string;
}

export interface TeacherStats {
    total: number;
    active: number;
    inactive: number;
}
