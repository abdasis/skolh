<?php

namespace Database\Factories;

use App\Enums\AnnouncementStatus;
use App\Models\Announcement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->sentence(5),
            'content' => fake()->paragraphs(3, true),
            'status' => fake()->randomElement(AnnouncementStatus::cases()),
            'published_at' => fake()->date(),
            'expired_at' => null,
        ];
    }

    public function published(): static
    {
        return $this->state(['status' => AnnouncementStatus::Published]);
    }

    public function draft(): static
    {
        return $this->state(['status' => AnnouncementStatus::Draft]);
    }
}
