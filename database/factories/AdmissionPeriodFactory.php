<?php

namespace Database\Factories;

use App\Models\AdmissionPeriod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AdmissionPeriod>
 */
class AdmissionPeriodFactory extends Factory
{
    public function definition(): array
    {
        $year = fake()->numberBetween(2024, 2027);

        return [
            'academic_year' => "{$year}/" . ($year + 1),
            'start_date' => fake()->dateTimeBetween('-1 month', '+1 month')->format('Y-m-d'),
            'end_date' => fake()->dateTimeBetween('+1 month', '+3 months')->format('Y-m-d'),
            'is_active' => false,
            'description' => fake()->optional()->sentence(),
        ];
    }

    public function active(): static
    {
        return $this->state([
            'is_active' => true,
            'start_date' => now()->subDays(5)->toDateString(),
            'end_date' => now()->addDays(25)->toDateString(),
        ]);
    }

    public function closed(): static
    {
        return $this->state([
            'is_active' => false,
            'start_date' => now()->subMonths(3)->toDateString(),
            'end_date' => now()->subMonth()->toDateString(),
        ]);
    }
}
