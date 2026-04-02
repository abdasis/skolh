<?php

namespace App\Actions\Achievement;

use App\Models\Achievement;
use Illuminate\Http\UploadedFile;

class CreateAchievementAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): Achievement
    {
        $attachment = $data['attachment'] ?? null;
        unset($data['attachment']);

        if ($attachment instanceof UploadedFile) {
            $data['attachment'] = $attachment->store('achievements', 'public');
        }

        return Achievement::create($data);
    }
}
