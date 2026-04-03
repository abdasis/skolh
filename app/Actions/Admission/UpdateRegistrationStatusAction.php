<?php

declare(strict_types=1);

namespace App\Actions\Admission;

use App\Enums\RegistrationStatus;
use App\Models\Registration;

final class UpdateRegistrationStatusAction
{
    public function handle(Registration $registration, RegistrationStatus $status): Registration
    {
        $registration->update(['status' => $status]);

        return $registration->refresh();
    }
}
