<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\CustomField;
use App\Repositories\Contracts\CustomFieldRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

final class CustomFieldRepository implements CustomFieldRepositoryInterface
{
    /** @return Collection<int, CustomField> */
    public function getByPeriod(int $periodId): Collection
    {
        return CustomField::query()
            ->where('admission_period_id', $periodId)
            ->orderBy('sort_order')
            ->get();
    }
}
