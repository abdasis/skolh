<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organization_nodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('organization_nodes')->nullOnDelete();
            $table->foreignId('teacher_id')->nullable()->constrained('teachers')->nullOnDelete();
            $table->string('position');
            $table->string('name')->nullable();
            $table->string('nip', 30)->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('branch_side', 10)->default('center');
            $table->string('connector_from', 10)->default('bottom');
            $table->float('position_x')->nullable();
            $table->float('position_y')->nullable();
            $table->timestamps();

            $table->index('parent_id');
            $table->index('teacher_id');
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organization_nodes');
    }
};
