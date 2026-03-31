<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Academic', 'description' => 'Academic announcements and information.'],
            ['name' => 'General', 'description' => 'General school announcements.'],
            ['name' => 'Activity', 'description' => 'School activities and events.'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['name' => $category['name']], $category);
        }
    }
}
