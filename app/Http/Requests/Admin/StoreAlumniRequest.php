<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Enums\SocialPlatform;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAlumniRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $platformValues = array_column(SocialPlatform::cases(), 'value');

        return [
            'name' => ['required', 'string', 'max:255'],
            'batch' => ['required', 'string', 'max:255'],
            'destination' => ['required', 'string', 'max:255'],
            'quote' => ['required', 'string'],
            'avatar_url' => ['nullable', 'string', 'max:500'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'socials' => ['nullable', 'array'],
            'socials.*.platform' => ['required_with:socials.*', 'string', Rule::in($platformValues)],
            'socials.*.url' => ['required_with:socials.*', 'url', 'max:500'],
        ];
    }
}
