<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateWelcomeContentRequest extends FormRequest
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
            'hero' => ['nullable', 'array'],
            'hero.subtitle' => ['nullable', 'string', 'max:200'],
            'hero.title' => ['nullable', 'string', 'max:200'],
            'hero.title_accent' => ['nullable', 'string', 'max:100'],
            'hero.description' => ['nullable', 'string', 'max:1000'],
            'hero.badge_text' => ['nullable', 'string', 'max:100'],
            'hero.cta_buttons' => ['nullable', 'array', 'max:3'],
            'hero.cta_buttons.*.label' => ['required', 'string', 'max:50'],
            'hero.cta_buttons.*.href' => ['required', 'string', 'max:200'],
            'hero.cta_buttons.*.variant' => ['required', 'in:primary,secondary'],
            'hero.stats' => ['nullable', 'array', 'max:6'],
            'hero.stats.*.value' => ['required', 'string', 'max:20'],
            'hero.stats.*.label' => ['required', 'string', 'max:50'],
            'hero_bg_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'hero_side_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'about' => ['nullable', 'array'],
            'about.heading' => ['required', 'string', 'max:200'],
            'about.paragraphs' => ['nullable', 'array', 'max:5'],
            'about.paragraphs.*' => ['nullable', 'string', 'max:1000'],
            'about.feature_cards' => ['nullable', 'array', 'max:6'],
            'about.feature_cards.*.icon' => ['required', 'string', 'max:50'],
            'about.feature_cards.*.title' => ['required', 'string', 'max:50'],
            'about.feature_cards.*.description' => ['nullable', 'string', 'max:200'],
            'about.feature_cards.*.stat_value' => ['nullable', 'string', 'max:20'],
            'about.feature_cards.*.stat_label' => ['nullable', 'string', 'max:50'],
        ];
    }
}
