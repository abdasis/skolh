<?php

namespace App\Actions\Extracurricular;

use App\Models\Extracurricular;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UpdateExtracurricularAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(Extracurricular $extracurricular, array $data): Extracurricular
    {
        $featuredImage = $data['featured_image'] ?? null;
        unset($data['featured_image']);

        if ($featuredImage instanceof UploadedFile) {
            if ($extracurricular->featured_image) {
                Storage::disk('public')->delete($extracurricular->featured_image);
            }
            $data['featured_image'] = $featuredImage->store('extracurriculars', 'public');
        }

        $extracurricular->update($data);

        return $extracurricular;
    }
}
