<?php

declare(strict_types=1);

namespace App\Actions\Testimonial;

use App\Models\Testimonial;

final class CreateTestimonialAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): Testimonial
    {
        return Testimonial::create([
            'name' => $data['name'],
            'role' => $data['role'],
            'quote' => $data['quote'],
            'highlight' => $data['highlight'],
            'avatar_url' => $data['avatar_url'] ?? null,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);
    }
}
