<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\VideoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware("guest")->name("/");



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');

})->middleware(['auth', 'verified'])->name('dashboard');
// Route::get('/dashboard',[ProfileController::class , "home"])->middleware(['auth', 'verified'])->name('dashboard');


Route::get("teacher/dashboard" , function(){
    return Inertia::render('Dashboardteacher');
}
)->middleware(["auth:teacher" , "verified"])->name("teacher.dashboard");



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get("/myteacher" , function(){
        return Inertia::render("teacher");
    })->name("myteacher");
});

Route::middleware("auth:teacher")->prefix("teacher")->name("teacher.")->group(function(){
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});


Route::middleware(["auth:teacher" , "verified"])->prefix("teacher/dashboard")->group(function(){
    Route::get("" , [TeacherController::class , "index"])->name("teacher.dashboard");
    Route::get("show" , [PostController::class , "show"])->name("show.post");
    Route::post("post/{id}" , [PostController::class , "destroy"])->name("delete.post");
    Route::post("post" , [PostController::class , "store"])->name("store.post");

    //videos
    Route::get("video" , [VideoController::class , "index"])->name("teacher.video");
    Route::post("video" , [VideoController::class , "store"])->name("store.video");
    Route::post("video/{id}" , [VideoController::class , "destroy"])->name("delete.video");

    //Media library routes
Route::get('/medialibrary', [App\Http\Controllers\MediaLibraryController::class, 'mediaLibrary'])->name('media-library');

//FILE UPLOADS CONTROLER
Route::post('medialibrary/upload', [App\Http\Controllers\UploaderController::class, 'upload'])->name('file-upload');
Route::post('medialibrary/delete', [App\Http\Controllers\UploaderController::class, 'delete'])->name('file-delete');


});



require __DIR__.'/auth.php';
require __DIR__.'/auth_teacher.php';
