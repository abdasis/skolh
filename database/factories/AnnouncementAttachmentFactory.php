<?php

namespace Database\Factories;

use App\Models\Announcement;
use App\Models\AnnouncementAttachment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AnnouncementAttachment>
 */
class AnnouncementAttachmentFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'announcement_id' => Announcement::factory(),
            'file_path' => 'announcements/attachments/'.fake()->uuid().'.pdf',
            'file_name' => fake()->word().'.pdf',
            'mime_type' => 'application/pdf',
            'file_size' => fake()->numberBetween(10240, 5242880),
        ];
    }
}
