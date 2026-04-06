<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\ReportStatus;
use App\Enums\StudentStatus;
use App\Models\Achievement;
use App\Models\Agenda;
use App\Models\Announcement;
use App\Models\Report;
use App\Models\Student;
use App\Models\Teacher;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $totalStudents = Student::where('status', StudentStatus::Active)->count();
        $totalTeachers = Teacher::active()->count();

        $todayAgendas = Agenda::whereDate('date', today())
            ->orderBy('date')
            ->get()
            ->map(fn (Agenda $agenda) => [
                'id' => $agenda->id,
                'time' => $agenda->date->format('H:i'),
                'title' => $agenda->title,
                'desc' => $agenda->description ?? '',
            ]);

        $recentAnnouncements = Announcement::active()
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(fn (Announcement $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'date' => $item->published_at?->translatedFormat('d M Y') ?? $item->created_at->translatedFormat('d M Y'),
            ]);

        $recentAchievements = Achievement::latest()
            ->take(4)
            ->get()
            ->map(fn (Achievement $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'level' => $item->level->value,
                'year' => $item->year,
            ]);

        $totalReports = Report::count();
        $reportSummary = [
            [
                'status' => 'new',
                'label' => 'Baru',
                'count' => Report::status(ReportStatus::New)->count(),
                'color' => 'bg-blue-500',
            ],
            [
                'status' => 'in_progress',
                'label' => 'Diproses',
                'count' => Report::status(ReportStatus::InProgress)->count(),
                'color' => 'bg-amber-500',
            ],
            [
                'status' => 'resolved',
                'label' => 'Selesai',
                'count' => Report::status(ReportStatus::Resolved)->count(),
                'color' => 'bg-emerald-500',
            ],
            [
                'status' => 'rejected',
                'label' => 'Ditolak',
                'count' => Report::status(ReportStatus::Rejected)->count(),
                'color' => 'bg-red-500',
            ],
        ];

        return Inertia::render('dashboard', [
            'totalStudents' => $totalStudents,
            'totalTeachers' => $totalTeachers,
            'todayAgendas' => $todayAgendas,
            'recentAnnouncements' => $recentAnnouncements,
            'recentAchievements' => $recentAchievements,
            'totalReports' => $totalReports,
            'reportSummary' => $reportSummary,
        ]);
    }
}
