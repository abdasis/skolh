<?php

declare(strict_types=1);

namespace App\Actions\Teacher;

use App\Models\Teacher;
use Illuminate\Http\UploadedFile;

final class UpdateTeacherAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(Teacher $teacher, array $data): Teacher
    {
        $avatar = $data['avatar'] ?? null;
        unset($data['avatar']);

        $teacher->update([
            'name' => $data['name'],
            'nip' => $data['nip'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
            'subject' => $data['subject'] ?? null,
            'gender' => $data['gender'] ?? null,
            'date_of_birth' => $data['date_of_birth'] ?? null,
            'joined_at' => $data['joined_at'] ?? null,
            'status' => $data['status'],
        ]);

        if ($avatar instanceof UploadedFile) {
            $teacher->addMedia($avatar)->toMediaCollection('avatar');
        }

        return $teacher->refresh();
    }
}
