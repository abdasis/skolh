<?php

namespace Database\Factories;

use App\Enums\FacilityStatus;
use App\Models\Facility;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Facility>
 */
class FacilityFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $icons = ['BookOpen', 'FlaskConical', 'Library', 'Monitor', 'Dumbbell', 'Music', 'Palette', 'Microscope', 'Wifi', 'TreePine'];

        return [
            'icon' => fake()->randomElement($icons),
            'title' => fake()->unique()->words(3, true),
            'description' => fake()->sentence(10),
            'content' => null,
            'featured_image' => null,
            'status' => fake()->randomElement(FacilityStatus::cases()),
        ];
    }

    public function published(): static
    {
        return $this->state(['status' => FacilityStatus::Public]);
    }

    public function draft(): static
    {
        return $this->state(['status' => FacilityStatus::Draft]);
    }
}
