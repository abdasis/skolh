<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('organization_nodes', function (Blueprint $table) {
            $table->string('branch_side', 10)->default('center')->after('sort_order');
        });
    }

    public function down(): void
    {
        Schema::table('organization_nodes', function (Blueprint $table) {
            $table->dropColumn('branch_side');
        });
    }
};
