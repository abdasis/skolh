<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class CustomFieldResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'admission_period_id' => $this->admission_period_id,
            'label' => $this->label,
            'type' => $this->type->value,
            'placeholder' => $this->placeholder,
            'is_required' => $this->is_required,
            'sort_order' => $this->sort_order,
            'options' => $this->options,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
