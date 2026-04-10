<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Media\CleanupChunksAction;
use App\Actions\Media\ListMediaFilesAction;
use App\Actions\Media\MergeChunksAction;
use App\Actions\Media\StoreChunkAction;
use App\Actions\Media\UploadMediaAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\IndexMediaRequest;
use App\Http\Requests\Admin\UploadChunkRequest;
use App\Http\Requests\Admin\UploadMediaRequest;
use Illuminate\Http\JsonResponse;

class MediaController extends Controller
{
    public function __construct(
        private readonly ListMediaFilesAction $listAction,
        private readonly UploadMediaAction $uploadAction,
        private readonly StoreChunkAction $storeChunkAction,
        private readonly MergeChunksAction $mergeChunksAction,
        private readonly CleanupChunksAction $cleanupChunksAction,
    ) {}

    public function index(IndexMediaRequest $request): JsonResponse
    {
        $files = $this->listAction->handle();

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
}
