<?php

namespace App\Actions\Media;

use Illuminate\Support\Facades\Storage;

class BulkOptimizeImagesAction
{
    private const SIZE_LIMIT = 1_048_576; // 1 MB

    private const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

    public function __construct(
        private readonly OptimizeImageAction $optimizeImageAction,
    ) {}

    /**
     * @return array{results: array<int, array{path: string, status: string, original_size: int, optimized_size: int, saved: int, message: string|null}>, total_original: int, total_optimized: int, total_saved: int, count_optimized: int, count_skipped: int, count_failed: int}
     */
    public function handle(): array
    {
        $disk = Storage::disk('public');
        $indexService = new OptimizationIndexService;
        $optimizationIndex = $indexService->all();

        $eligiblePaths = collect($disk->allFiles())
            ->filter(function (string $path) use ($disk, $optimizationIndex) {
                $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));

                if (! in_array($ext, self::IMAGE_EXTENSIONS, true)) {
                    return false;
                }

                if ($disk->size($path) <= self::SIZE_LIMIT) {
                    return false;
                }

                // Sertakan jika belum pernah dioptimasi atau status sebelumnya failed
                $status = $optimizationIndex[$path]['status'] ?? 'none';

                return $status !== 'optimized' && $status !== 'cannot_reduce';
            })
            ->values()
            ->all();

        $results = array_map(
            fn (string $path) => $this->optimizeImageAction->handle($path),
            $eligiblePaths,
        );

        return [
            'results' => $results,
            'total_original' => array_sum(array_column($results, 'original_size')),
            'total_optimized' => array_sum(array_column($results, 'optimized_size')),
            'total_saved' => array_sum(array_column($results, 'saved')),
            'count_optimized' => count(array_filter($results, fn ($r) => $r['status'] === 'optimized')),
            'count_skipped' => count(array_filter($results, fn ($r) => $r['status'] === 'skipped')),
            'count_failed' => count(array_filter($results, fn ($r) => $r['status'] === 'failed')),
        ];
    }
}
