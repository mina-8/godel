<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;
use Illuminate\Support\Facades\Storage;


class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        "content",
        "photo",
        "teacher_id"
    ];

   public function teacher(){
    return $this->belongsTo(Teacher::class , "teacher_id");
   }


   public function getCreatedAtAttribute($value){
    return $this->$value = date_format(date_create($value) , "Y-m-d H:i:s");
   }


}
