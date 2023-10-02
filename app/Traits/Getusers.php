<?php
namespace App\Traits;

use App\Models\Teacher;
use App\Models\User;
trait Getusers{
    public function guarduser(){
        $request = request();
        // dd($request);
        if($request->is("teacher/*")){
            return "teacher";
        }else{
            return "web";
        }
    }
    public function usersclass(){
        $request = request();
        // dd($request);
        if($request->is("teacher/*")){
            return Teacher::class;
        }else{
            return User::class;
        }
    }
}
