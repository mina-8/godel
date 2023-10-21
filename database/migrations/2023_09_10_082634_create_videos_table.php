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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId("unit_id")->constrained("units")->references("id")->onUpdate("cascade")->onDelete("cascade");
            $table->foreignId("teacher_id")->constrained("teachers")->references("id")->onUpdate("cascade")->onDelete("cascade");
            $table->string("title_video");
            $table->string("description_video");
            $table->string("path_video");
            $table->string("cover_video");
            $table->enum("privacy_video" , ["public" , "one" ,"tow"]);
            $table->string("exam_video")->nullable();
            $table->bigInteger("price_video");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
