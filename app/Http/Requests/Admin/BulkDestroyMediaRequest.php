<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class BulkDestroyMediaRequest extends FormRequest
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
            'paths' => ['required', 'array', 'min:1'],
            'paths.*' => ['required', 'string'],
        ];
    }

    public function withValidator(\Illuminate\Validation\Validator $validator): void
    {
        $validator->after(function (\Illuminate\Validation\Validator $v) {
            $paths = $this->input('paths', []);

            if (! is_array($paths)) {
                return;
            }

            $spatieFilenames = DB::table('media')
                ->where('disk', 'public')
                ->pluck('file_name')
                ->flip()
                ->all();

            foreach ($paths as $path) {
                $basename = basename((string) $path);

                if (isset($spatieFilenames[$basename])) {
                    $v->errors()->add('paths', "File '{$basename}' dikelola oleh model dan tidak dapat dihapus.");
                }
            }
        });
    }
}
