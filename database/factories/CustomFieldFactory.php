<?php

namespace Database\Factories;

use App\Enums\CustomFieldType;
use App\Models\AdmissionPeriod;
use App\Models\CustomField;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CustomField>
 */
class CustomFieldFactory extends Factory
{
    public function definition(): array
    {
        $type = fake()->randomElement(CustomFieldType::cases());

        return [
            'admission_period_id' => AdmissionPeriod::factory(),
            'label' => fake()->words(3, true),
            'type' => $type,
            'placeholder' => fake()->optional()->sentence(4),
            'is_required' => fake()->boolean(30),
            'sort_order' => fake()->numberBetween(0, 100),
            'options' => $type === CustomFieldType::Select
                ? fake()->randomElements(['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D'], 3)
                : null,
        ];
    }

    public function ofType(CustomFieldType $type): static
    {
        return $this->state([
            'type' => $type,
            'options' => $type === CustomFieldType::Select
                ? ['Reguler', 'Prestasi', 'Hafidz']
                : null,
        ]);
    }
}
