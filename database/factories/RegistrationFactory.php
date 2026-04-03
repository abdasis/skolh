<?php

namespace Database\Factories;

use App\Enums\RegistrationStatus;
use App\Models\AdmissionPeriod;
use App\Models\Registration;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Registration>
 */
class RegistrationFactory extends Factory
{
    public function definition(): array
    {
        static $sequence = 0;
        $sequence++;

        $period = AdmissionPeriod::factory()->create();
        $year = substr($period->academic_year, 0, 4);
        $regNumber = 'SPMB-' . $year . '-' . str_pad((string) $sequence, 4, '0', STR_PAD_LEFT);

        return [
            'admission_period_id' => $period->id,
            'registration_number' => $regNumber,
            'status' => RegistrationStatus::Pending,
            'full_name' => fake()->name(),
            'nik' => fake()->unique()->numerify('################'),
            'nisn' => fake()->optional()->numerify('##########'),
            'birth_place' => fake()->city(),
            'birth_date' => fake()->dateTimeBetween('-18 years', '-10 years')->format('Y-m-d'),
            'gender' => fake()->randomElement(['L', 'P']),
            'religion' => fake()->randomElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Khonghucu']),
            'citizenship' => 'WNI',
            'address_street' => fake()->streetAddress(),
            'address_rt' => fake()->optional()->numerify('###'),
            'address_rw' => fake()->optional()->numerify('###'),
            'address_village' => fake()->word(),
            'address_district' => fake()->word(),
            'address_city' => fake()->city(),
            'address_province' => fake()->state(),
            'address_postal_code' => fake()->optional()->numerify('#####'),
            'father_name' => fake()->name('male'),
            'father_nik' => null,
            'father_education' => fake()->optional()->randomElement(['SD', 'SMP', 'SMA', 'S1', 'S2']),
            'father_occupation' => fake()->optional()->jobTitle(),
            'father_income' => fake()->optional()->randomElement(['< Rp 1.000.000', 'Rp 1.000.000 - Rp 3.000.000', '> Rp 3.000.000']),
            'mother_name' => fake()->name('female'),
            'mother_nik' => null,
            'mother_education' => fake()->optional()->randomElement(['SD', 'SMP', 'SMA', 'S1', 'S2']),
            'mother_occupation' => fake()->optional()->jobTitle(),
            'mother_income' => fake()->optional()->randomElement(['< Rp 1.000.000', 'Rp 1.000.000 - Rp 3.000.000', '> Rp 3.000.000']),
        ];
    }
}
