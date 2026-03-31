<?php

namespace App\Actions\Announcement;

use App\Models\AnnouncementAttachment;
use Illuminate\Support\Facades\Storage;

class DeleteAttachmentAction
{
    public function handle(AnnouncementAttachment $attachment): void
    {
        Storage::disk('public')->delete($attachment->file_path);

        $attachment->delete();
    }
}
