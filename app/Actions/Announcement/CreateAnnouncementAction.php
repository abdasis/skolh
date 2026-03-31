<?php

namespace App\Actions\Announcement;

use App\Models\Announcement;
use Illuminate\Http\UploadedFile;

class CreateAnnouncementAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): Announcement
    {
        $categoryIds = $data['category_ids'] ?? [];
        unset($data['category_ids'], $data['attachments']);

        $announcement = Announcement::create($data);

        if (! empty($categoryIds)) {
            $announcement->categories()->sync($categoryIds);
        }

        return $announcement;
    }
}
