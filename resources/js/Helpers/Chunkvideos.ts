import axios from "axios";

const MB = 1024 * 1024;
const url = route("file-upload");

// breake into 5 MB chunks fat minimum
const chunkSize = 2 * MB;
var videoId = "";
var playerUrl = "";

export async function chunkFileUploader(
    file : File,
    progress : (percent : number) => void,
    unitid : any = "",
    titlevideo : any = "",
    descvideo : any = "",
    privacyvideo : any = "",
    examvideo : any = "",
    pricevideo : any = "",

){
    // get the file name to name the file . if we do not name the file , the upload will be called 'blob'
    const numberofChunks = Math.ceil(file.size / chunkSize);
    // document.getElementById("video-information").innerHTML =
    // "There will be " + numberofChunks + " chunks uploaded.";
    let start = 0;
    for(let i = 0 ; i < numberofChunks ; i++){
        await createChunk(start , file , unitid , titlevideo , descvideo  , privacyvideo , examvideo , pricevideo );
        start += chunkSize;
        progress(Math.round((i / numberofChunks) * 100));
    }
}

async function createChunk(start: number , file: File , unitid="" , titlevideo="" , descvideo="" ,  privacyvideo="" , examvideo="" , pricevideo=""){
    const filename = file.name;
    const chunkEnd = Math.min(start + chunkSize , file.size);
    const chunk = file.slice(start , chunkEnd);
    console.log(
        " i created a chunk of video " + start + "-" + chunkEnd + "minus 1 "
    );
    console.log(file.type)
    const chunkForm = new FormData();

    chunkForm.append("file" , chunk , filename);
    chunkForm.append("unit_id" , unitid);
    chunkForm.append("title_video" , titlevideo);
    chunkForm.append("description_video" , descvideo);
    chunkForm.append("privacy_video" , privacyvideo);
    chunkForm.append("exam_video" , examvideo);
    chunkForm.append("price_video" , pricevideo);
    console.log(chunkForm.get("file"));

    const blobEnd = chunkEnd - 1;
    const contentRange = "bytes " + start + "-" + blobEnd + "/" + file.size;
    // create the chunk , now upload it
    await uploadChunk(chunkForm , contentRange);
}

async function uploadChunk(chunkForm : FormData , contentRange : string) {
    await axios.post(url , chunkForm , {
        headers:{
            "Content-Range" : contentRange,
        },
    });
}