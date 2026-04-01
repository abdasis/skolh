<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Article;
use App\Models\Facility;
use App\Repositories\Contracts\CurriculumRepositoryInterface;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    public function __construct(private CurriculumRepositoryInterface $curriculumRepository) {}

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

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'agendas' => $agendas,
            'facilities' => $facilities,
            'facilitiesTotal' => $facilitiesTotal,
            'articles' => $articles,
            'curricula' => $curricula,
        ]);
    }
}
