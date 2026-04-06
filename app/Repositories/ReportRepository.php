<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Enums\ReportCategory;
use App\Enums\ReportStatus;
use App\Models\Report;
use App\Repositories\Contracts\ReportRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class ReportRepository implements ReportRepositoryInterface
{
    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<Report>
     */
    public function getPaginated(array $filters): LengthAwarePaginator
    {
        $query = Report::query()->with(['statusHistories.changedBy'])->latest();

        if (! empty($filters['status'])) {
            $status = ReportStatus::tryFrom($filters['status']);
            if ($status !== null) {
                $query->status($status);
            }
        }

        if (! empty($filters['category'])) {
            $category = ReportCategory::tryFrom($filters['category']);
            if ($category !== null) {
                $query->category($category);
            }
        }

        if (! empty($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (! empty($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        if (! empty($filters['search'])) {
            $query->where('subject', 'like', '%'.$filters['search'].'%');
        }

        return $query->paginate(20)->withQueryString();
    }

    public function findById(int $id): Report
    {
        return Report::with(['statusHistories.changedBy'])->findOrFail($id);
    }

    /**
     * @return array<string, mixed>
     */
    public function getStats(): array
    {
        $statusCounts = Report::query()
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status')
            ->toArray();

        $categoryCounts = Report::query()
            ->selectRaw('category, count(*) as total')
            ->groupBy('category')
            ->pluck('total', 'category')
            ->toArray();

        $byCategory = [];
        foreach (ReportCategory::cases() as $case) {
            $byCategory[$case->value] = $categoryCounts[$case->value] ?? 0;
        }

        return [
            'total' => array_sum($statusCounts),
            'new' => $statusCounts[ReportStatus::New->value] ?? 0,
            'in_progress' => $statusCounts[ReportStatus::InProgress->value] ?? 0,
            'resolved' => $statusCounts[ReportStatus::Resolved->value] ?? 0,
            'rejected' => $statusCounts[ReportStatus::Rejected->value] ?? 0,
            'by_category' => $byCategory,
        ];
    }
}
