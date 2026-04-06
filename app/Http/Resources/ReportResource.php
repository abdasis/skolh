<?php

namespace App\Http\Resources;

use App\Models\Report;
use App\Models\ReportStatusHistory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Report */
class ReportResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference_code' => $this->reference_code,
            'category' => $this->category->value,
            'category_label' => $this->category->label(),
            'subject' => $this->subject,
            'message' => $this->message,
            'reporter_name' => $this->reporter_name,
            'reporter_contact' => $this->reporter_contact,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'status_histories' => $this->whenLoaded('statusHistories', fn () => $this->statusHistories->map(fn (ReportStatusHistory $history) => [
                'id' => $history->id,
                'status' => $history->status->value,
                'status_label' => $history->status->label(),
                'note' => $history->note,
                'changed_by_name' => $history->changedBy?->name ?? '',
                'created_at' => $history->created_at->toDateTimeString(),
            ])),
        ];
    }
}
