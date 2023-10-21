<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;
    protected $fillable = [
        "phase_id",
        "teacher_id",
        "title"
    ];
    public function teacher(){
        return $this->belongsTo(Teacher::class , "teacher_id");
    }
    public function phase(){
        return $this->belongsTo(Phase::class , "teacher_id");
    }

    public function video(){
        return $this->hasOne(Video::class);
    }
    
    public function videos(){
    return $this->hasMany(Video::class);
    }
}
