<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admission_period_id')->constrained('admission_periods')->cascadeOnDelete();
            $table->string('registration_number', 20)->unique();
            $table->string('status', 20)->default('pending');

            // Data Pribadi
            $table->string('full_name');
            $table->string('nik', 16);
            $table->string('nisn', 10)->nullable();
            $table->string('birth_place', 100);
            $table->date('birth_date');
            $table->string('gender', 1);
            $table->string('religion', 20);
            $table->string('citizenship', 50)->default('WNI');
            $table->text('address_street');
            $table->string('address_rt', 3)->nullable();
            $table->string('address_rw', 3)->nullable();
            $table->string('address_village', 100);
            $table->string('address_district', 100);
            $table->string('address_city', 100);
            $table->string('address_province', 100);
            $table->string('address_postal_code', 5)->nullable();
            $table->string('living_arrangement', 50)->nullable();
            $table->string('transportation', 50)->nullable();
            $table->string('phone', 15)->nullable();
            $table->string('email')->nullable();
            $table->tinyInteger('birth_order')->nullable()->unsigned();
            $table->tinyInteger('sibling_count')->nullable()->unsigned();
            $table->string('special_needs')->nullable();
            $table->smallInteger('height')->nullable()->unsigned();
            $table->smallInteger('weight')->nullable()->unsigned();

            // Data Ayah
            $table->string('father_name');
            $table->string('father_nik', 16)->nullable();
            $table->smallInteger('father_birth_year')->nullable()->unsigned();
            $table->string('father_education', 20)->nullable();
            $table->string('father_occupation', 100)->nullable();
            $table->string('father_income', 50)->nullable();

            // Data Ibu
            $table->string('mother_name');
            $table->string('mother_nik', 16)->nullable();
            $table->smallInteger('mother_birth_year')->nullable()->unsigned();
            $table->string('mother_education', 20)->nullable();
            $table->string('mother_occupation', 100)->nullable();
            $table->string('mother_income', 50)->nullable();

            // Data Wali
            $table->string('guardian_name')->nullable();
            $table->string('guardian_nik', 16)->nullable();
            $table->smallInteger('guardian_birth_year')->nullable()->unsigned();
            $table->string('guardian_education', 20)->nullable();
            $table->string('guardian_occupation', 100)->nullable();
            $table->string('guardian_income', 50)->nullable();

            // Data Asal Sekolah
            $table->string('previous_school_name')->nullable();
            $table->string('previous_school_npsn', 8)->nullable();
            $table->smallInteger('graduation_year')->nullable()->unsigned();

            $table->timestamps();

            $table->index('admission_period_id', 'idx_registrations_period');
            $table->index('registration_number', 'idx_registrations_number');
            $table->unique(['admission_period_id', 'nik'], 'idx_registrations_period_nik');
            $table->index('status', 'idx_registrations_status');
            $table->index('full_name', 'idx_registrations_full_name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
