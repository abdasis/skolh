<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admission_periods', function (Blueprint $table) {
            $table->id();
            $table->string('academic_year', 20);
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('is_active')->default(true);
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index('is_active', 'idx_admission_periods_is_active');
            $table->index(['start_date', 'end_date'], 'idx_admission_periods_dates');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admission_periods');
    }
};
