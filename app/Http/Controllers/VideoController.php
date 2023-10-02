<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::guard("teacher")->user()->id;
        $videos = Video::where("teacher_id" , $user)->with("teacher")->get();
        return Inertia::render("Videos" , ["videos"=>$videos]);
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
        return request();

        // $validate = $request->validate([
        //     "file" => "required|file"
        // ]);

        // $data = request()->file($request["name"])->store("video/" . Auth::guard('teacher')->user()->id);
        // // //$content = request()->file("file");
        // // //$data = Storage::disk('s3')->put("video/" . Auth::guard('teacher')->user()->id , $content);
        // $url = Storage::url($data);
        // Video::create([
        //     "video" => $url,
        //     "teacher_id" => Auth::guard('teacher')->user()->id
        // ]);
        // return Redirect::route("teacher.video");
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        // $user = Auth::guard("teacher")->user()->id;
        // $videos = Video::where("teacher_id" , $user)->with("teacher")->get();

        // // return Inertia::render("Dashboardteacher" , ["posts"=>$posts ]);
        // return Inertia::render("ShowVideo" , ["videos"=>$videos]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {

        $video = video::find($request["id"]);
        // $baseStorageUrl = Storage::url("/");
        // $path = str_replace($baseStorageUrl , "" , $video->video);
        // if(!empty($video->video) && Storage::exists($path)){
        //     Storage::delete($path);

        // }
        Storage::delete($video->video);
        video::destroy($video->id);

    }
}
