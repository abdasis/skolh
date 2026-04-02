<?php

namespace App\Actions\ContactMessage;

use App\Models\ContactMessage;

class DeleteContactMessageAction
{
    public function handle(ContactMessage $contactMessage): void
    {
        $contactMessage->delete();
    }
}
