<?php

declare(strict_types=1);

namespace App\Actions\Testimonial;

use App\Models\Testimonial;

final class DeleteTestimonialAction
{
    public function handle(Testimonial $testimonial): void
    {
        $testimonial->delete();
    }
}
