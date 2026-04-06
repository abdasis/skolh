<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Enums\FacilityStatus;
use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

final class PublicSchoolHistoryController extends Controller
{
    public function __invoke(): Response
    {
        $facilities = Facility::query()
            ->where('status', FacilityStatus::Public)
            ->orderBy('title')
            ->get(['id', 'icon', 'title', 'slug', 'description', 'featured_image'])
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

        return Inertia::render('public/sejarah', [
            'history' => SiteSetting::get('school_history', ''),
            'facilities' => $facilities,
        ]);
    }
}
