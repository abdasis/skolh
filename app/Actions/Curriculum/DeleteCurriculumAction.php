<?php

namespace App\Actions\Curriculum;

use App\Models\Curriculum;
use Illuminate\Support\Facades\Storage;

class DeleteCurriculumAction
{
    public function handle(Curriculum $curriculum): void
    {
        if ($curriculum->document) {
            Storage::disk('public')->delete($curriculum->document);
        }

        $curriculum->delete();
    }
}
