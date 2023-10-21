<?php

namespace App\Http\Controllers;

use App\Models\Phase;
use App\Models\Unit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PhaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::guard("teacher")->user()->id;
        $phases = Phase::where("teacher_id" , $user)->with("teacher")->get();
        return Inertia::render("Phases" , ["phases"=>$phases]);

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
        $user = Auth::guard('teacher')->user()->id;
        $validate = $request->validate([
                "unit_title" =>"required",
                "phase" => "required",
        ]);


        if(Phase::where("teacher_id" , $user)->where("phase" , $validate["phase"])->with("id")->exists()){
            $phase = Phase::where("teacher_id" , $user)->where("phase" , $validate["phase"])->value("id");
            Unit::create([
                "phase_id" => $phase,
                "teacher_id" => $user,
                "title" => $validate["unit_title"]
            ]);
        }else{
            Phase::create([
                "teacher_id" => $user,
                "phase" => $validate["phase"]
            ]);
            $phase = Phase::where("teacher_id" , $user)->where("phase" , $validate["phase"])->value("id");
            Unit::create([
                "phase_id" => $phase,
                "teacher_id" => $user,
                "title" => $validate["unit_title"]
            ]);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = Auth::guard('teacher')->user()->id;
        $phases = Phase::where("id" , $id)->get("phase");
        $units = Unit::where("phase_id" , $id)->where("teacher_id" , $user)->get();
        return Inertia::render("phases/Teacherunitphase" , ["phase"=>$phases , "units"=>$units]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
