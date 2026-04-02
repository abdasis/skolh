<?php

declare(strict_types=1);

namespace App\Actions\Teacher;

use App\Models\Teacher;

final class DeleteTeacherAction
{
    public function handle(Teacher $teacher): void
    {
        $teacher->delete();
    }
}
