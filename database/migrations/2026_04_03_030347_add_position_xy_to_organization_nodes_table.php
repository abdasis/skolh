<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('organization_nodes', function (Blueprint $table) {
            $table->float('position_x')->nullable()->after('connector_from');
            $table->float('position_y')->nullable()->after('position_x');
        });
    }

    public function down(): void
    {
        Schema::table('organization_nodes', function (Blueprint $table) {
            $table->dropColumn(['position_x', 'position_y']);
        });
    }
};
