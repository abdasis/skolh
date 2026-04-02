<?php

namespace Database\Factories;

use App\Enums\DayOfWeek;
use App\Enums\ExtracurricularCategory;
use App\Enums\ExtracurricularStatus;
use App\Models\Extracurricular;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Extracurricular>
 */
class ExtracurricularFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'category' => fake()->randomElement(ExtracurricularCategory::cases())->value,
            'day' => fake()->randomElement(DayOfWeek::cases())->value,
            'time' => fake()->randomElement(['07:00 - 09:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00']),
            'supervisor' => fake()->name(),
            'description' => fake()->paragraph(),
            'content' => '<p>'.fake()->paragraphs(3, true).'</p>',
            'featured_image' => null,
            'status' => ExtracurricularStatus::Draft->value,
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ExtracurricularStatus::Active->value,
        ]);
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ExtracurricularStatus::Draft->value,
        ]);
    }
}
