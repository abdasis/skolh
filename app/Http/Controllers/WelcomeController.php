<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Article;
use App\Models\Facility;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    public function __invoke(): Response
    {
        $agendas = Agenda::whereDate('date', '>=', today())
            ->orderBy('date')
            ->limit(6)
            ->get(['id', 'date', 'title', 'description']);

        $facilities = Facility::published()
            ->latest()
            ->get(['id', 'icon', 'title', 'slug', 'description']);

        $articles = Article::published()
            ->with(['author', 'categories'])
            ->latest('published_at')
            ->limit(5)
            ->get(['id', 'title', 'slug', 'excerpt', 'featured_image', 'user_id', 'published_at']);

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'agendas' => $agendas,
            'facilities' => $facilities,
            'articles' => $articles,
        ]);
    }
}
