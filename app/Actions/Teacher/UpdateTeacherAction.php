<?php

declare(strict_types=1);

namespace App\Actions\Teacher;

use App\Models\Teacher;

final class UpdateTeacherAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(Teacher $teacher, array $data): Teacher
    {
        $avatarUrl = $data['avatar_url'] ?? null;
        $existingAvatarUrl = $teacher->getFirstMediaUrl('avatar');

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

        if (is_string($avatarUrl) && $avatarUrl !== '' && $avatarUrl !== $existingAvatarUrl) {
            $localPath = public_path(parse_url($avatarUrl, PHP_URL_PATH));
            if (file_exists($localPath)) {
                $teacher->clearMediaCollection('avatar');
                $teacher->addMedia($localPath)->preservingOriginal()->toMediaCollection('avatar');
            }
        } elseif ($avatarUrl === null || $avatarUrl === '') {
            $teacher->clearMediaCollection('avatar');
        }

        $teacher->socials()->delete();

        if (! empty($data['socials'])) {
            $teacher->socials()->createMany($data['socials']);
        }

        return $teacher->refresh();
    }
}
