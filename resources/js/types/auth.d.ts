export type Role = {
    id: number;
    name: string;
    guard_name?: string;
    permissions?: Array<{ id: number; name: string }>;
    permissions_count?: number;
    users_count?: number;
    created_at?: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    is_active: boolean;
    roles: Role[];
    direct_permissions?: Array<{ id: number; name: string }>;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
