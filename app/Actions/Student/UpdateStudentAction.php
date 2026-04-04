<?php

declare(strict_types=1);

namespace App\Actions\Student;

use App\Models\Student;

final class UpdateStudentAction
{
    public function handle(Student $student, array $validated): Student
    {
        $student->update($validated);

        return $student;
    }
}
