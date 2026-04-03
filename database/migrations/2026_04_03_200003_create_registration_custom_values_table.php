<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registration_custom_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained('registrations')->cascadeOnDelete();
            $table->foreignId('custom_field_id')->nullable()->constrained('custom_fields')->nullOnDelete();
            $table->string('field_label');
            $table->string('field_type', 20);
            $table->text('value')->nullable();
            $table->timestamps();

            $table->index('registration_id', 'idx_rcv_registration');
            $table->index('custom_field_id', 'idx_rcv_field');
            $table->unique(['registration_id', 'custom_field_id'], 'idx_rcv_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registration_custom_values');
    }
};
