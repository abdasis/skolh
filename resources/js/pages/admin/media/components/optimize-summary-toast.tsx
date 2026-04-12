import { toast } from 'sonner';
import type { BulkOptimizeResult } from '@/types';

const formatSize = (bytes: number): string => {
    if (bytes < 1_048_576) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / 1_048_576).toFixed(1)} MB`;
};

export const showOptimizeSummaryToast = (result: BulkOptimizeResult): void => {
    const { count_optimized, count_skipped, count_failed, total_saved } = result;

    if (count_failed > 0 && count_optimized === 0) {
        toast.error(`Optimasi gagal untuk ${count_failed} file`);
        return;
    }

    const parts: string[] = [];

    if (count_optimized > 0) {
        parts.push(`${count_optimized} file dioptimasi`);
    }
    if (total_saved > 0) {
        parts.push(`hemat ${formatSize(total_saved)}`);
    }
    if (count_skipped > 0) {
        parts.push(`${count_skipped} dilewati`);
    }
    if (count_failed > 0) {
        parts.push(`${count_failed} gagal`);
    }

    const message = parts.join(', ');

    if (count_failed > 0) {
        toast.warning(`Optimasi selesai: ${message}`);
    } else {
        toast.success(`Optimasi selesai: ${message}`);
    }
};
