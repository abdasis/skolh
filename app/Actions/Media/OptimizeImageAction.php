<?php

namespace App\Actions\Media;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Image;
use Throwable;

class OptimizeImageAction
{
    private const SIZE_LIMIT = 1_048_576; // 1 MB

    private const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

    private const QUALITY_FIRST_PASS = 75;

    private const QUALITY_SECOND_PASS = 60;

    /**
     * @return array{path: string, status: string, original_size: int, optimized_size: int, saved: int, message: string|null}
     */
    public function handle(string $path): array
    {
        $disk = Storage::disk('public');
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));

        if (! in_array($ext, self::IMAGE_EXTENSIONS, true)) {
            return $this->result($path, 'skipped', 0, 0, 'Bukan file gambar yang didukung');
        }

        if ($this->isSpatieManaged($path)) {
            return $this->result($path, 'skipped', 0, 0, 'File dikelola oleh model');
        }

        if (! $disk->exists($path)) {
            return $this->result($path, 'failed', 0, 0, 'File tidak ditemukan');
        }

        $absolutePath = $disk->path($path);
        $originalSize = $disk->size($path);

        // File sudah di bawah limit — tidak perlu dioptimasi
        if ($originalSize <= self::SIZE_LIMIT) {
            return $this->result($path, 'skipped', $originalSize, $originalSize, 'Ukuran sudah di bawah 1 MB');
        }

        // PNG dengan kemungkinan transparansi tidak bisa di-compress ke JPEG
        if ($ext === 'png') {
            return $this->handlePng($path, $absolutePath, $originalSize, $disk);
        }

        try {
            return $this->compressJpeg($path, $absolutePath, $originalSize, $disk);
        } catch (Throwable $e) {
            return $this->result($path, 'failed', $originalSize, $originalSize, $e->getMessage());
        }
    }

    /**
     * @return array{path: string, status: string, original_size: int, optimized_size: int, saved: int, message: string|null}
     */
    private function compressJpeg(string $path, string $absolutePath, int $originalSize, \Illuminate\Contracts\Filesystem\Filesystem $disk): array
    {
        Image::load($absolutePath)->quality(self::QUALITY_FIRST_PASS)->save($absolutePath);
        $sizeAfterFirst = $disk->size($path);

        if ($sizeAfterFirst <= self::SIZE_LIMIT) {
            return $this->saveToIndex($path, 'optimized', $originalSize, $sizeAfterFirst, null);
        }

        // Coba sekali lagi dengan kualitas lebih rendah
        Image::load($absolutePath)->quality(self::QUALITY_SECOND_PASS)->save($absolutePath);
        $sizeAfterSecond = $disk->size($path);

        if ($sizeAfterSecond <= self::SIZE_LIMIT) {
            return $this->saveToIndex($path, 'optimized', $originalSize, $sizeAfterSecond, null);
        }

        return $this->saveToIndex(
            $path,
            'cannot_reduce',
            $originalSize,
            $sizeAfterSecond,
            'Tidak bisa dikecilkan di bawah 1 MB tanpa kehilangan kualitas yang tidak dapat diterima',
        );
    }

    /**
     * @return array{path: string, status: string, original_size: int, optimized_size: int, saved: int, message: string|null}
     */
    private function handlePng(string $path, string $absolutePath, int $originalSize, \Illuminate\Contracts\Filesystem\Filesystem $disk): array
    {
        // Coba optimasi PNG dengan quality setting
        try {
            Image::load($absolutePath)->quality(self::QUALITY_FIRST_PASS)->save($absolutePath);
            $sizeAfter = $disk->size($path);

            if ($sizeAfter <= self::SIZE_LIMIT) {
                return $this->saveToIndex($path, 'optimized', $originalSize, $sizeAfter, null);
            }
        } catch (Throwable) {
            // Lanjutkan ke cannot_reduce jika gagal
        }

        return $this->saveToIndex(
            $path,
            'cannot_reduce',
            $originalSize,
            $originalSize,
            'PNG dengan transparansi tidak bisa dikecilkan di bawah 1 MB',
        );
    }

    private function isSpatieManaged(string $path): bool
    {
        $basename = basename($path);

        return DB::table('media')
            ->where('disk', 'public')
            ->where('file_name', $basename)
            ->exists();
    }

    /**
     * @return array{path: string, status: string, original_size: int, optimized_size: int, saved: int, message: string|null}
     */
    private function saveToIndex(string $path, string $status, int $originalSize, int $optimizedSize, ?string $message): array
    {
        (new OptimizationIndexService)->setEntry($path, [
            'status' => $status,
            'original_size' => $originalSize,
            'optimized_size' => $optimizedSize,
            'optimized_at' => now()->toIso8601String(),
        ]);

        return $this->result($path, $status, $originalSize, $optimizedSize, $message);
    }

    /**
     * @return array{path: string, status: string, original_size: int, optimized_size: int, saved: int, message: string|null}
     */
    private function result(string $path, string $status, int $originalSize, int $optimizedSize, ?string $message): array
    {
        return [
            'path' => $path,
            'status' => $status,
            'original_size' => $originalSize,
            'optimized_size' => $optimizedSize,
            'saved' => max(0, $originalSize - $optimizedSize),
            'message' => $message,
        ];
    }
}
