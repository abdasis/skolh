<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('curricula', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('code', 50);
            $table->smallInteger('year')->unsigned();
            $table->string('level', 100);
            $table->string('slug', 255)->unique();
            $table->text('description');
            $table->longText('content')->nullable();
            $table->string('icon', 100);
            $table->string('status')->default('draft')->index();
            $table->date('effective_date');
            $table->date('expired_date')->nullable();
            $table->string('document', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('curricula');
    }
};
