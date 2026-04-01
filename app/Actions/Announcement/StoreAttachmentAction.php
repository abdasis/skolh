<?php

namespace App\Actions\Announcement;

use App\Models\Announcement;
use App\Models\AnnouncementAttachment;
use Illuminate\Http\UploadedFile;

class StoreAttachmentAction
{
    public function handle(Announcement $announcement, UploadedFile $file): AnnouncementAttachment
    {
        $path = $file->store('announcements/attachments', 'public');

        return $announcement->attachments()->create([
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
        ]);
    }
}
