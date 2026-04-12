export interface MediaFileResource {
    name: string;
    path: string;
    url: string;
    size: number;
    last_modified: string;
}

export type ImagePickerMode = 'single' | 'multiple';

export type OptimizationStatus = 'none' | 'optimized' | 'cannot_reduce' | 'failed';

export interface MediaFile {
    name: string;
    path: string;
    url: string;
    size: number;
    mime: string;
    last_modified: string;
    is_image: boolean;
    exceeds_limit: boolean;
    optimization_status: OptimizationStatus;
    is_spatie_managed: boolean;
}

export interface OptimizeResult {
    path: string;
    status: 'optimized' | 'cannot_reduce' | 'skipped' | 'failed';
    original_size: number;
    optimized_size: number;
    saved: number;
    message: string | null;
}

export interface BulkOptimizeResult {
    results: OptimizeResult[];
    total_original: number;
    total_optimized: number;
    total_saved: number;
    count_optimized: number;
    count_skipped: number;
    count_failed: number;
}
