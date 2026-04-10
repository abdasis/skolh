<?php

namespace App\Actions\Media;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class MergeChunksAction
{
    public function __construct(
        private readonly UploadMediaAction $uploadAction,
    ) {}

    /**
     * Gabungkan semua chunk menjadi satu file dan simpan ke public disk.
     *
     * @return array{path: string, url: string}
     */
    public function handle(string $uploadId, int $totalChunks, string $folder, string $originalName): array
    {
        $this->validateAllChunksPresent($uploadId, $totalChunks);

        $mergedPath = $this->mergeFiles($uploadId, $totalChunks);
        $uploadedFile = $this->buildUploadedFile($mergedPath, $originalName);

        $this->validateMergedFile($uploadedFile);

        return $this->uploadAction->handle($uploadedFile, $folder);
    }

    private function validateAllChunksPresent(string $uploadId, int $totalChunks): void
    {
        for ($i = 0; $i < $totalChunks; $i++) {
            if (! Storage::disk('local')->exists("chunks/{$uploadId}/{$i}.part")) {
                throw ValidationException::withMessages([
                    'chunk' => ["Chunk {$i} tidak ditemukan untuk upload {$uploadId}."],
                ]);
            }
        }
    }

    private function mergeFiles(string $uploadId, int $totalChunks): string
    {
        $disk = Storage::disk('local');
        $mergedPath = $disk->path("chunks/{$uploadId}/merged");
        $handle = fopen($mergedPath, 'wb');

        for ($i = 0; $i < $totalChunks; $i++) {
            $chunkPath = $disk->path("chunks/{$uploadId}/{$i}.part");
            $chunkHandle = fopen($chunkPath, 'rb');
            stream_copy_to_stream($chunkHandle, $handle);
            fclose($chunkHandle);
        }

        fclose($handle);

        return $mergedPath;
    }

    private function buildUploadedFile(string $mergedPath, string $originalName): UploadedFile
    {
        return new UploadedFile(
            path: $mergedPath,
            originalName: $originalName,
            test: true,
        );
    }

    private function validateMergedFile(UploadedFile $file): void
    {
        $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
        $maxSize = 4 * 1024 * 1024;

        if (! in_array($file->getMimeType(), $allowedMimes, true)) {
            throw ValidationException::withMessages([
                'file' => ['File harus berformat JPG, PNG, atau WEBP.'],
            ]);
        }

        if ($file->getSize() > $maxSize) {
            throw ValidationException::withMessages([
                'file' => ['Ukuran file tidak boleh lebih dari 4MB.'],
            ]);
        }
    }
}
