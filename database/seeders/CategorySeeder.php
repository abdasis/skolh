<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Akademik', 'description' => 'Pengumuman seputar kegiatan akademik dan pembelajaran.'],
            ['name' => 'Umum', 'description' => 'Pengumuman umum dari pihak sekolah.'],
            ['name' => 'Kegiatan', 'description' => 'Kegiatan dan acara sekolah.'],
            ['name' => 'Parenting', 'description' => 'Tips dan panduan pengasuhan anak.'],
            ['name' => 'Keislaman', 'description' => 'Artikel seputar nilai dan pendidikan Islam.'],
            ['name' => 'Kesehatan', 'description' => 'Informasi seputar kesehatan anak dan gizi.'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['name' => $category['name']], $category);
        }
    }
}
