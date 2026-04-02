<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        Teacher::factory()->count(8)->active()->create();
        Teacher::factory()->count(2)->inactive()->create();
    }
}
