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
        Schema::create('phases', function (Blueprint $table) {
            $table->id();
            $table->foreignId("teacher_id")->constrained("teachers")->references("id")->onUpdate("cascade")->onDelete("cascade");
            $table->enum("phase" , ["T_1" , "T_2" , "T_3" , "C_1" , "C_2" , "C_3" , "C_4" , "any"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phases');
    }
};
