<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Video extends Model
{
    use HasFactory;
    protected $fillable = [
        "unit_id",
        "teacher_id",
        "title_video",
        "description_video",
        "path_video",
        "cover_video",
        "privacy_video",
        "exam_video",
        "price_video"
    ];
    public function unit(){
        return $this->belongsTo(Unit::class , "unit_id");
    }

    public function teacher(){
        return $this->belongsTo(Teacher::class , "teacher_id");
    }

}
