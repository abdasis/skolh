<?php

namespace Database\Factories;

use App\Models\GalleryAlbum;
use App\Models\GalleryImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GalleryImage>
 */
class GalleryImageFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'gallery_album_id' => GalleryAlbum::factory(),
            'image' => 'gallery-albums/placeholder.jpg',
            'caption' => fake()->optional()->sentence(),
            'order' => fake()->numberBetween(0, 100),
        ];
    }
}
