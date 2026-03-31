<?php

namespace App\Http\Controllers;

use App\Enums\FacilityStatus;
use App\Models\Facility;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function show(Facility $facility): Response
    {
        abort_if($facility->status === FacilityStatus::Draft, 404);

        return Inertia::render('facilities/show', [
            'facility' => [
                'id' => $facility->id,
                'icon' => $facility->icon,
                'title' => $facility->title,
                'slug' => $facility->slug,
                'description' => $facility->description,
                'content' => $facility->content,
                'featured_image' => $facility->featured_image,
                'featured_image_url' => $facility->featured_image
                    ? Storage::disk('public')->url($facility->featured_image)
                    : null,
                'status' => $facility->status->value,
                'created_at' => $facility->created_at,
                'updated_at' => $facility->updated_at,
            ],
        ]);
    }
}
