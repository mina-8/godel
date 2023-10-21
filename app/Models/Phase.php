<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    use HasFactory;
    protected $fillable = [
        "teacher_id",
        "phase"
    ];
    public function teacher(){
        return $this->belongsTo(Teacher::class , "teacher_id");
    }
    public function unit(){
        return $this->hasOne(Unit::class);
    }
      public function units(){
        return $this->hasMany(Unit::class);
    }
}
