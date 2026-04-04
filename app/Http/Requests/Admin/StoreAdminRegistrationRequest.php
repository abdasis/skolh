<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

class StoreAdminRegistrationRequest extends SubmitRegistrationRequest
{
    /** @return array<string, mixed> */
    public function rules(): array
    {
        $rules = parent::rules();

        $rules['registration_photo']       = ['nullable', 'image', 'max:2048'];
        $rules['registration_id_document'] = ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'];

        return $rules;
    }
}
