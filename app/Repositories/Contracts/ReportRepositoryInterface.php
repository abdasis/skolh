<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Report;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ReportRepositoryInterface
{
    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<Report>
     */
    public function getPaginated(array $filters): LengthAwarePaginator;

    public function findById(int $id): Report;

    /**
     * @return array<string, mixed>
     */
    public function getStats(): array;
}
