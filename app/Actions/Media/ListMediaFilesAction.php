<?php

namespace App\Actions\Media;

use Illuminate\Support\Facades\Storage;

class ListMediaFilesAction
{
    /**
     * Mengembalikan semua gambar dari seluruh public storage secara rekursif.
     *
     * @return array<int, array{name: string, path: string, url: string, size: int, last_modified: string}>
     */
    public function handle(): array
    {
        $disk = Storage::disk('public');

        $files = $disk->allFiles();

        return collect($files)
            ->filter(fn (string $path) => $this->isImage($path))
            ->map(fn (string $path) => [
                'name' => basename($path),
                'path' => $path,
                'url' => $disk->url($path),
                'size' => $disk->size($path),
                'last_modified' => date('c', $disk->lastModified($path)),
            ])
            ->sortByDesc('last_modified')
            ->values()
            ->all();
    }

    private function isImage(string $path): bool
    {
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));

        return in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif'], true);
    }
}
