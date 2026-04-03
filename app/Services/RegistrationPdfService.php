<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Registration;
use Barryvdh\Snappy\Facades\SnappyPdf;
use Illuminate\Http\Response;

final class RegistrationPdfService
{
    /**
     * Hasilkan PDF bukti pendaftaran dalam format DAPODIK.
     */
    public function generateReceipt(Registration $registration): Response
    {
        $registration->load(['admissionPeriod', 'customValues']);

        $pdf = SnappyPdf::loadView('pdf.registration-receipt', [
            'registration' => $registration,
        ]);

        $pdf->setOption('page-size', 'A4');
        $pdf->setOption('margin-top', '15mm');
        $pdf->setOption('margin-bottom', '15mm');
        $pdf->setOption('margin-left', '15mm');
        $pdf->setOption('margin-right', '15mm');
        $pdf->setOption('encoding', 'UTF-8');

        $filename = "bukti-pendaftaran-{$registration->registration_number}.pdf";

        return $pdf->download($filename);
    }
}
