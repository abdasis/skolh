<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\CustomField;
use Illuminate\Database\Eloquent\Collection;

interface CustomFieldRepositoryInterface
{
    /** @return Collection<int, CustomField> */
    public function getByPeriod(int $periodId): Collection;
}
