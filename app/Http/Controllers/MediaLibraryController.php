<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class MediaLibraryController extends Controller
{
 /**
  * Create a new controller instance.
  *
  * @return void
  */
 public function __construct()
 {
   $this->middleware(["auth:teacher" , "verified"]);
 }

 /**
  * Get Media Library page
  * @return View
  */
 public function mediaLibrary(Request $request){
   $user_obj = \Illuminate\Support\Facades\Auth::guard("teacher")->user()->id;;
   return view('medialibrary', ['user_obj' => $user_obj ]);
 }
}

