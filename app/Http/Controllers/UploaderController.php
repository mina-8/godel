<?php

namespace App\Http\Controllers;


use App\Models\Video;
use Auth;
use Illuminate\Http\Request;
use Pion\Laravel\ChunkUpload\Exceptions\UploadFailedException;
use \Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;
use Pion\Laravel\ChunkUpload\Handler\AbstractHandler;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;

class UploaderController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(["auth:teacher", "verified"]);
    }

    /**
     * Handles the file upload
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws UploadMissingFileException
     * @throws UploadFailedException
     */
    public function upload(Request $request)
    {  //from web route
        // create the file receiver
<<<<<<< HEAD

=======
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54
        $receiver = new FileReceiver("file", $request, HandlerFactory::classFromRequest($request));

        // check if the upload is success, throw exception or return response you need
        if ($receiver->isUploaded() === false) {
            return $request;
            //  throw new UploadMissingFileException();
        }

        // receive the file
        $save = $receiver->receive();

        // check if the upload has finished (in chunk mode it will send smaller files)
        if ($save->isFinished()) {
            // save the file and return any response you need, current example uses `move` function. If you are
            // not using move, you need to manually delete the file by unlink($save->getFile()->getPathname())
            return $this->saveFile($save->getFile(), $request);
        }

        // we are in chunk mode, lets send the current progress
        /** @var AbstractHandler $handler */
        $handler = $save->handler();

        return response()->json([
            "done" => $handler->getPercentageDone(),
            'status' => true
        ]);
    }

    /**
     * Saves the file
     *
     * @param UploadedFile $file
     *
     * @return JsonResponse
     */
    protected function saveFile(UploadedFile $file, Request $request)
    {
        $user_obj = \Illuminate\Support\Facades\Auth::guard("teacher")->user()->id;
        $fileName = $this->createFilename($file);


        // Get file mime type
        $mime_original = $file->getMimeType();
        $mime = str_replace('/', '-', $mime_original);

        $folderDATE = $request->dataDATE;

        $folder  = $folderDATE;
        $filePath = "public/upload/medialibrary/{$user_obj}/";
        $finalPath = storage_path("app/" . $filePath);

        $fileSize = $file->getSize();
<<<<<<< HEAD

        // move the file name

        // $file->move($finalPath, $fileName);
        $data = Storage::disk('s3')->put("public/upload/medialibrary/" . $user_obj , $file);
        $url = Storage::url($data);
        // $file->store($filePath);

        $url_base = Storage::url('/upload/medialibrary/' . $user_obj . "/" . $fileName);
        $validate = $request->validate([
            "unit_id" => "required",
            "title_video" => "required",
            "description_video" => "required",
            "privacy_video" => "required",
            "exam_video" => "required",
            "price_video" => "required",

        ]);

        Video::create([
            "unit_id"=> $validate["unit_id"],
            "teacher_id" => $user_obj,
            "title_video" => $validate["title_video"],
            "description_video" => $validate["description_video"],
            "path_video" => $url,
            "cover_video" => Storage::url("public/video_logo.png"),
            "privacy_video" => $validate["privacy_video"],
            "exam_video" => $validate["exam_video"],
            "price_video" => $validate["price_video"]
        ]);
=======
        // move the file name
        $file->move($finalPath, $fileName);
        // $file->store($filePath);
        $url_base = 'storage/upload/medialibrary/' . $user_obj . "/" . $fileName;
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54

        return response()->json([
            'path' => $filePath,
            'name' => $fileName,
            'mime_type' => $mime
        ]);
<<<<<<< HEAD

=======
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54
    }

    /**
     * Create unique filename for uploaded file
     * @param UploadedFile $file
     * @return string
     */
    protected function createFilename(UploadedFile $file)
    {
        //here you can manipulate with file name e.g. HASHED
        return $file->getClientOriginalName();
    }

    /**
     * Delete uploaded file WEB ROUTE
     * @param Request request
     * @return JsonResponse
     */
    public function delete(Request $request)
    {

        $user_obj = \Illuminate\Support\Facades\Auth::guard("teacher")->user()->id;;

        $file = $request->filename;

        //delete timestamp from filename
        $temp_arr = explode('_', $file);
        if (isset($temp_arr[0])) unset($temp_arr[0]);
        $file = implode('_', $temp_arr);

        $dir = $request->date;

        $filePath = "public/upload/medialibrary/{$user_obj}/";
        $finalPath = storage_path("app/" . $filePath);

        if (unlink($finalPath . $file)) {
            return response()->json([
                'status' => 'ok'
            ], 200);
        } else {
            return response()->json([
                'status' => 'error'
            ], 403);
        }
    }
}
