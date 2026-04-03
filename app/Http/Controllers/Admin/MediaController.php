<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Media\ListMediaFilesAction;
use App\Actions\Media\UploadMediaAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\IndexMediaRequest;
use App\Http\Requests\Admin\UploadMediaRequest;
use Illuminate\Http\JsonResponse;

class MediaController extends Controller
{
    public function __construct(
        private readonly ListMediaFilesAction $listAction,
        private readonly UploadMediaAction $uploadAction,
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
}
