<?php

namespace Database\Factories;

use App\Enums\ArticleStatus;
use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Article>
 */
class ArticleFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'title' => fake()->unique()->sentence(5),
            'excerpt' => fake()->paragraph(),
            'content' => fake()->paragraphs(5, true),
            'featured_image' => null,
            'status' => fake()->randomElement(ArticleStatus::cases()),
            'published_at' => fake()->date(),
        ];
    }

    public function published(): static
    {
        return $this->state(['status' => ArticleStatus::Published]);
    }

    public function draft(): static
    {
        return $this->state(['status' => ArticleStatus::Draft]);
    }
}
