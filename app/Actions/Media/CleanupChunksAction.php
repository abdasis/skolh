<?php

namespace App\Actions\Media;

use Illuminate\Support\Facades\Storage;

class CleanupChunksAction
{
    public function handle(string $uploadId): void
    {
        Storage::disk('local')->deleteDirectory("chunks/{$uploadId}");
    }
}
