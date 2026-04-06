<?php

namespace App\Actions\Report;

use App\Models\Report;

class CreateReportAction
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data): Report
    {
        return Report::create($data);
    }
}
