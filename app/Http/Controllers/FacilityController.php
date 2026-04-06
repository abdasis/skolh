<?php

namespace App\Http\Controllers;

use App\Enums\FacilityStatus;
use App\Models\Facility;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function index(): Response
    {
        $facilities = Facility::query()
            ->where('status', FacilityStatus::Public)
            ->orderBy('title')
            ->get()
            ->map(fn (Facility $item) => [
                'id' => $item->id,
                'icon' => $item->icon,
                'title' => $item->title,
                'slug' => $item->slug,
                'description' => $item->description,
                'featured_image_url' => $item->featured_image
                    ? Storage::disk('public')->url($item->featured_image)
                    : null,
            ]);

        return Inertia::render('facilities/index', [
            'facilities' => $facilities,
        ]);
    }

    public function show(Facility $facility): Response
    {
        abort_if($facility->status === FacilityStatus::Draft, 404);

        $others = Facility::query()
            ->where('status', FacilityStatus::Public)
            ->where('id', '!=', $facility->id)
            ->orderBy('title')
            ->get()
            ->map(fn (Facility $item) => [
                'id' => $item->id,
                'icon' => $item->icon,
                'title' => $item->title,
                'slug' => $item->slug,
                'description' => $item->description,
                'featured_image_url' => $item->featured_image
                    ? Storage::disk('public')->url($item->featured_image)
                    : null,
            ]);

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
            'others' => $others,
        ]);
    }
}
