<?php

declare(strict_types=1);

namespace App\Actions\Alumni;

use App\Models\Alumni;

final class DeleteAlumniAction
{
    public function handle(Alumni $alumni): void
    {
        $alumni->clearMediaCollection('avatar');
        $alumni->delete();
    }
}
