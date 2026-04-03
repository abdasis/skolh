<?php

namespace Database\Factories;

use App\Models\OrganizationNode;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OrganizationNode>
 */
class OrganizationNodeFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'parent_id' => null,
            'teacher_id' => null,
            'position' => $this->faker->randomElement(['Principal', 'Vice Principal', 'Department Head', 'Teacher']),
            'name' => $this->faker->name(),
            'sort_order' => 0,
        ];
    }
}
