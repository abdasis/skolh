export interface AchievementResource {
    id: number;
    title: string;
    description: string;
    category: string;
    category_label: string;
    level: string;
    level_label: string;
    year: number;
    attachment: string | null;
    created_at: string;
    updated_at: string;
}

export interface AchievementStats {
    total: number;
    by_level: {
        district: number;
        province: number;
        national: number;
        international: number;
    };
}
