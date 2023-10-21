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
        // $user = Auth::guard("teacher")->user()->id;
        // $videos = Video::where("teacher_id" , $user)->with("teacher")->get();
        // return Inertia::render("Videos" , ["videos"=>$videos]);
        // return Inertia::render("units/Teacherunitvideos" , ["videos"=>$videos] );
        return "mina";
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $video = Video::where("id" , $id)->get();
        return Inertia::render("videos/Videos" , ["video"=>$video]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $video = Video::where("id" , $id)->get();
        return Inertia::render("videos/Editvideo" , ["editvideo"=>$video]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = Auth::guard("teacher")->user()->id;
        $validate = $request->validate([
            "title_video" => "required",
            "Description_video" => "required" ,
            "privacy_video" => "required" ,
            "exam_video" => "required" ,
            "price_video" => "required"
        ]);
        Video::where("id" , $request["id"])->where("teacher_id" , $user)->update([
            "title_video" => $validate["title_video"] ,
            "description_video" => $validate["Description_video"] ,
            "privacy_video" => $validate["privacy_video"] ,
            "exam_video" => $validate["exam_video"] ,
            "price_video" => $validate["price_video"]["number"]
        ]);
        $video = Video::where("id" ,$request["id"])->get();
        return Inertia::render("videos/Videos" , ["video"=>$video]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = Auth::guard("teacher")->user()->id;
        $video = video::find($request["id"]);
        $url_path = explode("/", $video->path_video);

        if (!empty($video->path_video) && Storage::disk('s3')->exists("public/upload/medialibrary/" . $user . "/" . end($url_path) )) {
            Storage::disk("s3")->delete("public/upload/medialibrary/" . $user . "/" . end($url_path) );
            video::destroy($video->id);
        }

    }
}
