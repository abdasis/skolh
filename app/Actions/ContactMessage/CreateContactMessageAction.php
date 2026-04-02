<?php

namespace App\Actions\ContactMessage;

use App\Models\ContactMessage;

class CreateContactMessageAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): ContactMessage
    {
        return ContactMessage::create($data);
    }
}
