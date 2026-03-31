<?php

namespace App\Actions\Curriculum;

use App\Models\Curriculum;
use Illuminate\Support\Facades\Storage;

class UpdateCurriculumAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(Curriculum $curriculum, array $data): Curriculum
    {
        if (isset($data['document']) && $data['document'] instanceof \Illuminate\Http\UploadedFile) {
            if ($curriculum->document) {
                Storage::disk('public')->delete($curriculum->document);
            }
            $data['document'] = $data['document']->store('curricula/documents', 'public');
        } else {
            unset($data['document']);
        }

        $curriculum->update($data);

        return $curriculum->refresh();
    }
}
