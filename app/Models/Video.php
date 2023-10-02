<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Video extends Model
{
    use HasFactory;
    protected $fillable = [
        "video",
        "teacher_id"
    ];
    public function teacher(){
        return $this->belongsTo(Teacher::class , "teacher_id");
       }
       public function getVideoAttribute($value){
        // return $this->$value = Storage::url($value);
        return $value;
       }
}
