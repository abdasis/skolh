<?php

namespace App\Actions\Media;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadMediaAction
{
    /**
     * @return array{path: string, url: string}
     */
    public function handle(UploadedFile $file, string $folder): array
    {
        $path = $file->store($folder, 'public');

        return [
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
        ];
    }
}
