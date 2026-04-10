<?php

namespace App\Actions\Media;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class StoreChunkAction
{
    public function handle(UploadedFile $chunk, string $uploadId, int $chunkIndex): void
    {
        $directory = "chunks/{$uploadId}";
        if (! Storage::disk('local')->exists($directory)) {
            Storage::disk('local')->makeDirectory($directory);
        }

        Storage::disk('local')->put(
            "{$directory}/{$chunkIndex}.part",
            $chunk->getContent(),
        );
    }
}
