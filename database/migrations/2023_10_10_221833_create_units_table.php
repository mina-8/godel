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
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->foreignId("phase_id")->constrained("phases")->references("id")->onUpdate("cascade")->onDelete("cascade");
            $table->foreignId("teacher_id")->constrained("teachers")->references("id")->onUpdate("cascade")->onDelete("cascade");
            $table->string("title");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
