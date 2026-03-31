<?php

namespace App\Actions\Announcement;

use App\Models\Announcement;
use Illuminate\Support\Facades\Storage;

class DeleteAnnouncementAction
{
    public function handle(Announcement $announcement): void
    {
        foreach ($announcement->attachments as $attachment) {
            Storage::disk('public')->delete($attachment->file_path);
        }

        $announcement->delete();
    }
}
