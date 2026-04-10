<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UploadChunkRequest extends FormRequest
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
            'upload_id' => ['required', 'string', 'max:64', 'regex:/^[a-zA-Z0-9\-]+$/'],
            'chunk_index' => ['required', 'integer', 'min:0'],
            'total_chunks' => ['required', 'integer', 'min:1', 'max:20'],
            'folder' => ['required', 'string', 'max:200', 'regex:/^[a-z0-9\-\/]+$/'],
            'original_name' => ['required', 'string', 'max:255'],
            'chunk' => ['required', 'file', 'max:768'],
        ];
    }
}
