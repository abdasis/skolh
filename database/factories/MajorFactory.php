<?php

namespace Database\Factories;

use App\Enums\MajorStatus;
use App\Models\Major;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Major>
 */
class MajorFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->words(3, true),
            'description' => fake()->sentence(10),
            'content' => null,
            'featured_image' => null,
            'status' => fake()->randomElement(MajorStatus::cases()),
        ];
    }

    public function published(): static
    {
        return $this->state(['status' => MajorStatus::Public]);
    }

    public function draft(): static
    {
        return $this->state(['status' => MajorStatus::Draft]);
    }
}
