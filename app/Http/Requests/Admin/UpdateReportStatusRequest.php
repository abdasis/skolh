<?php

namespace App\Http\Requests\Admin;

use App\Enums\ReportStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateReportStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['required', Rule::enum(ReportStatus::class)],
            'note' => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function withValidator(\Illuminate\Validation\Validator $validator): void
    {
        $validator->after(function (\Illuminate\Validation\Validator $validator): void {
            $report = $this->route('report');

            if ($report instanceof \App\Models\Report) {
                $currentStatus = $report->status;
                if ($currentStatus === ReportStatus::Resolved || $currentStatus === ReportStatus::Rejected) {
                    $validator->errors()->add('status', 'Cannot change status of a resolved or rejected report.');
                }
            }
        });
    }
}
