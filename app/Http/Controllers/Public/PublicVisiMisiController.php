<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Enums\CurriculumStatus;
use App\Http\Controllers\Controller;
use App\Models\Curriculum;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;

final class PublicVisiMisiController extends Controller
{
    public function __invoke(): Response
    {
        $curricula = Curriculum::query()
            ->where('status', CurriculumStatus::Active)
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'description', 'icon'])
            ->map(fn (Curriculum $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'slug' => $item->slug,
                'description' => $item->description,
                'icon' => $item->icon,
            ]);

        return Inertia::render('public/visi-misi', [
            'vision' => SiteSetting::get('vision', ''),
            'mission' => SiteSetting::get('mission', ''),
            'curricula' => $curricula,
        ]);
    }
}
