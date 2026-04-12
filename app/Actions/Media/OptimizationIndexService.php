<?php

namespace App\Actions\Media;

use Illuminate\Support\Facades\Storage;

class OptimizationIndexService
{
    private const INDEX_PATH = 'media-optimization-index.json';

    /**
     * @return array{status: string, original_size: int, optimized_size: int, optimized_at: string}|null
     */
    public function getEntry(string $path): ?array
    {
        $index = $this->all();

        return $index[$path] ?? null;
    }

    /**
     * @param  array{status: string, original_size: int, optimized_size: int, optimized_at: string}  $data
     */
    public function setEntry(string $path, array $data): void
    {
        $disk = Storage::disk('local');
        $fullPath = $disk->path(self::INDEX_PATH);

        /** @var resource $handle */
        $handle = fopen($fullPath, 'c+');

        try {
            flock($handle, LOCK_EX);
            $contents = stream_get_contents($handle);
            $index = $contents ? json_decode($contents, associative: true) : [];
            $index[$path] = $data;

            ftruncate($handle, 0);
            rewind($handle);
            fwrite($handle, json_encode($index, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
    }

    /**
     * @return array<string, array{status: string, original_size: int, optimized_size: int, optimized_at: string}>
     */
    public function all(): array
    {
        $disk = Storage::disk('local');

        if (! $disk->exists(self::INDEX_PATH)) {
            return [];
        }

        $contents = $disk->get(self::INDEX_PATH);

        return $contents ? (json_decode($contents, associative: true) ?? []) : [];
    }

    public function removeEntry(string $path): void
    {
        $disk = Storage::disk('local');

        if (! $disk->exists(self::INDEX_PATH)) {
            return;
        }

        $fullPath = $disk->path(self::INDEX_PATH);

        /** @var resource $handle */
        $handle = fopen($fullPath, 'c+');

        try {
            flock($handle, LOCK_EX);
            $contents = stream_get_contents($handle);
            $index = $contents ? json_decode($contents, associative: true) : [];
            unset($index[$path]);

            ftruncate($handle, 0);
            rewind($handle);
            fwrite($handle, json_encode($index, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
    }
}
