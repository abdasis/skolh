<?php

namespace App\Actions\Curriculum;

use App\Models\Curriculum;
class CreateCurriculumAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): Curriculum
    {
        if (isset($data['document']) && $data['document'] instanceof \Illuminate\Http\UploadedFile) {
            $data['document'] = $data['document']->store('curricula/documents', 'public');
        }

        return Curriculum::create($data);
    }
}
