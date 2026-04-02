<?php

namespace Database\Factories;

use App\Enums\AchievementCategory;
use App\Enums\AchievementLevel;
use App\Models\Achievement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Achievement>
 */
class AchievementFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'category' => fake()->randomElement(AchievementCategory::cases())->value,
            'level' => fake()->randomElement(AchievementLevel::cases())->value,
            'year' => fake()->numberBetween(2010, 2026),
            'attachment' => null,
        ];
    }
}
