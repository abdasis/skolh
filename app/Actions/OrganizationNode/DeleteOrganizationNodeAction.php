<?php

declare(strict_types=1);

namespace App\Actions\OrganizationNode;

use App\Models\OrganizationNode;

final class DeleteOrganizationNodeAction
{
    public function handle(OrganizationNode $node): void
    {
        $node->delete();
    }
}
