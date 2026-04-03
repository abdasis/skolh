export interface AlumniSocial {
    id: number;
    platform: string;
    url: string;
}

export interface Alumni {
    id: number;
    name: string;
    batch: string;
    destination: string;
    quote: string;
    avatar_url: string | null;
    sort_order: number;
    socials: AlumniSocial[];
    created_at: string;
    updated_at: string;
}
