export type Theme = {
    name: string;
    slug: string;
    version: string;
    author: string;
    description: string;
    preview: string | null;
    isActive: boolean;
    isValid: boolean;
    missingPages: string[];
};
