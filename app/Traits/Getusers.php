<?php

namespace App\Traits;

use App\Models\Teacher;
use App\Models\User;

trait Getusers
{
    private function isTeacher()
    {
        return request()->is("teacher/*");
    }

    public function guarduser()
    {
        return $this->isTeacher() ? "teacher" : "web";
    }

    public function usersclass()
    {
        return $this->isTeacher() ? Teacher::class : User::class;
    }

    public function tableName(){
        return $this->isTeacher() ? "teachers" : "users";
    }
}
