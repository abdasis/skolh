export interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    highlight: string;
    sort_order: number;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}
