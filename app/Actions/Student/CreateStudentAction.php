<?php

declare(strict_types=1);

namespace App\Actions\Student;

use App\Models\Student;

final class CreateStudentAction
{
    public function handle(array $validated): Student
    {
        return Student::create($validated);
    }
}
