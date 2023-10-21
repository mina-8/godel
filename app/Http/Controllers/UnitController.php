<?php

namespace App\Http\Controllers;

use App\Models\Phase;
use App\Models\Unit;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $user = Auth::guard("teacher")->user()->id;
        // $units = Phase::where("teacher_id" , $user)->with("teacher")->get();
        // return Inertia::render("Units" , ["units"=>$units]);
        return "mina";
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $id)
    {

        return Inertia::render("videos/Creatvideos" , ["unitid"=>$id]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request  )
    {
        // return $request[0]["price_video"]["number"] ;

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = Auth::guard('teacher')->user()->id;
        // $phases = Phase::where("id" , $id)->get("phase");
        $videos = Video::where("unit_id" , $id)->where("teacher_id" , $user)->get();
        // $videos = Video::where("teacher_id" , $user)->with("teacher")->get();
        return Inertia::render("units/Teacherunitvideos" , ["unitid"=>$id , "videos"=>$videos] );

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Unit $unit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Unit $unit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        //
    }
}
