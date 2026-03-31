<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Announcement\DeleteAttachmentAction;
use App\Http\Controllers\Controller;
use App\Models\AnnouncementAttachment;
use Illuminate\Http\RedirectResponse;

class AnnouncementAttachmentController extends Controller
{
    public function __construct(
        private readonly DeleteAttachmentAction $deleteAction,
    ) {}

    public function destroy(AnnouncementAttachment $attachment): RedirectResponse
    {
        $announcementId = $attachment->announcement_id;

        $this->deleteAction->handle($attachment);

        return redirect()->route('admin.announcements.edit', $announcementId)
            ->with('success', 'Lampiran berhasil dihapus.');
    }
}
