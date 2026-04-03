<?php

declare(strict_types=1);

namespace App\Actions\Admission;

use App\Exports\RegistrationsExport;
use App\Models\AdmissionPeriod;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

final class ExportRegistrationsAction
{
    public function handle(AdmissionPeriod $period): BinaryFileResponse
    {
        $period->load('customFields');

        $filename = "pendaftaran-{$period->academic_year}.xlsx";
        $filename = str_replace('/', '-', $filename);

        return Excel::download(new RegistrationsExport($period), $filename);
    }
}
