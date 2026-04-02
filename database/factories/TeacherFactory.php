<?php

namespace Database\Factories;

use App\Enums\Gender;
use App\Enums\TeacherStatus;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'nip' => fake()->unique()->numerify('####################'),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'subject' => fake()->randomElement(['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPA', 'IPS', 'PKN', 'Seni Budaya', 'Olahraga']),
            'gender' => fake()->randomElement(Gender::cases())->value,
            'date_of_birth' => fake()->dateTimeBetween('-60 years', '-25 years')->format('Y-m-d'),
            'joined_at' => fake()->dateTimeBetween('-20 years', 'now')->format('Y-m-d'),
            'status' => TeacherStatus::Active->value,
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => TeacherStatus::Active->value,
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => TeacherStatus::Inactive->value,
        ]);
    }
}
