<?php

declare(strict_types=1);

namespace App\Actions\Testimonial;

use App\Models\Testimonial;

final class UpdateTestimonialAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(Testimonial $testimonial, array $data): Testimonial
    {
        $testimonial->update([
            'name' => $data['name'],
            'role' => $data['role'],
            'quote' => $data['quote'],
            'highlight' => $data['highlight'],
            'avatar_url' => $data['avatar_url'] ?? null,
            'sort_order' => $data['sort_order'] ?? $testimonial->sort_order,
        ]);

        return $testimonial->refresh();
    }
}
