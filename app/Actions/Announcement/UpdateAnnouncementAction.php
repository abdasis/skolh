<?php

namespace App\Actions\Announcement;

use App\Models\Announcement;

class UpdateAnnouncementAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(Announcement $announcement, array $data): Announcement
    {
        $categoryIds = $data['category_ids'] ?? null;
        unset($data['category_ids'], $data['attachments']);

        $announcement->update($data);

        if ($categoryIds !== null) {
            $announcement->categories()->sync($categoryIds);
        }

        return $announcement;
    }
}
