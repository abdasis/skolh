<?php

declare(strict_types=1);

namespace App\Actions\Alumni;

use App\Models\Alumni;

final class CreateAlumniAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): Alumni
    {
        $alumni = Alumni::create([
            'name' => $data['name'],
            'batch' => $data['batch'],
            'destination' => $data['destination'],
            'quote' => $data['quote'],
            'avatar_url' => $data['avatar_url'] ?? null,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        if (!empty($data['socials'])) {
            $alumni->socials()->createMany($data['socials']);
        }

        return $alumni;
    }
}
