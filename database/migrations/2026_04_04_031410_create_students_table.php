<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->nullable()->constrained('registrations')->nullOnDelete()->index();
            $table->string('nis', 20)->nullable()->unique();
            $table->string('nisn', 10)->nullable();
            $table->string('nik', 16)->nullable();
            $table->string('full_name', 100)->index();
            $table->string('gender', 1);
            $table->string('religion', 20)->nullable();
            $table->string('citizenship', 50)->nullable()->default('WNI');
            $table->string('birth_place', 100)->nullable();
            $table->date('birth_date')->nullable();
            $table->text('address')->nullable();
            $table->string('phone', 15)->nullable();
            $table->string('email', 150)->nullable();
            $table->string('special_needs', 100)->nullable();
            $table->smallInteger('enrollment_year')->unsigned();
            $table->string('status', 20)->default('active')->index();
            $table->text('notes')->nullable();
            $table->string('father_name', 100)->nullable();
            $table->string('father_occupation', 100)->nullable();
            $table->string('father_phone', 15)->nullable();
            $table->string('mother_name', 100)->nullable();
            $table->string('mother_occupation', 100)->nullable();
            $table->string('mother_phone', 15)->nullable();
            $table->string('guardian_name', 100)->nullable();
            $table->string('guardian_occupation', 100)->nullable();
            $table->string('guardian_phone', 15)->nullable();
            $table->timestamps();

            $table->index('enrollment_year');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
