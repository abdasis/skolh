// T016 [US1]: Added is_active and roles fields
export type Role = {
    id: number;
    name: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    is_active: boolean;
    roles: Role[];
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
