<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Enums\Gender;
use App\Enums\TeacherStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

final class UpdateTeacherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $teacher = $this->route('teacher');

        return [
            'name' => ['required', 'string', 'max:255'],
            'nip' => ['required', 'string', 'max:30', Rule::unique('teachers', 'nip')->ignore($teacher)],
            'email' => ['required', 'email', 'max:255', Rule::unique('teachers', 'email')->ignore($teacher)],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'subject' => ['nullable', 'string', 'max:100'],
            'gender' => ['nullable', new Enum(Gender::class)],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'joined_at' => ['nullable', 'date'],
            'status' => ['required', new Enum(TeacherStatus::class)],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }
}
