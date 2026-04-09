<?php

namespace App\Http\Controllers;

use App\Enums\MajorStatus;
use App\Models\Major;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MajorController extends Controller
{
    public function index(): Response
    {
        $majors = Major::query()
            ->where('status', MajorStatus::Public)
            ->orderBy('title')
            ->get()
            ->map(fn (Major $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'description' => $item->description,
                'featured_image_url' => $item->featured_image
                    ? Storage::disk('public')->url($item->featured_image)
                    : null,
            ]);

        return Inertia::render('majors/index', [
            'majors' => $majors,
        ]);
    }

    public function show(Major $major): Response
    {
        abort_if($major->status === MajorStatus::Draft, 404);

        $others = Major::query()
            ->where('status', MajorStatus::Public)
            ->where('id', '!=', $major->id)
            ->orderBy('title')
            ->get()
            ->map(fn (Major $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'description' => $item->description,
                'featured_image_url' => $item->featured_image
                    ? Storage::disk('public')->url($item->featured_image)
                    : null,
            ]);

        return Inertia::render('majors/show', [
            'major' => [
                'id' => $major->id,
                'title' => $major->title,
                'slug' => $major->slug,
                'description' => $major->description,
                'content' => $major->content,
                'featured_image' => $major->featured_image,
                'featured_image_url' => $major->featured_image
                    ? Storage::disk('public')->url($major->featured_image)
                    : null,
                'status' => $major->status->value,
                'created_at' => $major->created_at,
                'updated_at' => $major->updated_at,
            ],
            'others' => $others,
        ]);
    }
}
