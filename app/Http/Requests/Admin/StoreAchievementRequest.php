<?php

namespace App\Http\Requests\Admin;

use App\Enums\AchievementCategory;
use App\Enums\AchievementLevel;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreAchievementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'category' => ['required', new Enum(AchievementCategory::class)],
            'level' => ['required', new Enum(AchievementLevel::class)],
            'year' => ['required', 'integer', 'min:1900', 'max:'.((int) date('Y') + 1)],
            'attachment' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:5120'],
        ];
    }
}
