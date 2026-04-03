<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreGalleryAlbumRequest extends FormRequest
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
            'description' => ['nullable', 'string'],
            'cover_image_path' => ['nullable', 'string', 'max:500'],
            'status' => ['required', 'string', 'in:published,draft'],
            'image_paths' => ['nullable', 'array'],
            'image_paths.*' => ['string', 'max:500'],
        ];
    }
}
