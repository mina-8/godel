<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Post;
class Teacher extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

  public function post(){
    return $this->hasone(Post::class);
  }
  public function posts(){
    return $this->hasMany(Post::class , "teacher_id" );
  }

  public function video(){
    return $this->hasOne(Video::class);
  }
}
