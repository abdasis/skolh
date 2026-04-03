<?php

declare(strict_types=1);

namespace App\Actions\Admission;

use App\Models\AdmissionPeriod;
use App\Models\CustomField;

final class CreateCustomFieldAction
{
    /**
     * @param array<string, mixed> $data
     */
    public function handle(AdmissionPeriod $period, array $data): CustomField
    {
        // Hitung sort_order otomatis jika tidak disediakan
        $sortOrder = $data['sort_order'] ?? ($period->customFields()->max('sort_order') + 1);

        return $period->customFields()->create([
            'label' => $data['label'],
            'type' => $data['type'],
            'placeholder' => $data['placeholder'] ?? null,
            'is_required' => $data['is_required'] ?? false,
            'sort_order' => $sortOrder,
            'options' => $data['options'] ?? null,
        ]);
    }
}
