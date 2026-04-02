<?php

namespace Database\Seeders;

use App\Models\Extracurricular;
use Illuminate\Database\Seeder;

class ExtracurricularSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Extracurricular::factory()->count(5)->active()->create();
        Extracurricular::factory()->count(3)->draft()->create();
    }
}
