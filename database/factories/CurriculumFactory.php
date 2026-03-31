<?php

namespace Database\Factories;

use App\Enums\CurriculumStatus;
use App\Models\Curriculum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Curriculum>
 */
class CurriculumFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $icons = ['BookOpen', 'GraduationCap', 'FlaskConical', 'Library', 'Monitor', 'Pencil', 'Scroll', 'Star'];

        return [
            'name' => fake()->unique()->words(3, true),
            'code' => fake()->toUpper(fake()->lexify('??')),
            'year' => fake()->numberBetween(2015, 2030),
            'level' => fake()->randomElement(['SD', 'SMP', 'SMA', 'Kelas 7', 'Kelas 10']),
            'description' => fake()->sentence(10),
            'content' => null,
            'icon' => fake()->randomElement($icons),
            'status' => fake()->randomElement(CurriculumStatus::cases()),
            'effective_date' => fake()->date(),
            'expired_date' => null,
            'document' => null,
        ];
    }

    public function active(): static
    {
        return $this->state(['status' => CurriculumStatus::Active]);
    }

    public function draft(): static
    {
        return $this->state(['status' => CurriculumStatus::Draft]);
    }
}
