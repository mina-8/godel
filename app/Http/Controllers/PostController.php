<?php

namespace App\Http\Controllers;


use App\Models\Phase;
use App\Models\Post;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render("Dashboardteacher");


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // $data = request()->file("file")->store(Auth::guard('teacher')->user()->id);

        // Post::create([
        //     "content" => $validate["post"],
        //     "photo" => "null",
        //     "teacher_id" => Auth::guard('teacher')->user()->id
        // ]);
        // return Redirect::route("teacher.dashboard");

    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
    //    $posts = Auth::user("teachers")->posts;
    //    return Inertia::render("posts/showpost" , ["posts"=>$posts]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $post = Post::find($request["id"]);
        $baseStorageUrl = Storage::url("/");
        $path = str_replace($baseStorageUrl , "" , $post->photo);
        if(!empty($post->photo) && Storage::exists($path)){
            Storage::delete($path);
        }
        Post::destroy($post->id);


    }
}
