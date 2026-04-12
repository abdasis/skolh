<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Media\CleanupChunksAction;
use App\Actions\Media\DeleteMediaFilesAction;
use App\Actions\Media\ListMediaFilesAction;
use App\Actions\Media\MergeChunksAction;
use App\Actions\Media\OptimizeImageAction;
use App\Actions\Media\BulkOptimizeImagesAction;
use App\Actions\Media\StoreChunkAction;
use App\Actions\Media\UploadMediaAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyMediaRequest;
use App\Http\Requests\Admin\IndexMediaRequest;
use App\Http\Requests\Admin\OptimizeMediaRequest;
use App\Http\Requests\Admin\UploadChunkRequest;
use App\Http\Requests\Admin\UploadMediaRequest;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function __construct(
        private readonly ListMediaFilesAction $listAction,
        private readonly UploadMediaAction $uploadAction,
        private readonly StoreChunkAction $storeChunkAction,
        private readonly MergeChunksAction $mergeChunksAction,
        private readonly CleanupChunksAction $cleanupChunksAction,
        private readonly DeleteMediaFilesAction $deleteAction,
        private readonly OptimizeImageAction $optimizeImageAction,
        private readonly BulkOptimizeImagesAction $bulkOptimizeAction,
    ) {}

    public function index(IndexMediaRequest $request): Response
    {
        $filters = $request->only(['search', 'type']);
        $files = $this->listAction->handle($filters);

        return Inertia::render('admin/media/index', [
            'files' => $files,
            'filters' => [
                'search' => $request->query('search', ''),
                'type' => $request->query('type', 'all'),
            ],
        ]);
    }

    public function listFiles(): JsonResponse
    {
        $files = $this->listAction->handle(['type' => 'images']);

        return response()->json(['data' => $files]);
    }

    public function store(UploadMediaRequest $request): JsonResponse
    {
        $result = $this->uploadAction->handle(
            $request->file('file'),
            $request->validated('folder'),
        );

        return response()->json($result, 201);
    }

    public function uploadChunk(UploadChunkRequest $request): JsonResponse
    {
        $uploadId = $request->validated('upload_id');
        $chunkIndex = (int) $request->validated('chunk_index');
        $totalChunks = (int) $request->validated('total_chunks');
        $folder = $request->validated('folder');
        $originalName = $request->validated('original_name');

        $this->storeChunkAction->handle($request->file('chunk'), $uploadId, $chunkIndex);

        if ($chunkIndex < $totalChunks - 1) {
            return response()->json(['status' => 'partial'], 202);
        }

        try {
            $result = $this->mergeChunksAction->handle($uploadId, $totalChunks, $folder, $originalName);
        } finally {
            $this->cleanupChunksAction->handle($uploadId);
        }

        return response()->json($result, 201);
    }

    public function bulkDestroy(BulkDestroyMediaRequest $request): JsonResponse
    {
        $paths = $request->validated('paths');
        $result = $this->deleteAction->handle($paths);

        return response()->json($result);
    }

    public function optimize(OptimizeMediaRequest $request): JsonResponse
    {
        $paths = $request->validated('paths');
        $results = array_map(fn (string $path) => $this->optimizeImageAction->handle($path), $paths);

        return response()->json($this->buildBulkResult($results));
    }

    public function optimizeAll(): JsonResponse
    {
        $result = $this->bulkOptimizeAction->handle();

        return response()->json($result);
    }

    /**
     * @param  array<int, array{path: string, status: string, original_size: int, optimized_size: int, saved: int, message: string|null}>  $results
     * @return array{results: array<int, mixed>, total_original: int, total_optimized: int, total_saved: int, count_optimized: int, count_skipped: int, count_failed: int}
     */
    private function buildBulkResult(array $results): array
    {
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
