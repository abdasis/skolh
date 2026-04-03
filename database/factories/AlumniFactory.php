<?php

namespace Database\Factories;

use App\Models\Alumni;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Alumni>
 */
class AlumniFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'batch' => 'Angkatan ke-' . fake()->numberBetween(1, 10) . ' SDIT Al-Aziz',
            'destination' => fake()->randomElement([
                'Teknik Informatika, Universitas Indonesia',
                'Hukum Islam, Universitas Al-Azhar Mesir',
                'Kedokteran, Universitas Gadjah Mada',
                'Akuntansi, Universitas Teknologi Malaysia',
            ]),
            'quote' => fake()->sentence(20),
            'avatar_url' => null,
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
