<?php

declare(strict_types=1);

namespace App\Actions\Student;

use App\Models\Student;

final class DeleteStudentAction
{
    public function handle(Student $student): void
    {
        $student->delete();
    }
}
