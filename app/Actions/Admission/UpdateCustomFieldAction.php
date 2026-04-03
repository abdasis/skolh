<?php

declare(strict_types=1);

namespace App\Actions\Admission;

use App\Models\CustomField;

final class UpdateCustomFieldAction
{
    /**
     * @param array<string, mixed> $data
     */
    public function handle(CustomField $customField, array $data): CustomField
    {
        $customField->update([
            'label' => $data['label'],
            'type' => $data['type'],
            'placeholder' => $data['placeholder'] ?? null,
            'is_required' => $data['is_required'] ?? false,
            'sort_order' => $data['sort_order'] ?? $customField->sort_order,
            'options' => $data['options'] ?? null,
        ]);

        return $customField->refresh();
    }
}
