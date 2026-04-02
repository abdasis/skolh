<?php

namespace App\Actions\Extracurricular;

use App\Models\Extracurricular;
use Illuminate\Http\UploadedFile;

class CreateExtracurricularAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): Extracurricular
    {
        $featuredImage = $data['featured_image'] ?? null;
        unset($data['featured_image']);

        if ($featuredImage instanceof UploadedFile) {
            $data['featured_image'] = $featuredImage->store('extracurriculars', 'public');
        }

        return Extracurricular::create($data);
    }
}
