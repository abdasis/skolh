<?php

namespace App\Actions\Achievement;

use App\Models\Achievement;
use Illuminate\Support\Facades\Storage;

class DeleteAchievementAction
{
    public function handle(Achievement $achievement): void
    {
        if ($achievement->attachment) {
            Storage::disk('public')->delete($achievement->attachment);
        }

        $achievement->delete();
    }
}
