<?php

namespace Database\Factories;

use App\Enums\GalleryAlbumStatus;
use App\Models\GalleryAlbum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GalleryAlbum>
 */
class GalleryAlbumFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'cover_image' => null,
            'status' => GalleryAlbumStatus::Draft->value,
        ];
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => GalleryAlbumStatus::Published->value,
        ]);
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => GalleryAlbumStatus::Draft->value,
        ]);
    }
}
