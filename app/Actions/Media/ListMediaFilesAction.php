<?php

namespace App\Actions\Media;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ListMediaFilesAction
{
    private const SIZE_LIMIT = 1_048_576; // 1 MB

    private const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    private const DOCUMENT_EXTENSIONS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'zip'];

    /**
     * @param  array{search?: string|null, type?: string|null}  $filters
     * @return array<int, array{name: string, path: string, url: string, size: int, mime: string, last_modified: string, is_image: bool, exceeds_limit: bool, optimization_status: string, is_spatie_managed: bool}>
     */
    public function handle(array $filters = []): array
    {
        $disk = Storage::disk('public');
        $spatieFilenames = $this->getSpatieFilenames();
        $optimizationIndex = (new OptimizationIndexService)->all();

        $search = isset($filters['search']) ? trim((string) $filters['search']) : '';
        $type = $filters['type'] ?? 'all';

        return collect($disk->allFiles())
            ->map(fn (string $path) => $this->buildEntry($disk, $path, $spatieFilenames, $optimizationIndex))
            ->filter(fn (array $entry) => $this->matchesType($entry, $type))
            ->filter(fn (array $entry) => $search === '' || stripos($entry['name'], $search) !== false)
            ->sortByDesc('last_modified')
            ->values()
            ->all();
    }

    /**
     * @param  array<string, bool>  $spatieFilenames
     * @param  array<string, array{status: string}>  $optimizationIndex
     * @return array{name: string, path: string, url: string, size: int, mime: string, last_modified: string, is_image: bool, exceeds_limit: bool, optimization_status: string, is_spatie_managed: bool}
     */
    private function buildEntry(
        \Illuminate\Contracts\Filesystem\Filesystem $disk,
        string $path,
        array $spatieFilenames,
        array $optimizationIndex,
    ): array {
        $name = basename($path);
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        $mime = $this->mimeFromExtension($ext);
        $isImage = in_array($ext, self::IMAGE_EXTENSIONS, true);
        $size = $disk->size($path);
        $exceedsLimit = $isImage && $size > self::SIZE_LIMIT;
        $isSpatieManaged = isset($spatieFilenames[$name]);
        $optimizationStatus = $optimizationIndex[$path]['status'] ?? 'none';

        return [
            'name' => $name,
            'path' => $path,
            'url' => $disk->url($path),
            'size' => $size,
            'mime' => $mime,
            'last_modified' => date('c', $disk->lastModified($path)),
            'is_image' => $isImage,
            'exceeds_limit' => $exceedsLimit,
            'optimization_status' => $optimizationStatus,
            'is_spatie_managed' => $isSpatieManaged,
        ];
    }

    private function matchesType(array $entry, ?string $type): bool
    {
        if ($type === null || $type === 'all') {
            return true;
        }

        if ($type === 'images') {
            return $entry['is_image'];
        }

        if ($type === 'documents') {
            $ext = strtolower(pathinfo($entry['path'], PATHINFO_EXTENSION));

            return in_array($ext, self::DOCUMENT_EXTENSIONS, true) && ! $entry['is_image'];
        }

        return true;
    }

    /** @return array<string, bool> */
    private function getSpatieFilenames(): array
    {
        $filenames = DB::table('media')
            ->where('disk', 'public')
            ->pluck('file_name')
            ->all();

        return array_fill_keys($filenames, true);
    }

    private function mimeFromExtension(string $ext): string
    {
        return match ($ext) {
            'jpg', 'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'webp' => 'image/webp',
            'gif' => 'image/gif',
            'pdf' => 'application/pdf',
            'doc' => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls' => 'application/vnd.ms-excel',
            'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'txt' => 'text/plain',
            'zip' => 'application/zip',
            'csv' => 'text/csv',
            default => 'application/octet-stream',
        };
    }
}
