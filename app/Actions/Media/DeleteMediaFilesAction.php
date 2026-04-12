<?php

namespace App\Actions\Media;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DeleteMediaFilesAction
{
    /**
     * @param  array<int, string>  $paths
     * @return array{deleted: array<int, string>, skipped: array<int, array{path: string, reason: string}>}
     */
    public function handle(array $paths): array
    {
        $disk = Storage::disk('public');
        $spatieFilenames = $this->getSpatieFilenames();
        $indexService = new OptimizationIndexService;

        $deleted = [];
        $skipped = [];

        foreach ($paths as $path) {
            $basename = basename($path);

            if (isset($spatieFilenames[$basename])) {
                $skipped[] = ['path' => $path, 'reason' => 'File dikelola oleh model'];
                continue;
            }

            if (! $disk->exists($path)) {
                $skipped[] = ['path' => $path, 'reason' => 'File tidak ditemukan'];
                continue;
            }

            $disk->delete($path);
            $indexService->removeEntry($path);
            $deleted[] = $path;
        }

        return ['deleted' => $deleted, 'skipped' => $skipped];
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
}
