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
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    public function __construct(
        private CurriculumRepositoryInterface $curriculumRepository,
        private AlumniRepositoryInterface $alumniRepository,
    ) {}

    public function __invoke(): Response
    {
        $agendas = Agenda::whereDate('date', '>=', today())
            ->orderBy('date')
            ->limit(6)
            ->get(['id', 'date', 'title', 'description']);

        $facilitiesTotal = Facility::published()->count();

        $facilities = Facility::published()
            ->latest()
            ->limit(8)
            ->get(['id', 'icon', 'title', 'slug', 'description']);

        $articles = Article::published()
            ->with(['author', 'categories'])
            ->latest('published_at')
            ->limit(5)
            ->get(['id', 'title', 'slug', 'excerpt', 'featured_image', 'user_id', 'published_at']);

        $curricula = $this->curriculumRepository->getActive();

        $testimonials = Testimonial::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->limit(6)
            ->get();

        $alumni = $this->alumniRepository->forWelcomePage();

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
