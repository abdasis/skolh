<?php

declare(strict_types=1);

namespace App\Actions\Alumni;

use App\Models\Alumni;

final class UpdateAlumniAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(Alumni $alumni, array $data): Alumni
    {
        $alumni->update([
            'name' => $data['name'],
            'batch' => $data['batch'],
            'destination' => $data['destination'],
            'quote' => $data['quote'],
            'avatar_url' => $data['avatar_url'] ?? null,
            'sort_order' => $data['sort_order'] ?? $alumni->sort_order,
        ]);

        $alumni->socials()->delete();

        if (!empty($data['socials'])) {
            $alumni->socials()->createMany($data['socials']);
        }

        return $alumni->refresh();
    }
}
