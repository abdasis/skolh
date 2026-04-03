<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admission_period_id')->constrained('admission_periods')->cascadeOnDelete();
            $table->string('label');
            $table->string('type', 20);
            $table->string('placeholder')->nullable();
            $table->boolean('is_required')->default(false);
            $table->integer('sort_order')->default(0);
            $table->json('options')->nullable();
            $table->timestamps();

            $table->index(['admission_period_id', 'sort_order'], 'idx_custom_fields_period_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_fields');
    }
};
