<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Enums\Gender;
use App\Enums\SocialPlatform;
use App\Enums\TeacherStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

final class StoreTeacherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'nip' => ['required', 'string', 'max:30', 'unique:teachers,nip'],
            'email' => ['required', 'email', 'max:255', 'unique:teachers,email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'subject' => ['nullable', 'string', 'max:100'],
            'gender' => ['nullable', new Enum(Gender::class)],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'joined_at' => ['nullable', 'date'],
            'status' => ['required', new Enum(TeacherStatus::class)],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'socials' => ['nullable', 'array'],
            'socials.*.platform' => ['required', 'string', new Enum(SocialPlatform::class)],
            'socials.*.url' => ['required', 'string', 'url', 'max:500'],
        ];
    }
}
