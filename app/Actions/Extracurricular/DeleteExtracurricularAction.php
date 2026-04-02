<?php

namespace App\Actions\Extracurricular;

use App\Models\Extracurricular;
use Illuminate\Support\Facades\Storage;

class DeleteExtracurricularAction
{
    public function handle(Extracurricular $extracurricular): void
    {
        if ($extracurricular->featured_image) {
            Storage::disk('public')->delete($extracurricular->featured_image);
        }

        $extracurricular->delete();
    }
}
