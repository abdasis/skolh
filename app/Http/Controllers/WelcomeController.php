<?php

namespace App\Http\Controllers;

use App\Http\Resources\AlumniResource;
use App\Http\Resources\TestimonialResource;
use App\Models\Agenda;
use App\Models\Article;
use App\Models\Facility;
use App\Models\Testimonial;
use App\Repositories\Contracts\AlumniRepositoryInterface;
use App\Repositories\Contracts\CurriculumRepositoryInterface;
use App\Services\SiteConfigService;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    public function __construct(
        private CurriculumRepositoryInterface $curriculumRepository,
        private AlumniRepositoryInterface $alumniRepository,
        private SiteConfigService $siteConfig,
    ) {}

    public function __invoke(): Response
    {
        $sections = $this->siteConfig->getSectionPreferences();

        $agendas = $sections['agenda']['enabled'] ?? true
            ? Agenda::whereDate('date', '>=', today())
                ->orderBy('date')
                ->limit($sections['agenda']['limit'] ?? 6)
                ->get(['id', 'date', 'title', 'description'])
            : collect();

        $facilitiesTotal = $sections['facilities']['enabled'] ?? true
            ? Facility::published()->count()
            : 0;

        $facilities = $sections['facilities']['enabled'] ?? true
            ? Facility::published()
                ->latest()
                ->limit($sections['facilities']['limit'] ?? 8)
                ->get(['id', 'icon', 'title', 'slug', 'description'])
            : collect();

        $articles = $sections['articles']['enabled'] ?? true
            ? Article::published()
                ->with(['author', 'categories'])
                ->latest('published_at')
                ->limit($sections['articles']['limit'] ?? 5)
                ->get(['id', 'title', 'slug', 'excerpt', 'featured_image', 'user_id', 'published_at'])
            : collect();

        $curricula = $sections['curricula']['enabled'] ?? true
            ? $this->curriculumRepository->getActive()
            : collect();

        $testimonials = $sections['testimonials']['enabled'] ?? true
            ? Testimonial::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->limit($sections['testimonials']['limit'] ?? 6)
                ->get()
            : collect();

        $alumni = $sections['alumni']['enabled'] ?? true
            ? $this->alumniRepository->forWelcomePage()
            : collect();

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'agendas' => $agendas,
            'facilities' => $facilities,
            'facilitiesTotal' => $facilitiesTotal,
            'articles' => $articles,
            'curricula' => $curricula,
            'testimonials' => TestimonialResource::collection($testimonials),
            'alumni' => AlumniResource::collection($alumni),
        ]);
    }
}
