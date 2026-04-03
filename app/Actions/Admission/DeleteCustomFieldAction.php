<?php

declare(strict_types=1);

namespace App\Actions\Admission;

use App\Models\CustomField;

final class DeleteCustomFieldAction
{
    public function handle(CustomField $customField): void
    {
        $customField->delete();
    }
}
