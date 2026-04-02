<?php

namespace App\Actions\Achievement;

use App\Models\Achievement;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UpdateAchievementAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(Achievement $achievement, array $data): Achievement
    {
        $attachment = $data['attachment'] ?? null;
        unset($data['attachment']);

        if ($attachment instanceof UploadedFile) {
            if ($achievement->attachment) {
                Storage::disk('public')->delete($achievement->attachment);
            }
            $data['attachment'] = $attachment->store('achievements', 'public');
        }

        $achievement->update($data);

        return $achievement;
    }
}
