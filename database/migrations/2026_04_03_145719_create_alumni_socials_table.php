<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alumni_socials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumni_id')->constrained('alumni')->cascadeOnDelete();
            $table->string('platform', 50);
            $table->string('url', 500);
            $table->timestamps();

            $table->index('alumni_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alumni_socials');
    }
};
