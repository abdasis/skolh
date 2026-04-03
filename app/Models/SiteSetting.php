<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value'];

    /**
     * Ambil nilai setting berdasarkan key. Gunakan cache untuk performa.
     */
    public static function get(string $key, ?string $default = null): ?string
    {
        return Cache::rememberForever("site_setting:{$key}", function () use ($key, $default) {
            return static::where('key', $key)->value('value') ?? $default;
        });
    }

    /**
     * Simpan nilai setting dan hapus cache terkait.
     */
    public static function set(string $key, ?string $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
        Cache::forget("site_setting:{$key}");
    }
}
