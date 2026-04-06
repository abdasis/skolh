<?php

namespace App\Actions\Report;

use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\User;

class UpdateReportStatusAction
{
    public function handle(Report $report, ReportStatus $status, ?string $note, User $user): void
    {
        $report->update(['status' => $status]);

        $report->statusHistories()->create([
            'status' => $status,
            'note' => $note,
            'changed_by' => $user->id,
        ]);
    }
}
