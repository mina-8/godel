import axios from "axios";

const MB = 1024 * 1024;
const url = route("file-upload");
//break into 5 MB chunks fat minimum
const chunkSize = 2 * MB;
var videoId = "";
var playerUrl = "";
export async function chunkFileUploader(
    file: File,
<<<<<<< HEAD
    progress: (percent: number) => void,
    title : any = ""
=======
    progress: (percent: number) => void
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54
) {
    // //get the file name to name the file.  If we do not name the file, the upload will be called 'blob'
    const numberofChunks = Math.ceil(file.size / chunkSize);
    // // document.getElementById("video-information").innerHTML =
    // //     "There will be " + numberofChunks + " chunks uploaded.";
    let start = 0;
    for (let i = 0; i < numberofChunks; i++) {
<<<<<<< HEAD
        await createChunk(start, file , title);
=======
        await createChunk(start, file);
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54
        start += chunkSize;
        progress(Math.round((i / numberofChunks) * 100));
    }
}

<<<<<<< HEAD
async function createChunk(start: number, file: File , title="") {
=======
async function createChunk(start: number, file: File) {
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54
    const filename = file.name;
    const chunkEnd = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, chunkEnd);
    console.log(
        "i created a chunk of video " + start + "-" + chunkEnd + " minus 1	"
    );
<<<<<<< HEAD
    console.log(file.type)
    console.log(title)
    const chunkForm = new FormData();

    chunkForm.append("file", chunk, filename);
    chunkForm.append("title" ,title)
=======
    const chunkForm = new FormData();

    chunkForm.append("file", chunk, filename);
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54
    console.log(chunkForm.get("file"));

    const blobEnd = chunkEnd - 1;
    const contentRange = "bytes " + start + "-" + blobEnd + "/" + file.size;
    //created the chunk, now upload iit
    await uploadChunk(chunkForm, contentRange);
}
async function uploadChunk(chunkForm: FormData, contentRange: string) {
    await axios.post(url, chunkForm, {
        headers: {
            "Content-Range": contentRange,
        },
    });
}
// function updateProgress(oEvent) {
//     if (oEvent.lengthComputable) {
//         var percentComplete = Math.round((oEvent.loaded / oEvent.total) * 100);

//         var totalPercentComplete = Math.round(
//             ((chunkCounter - 1) / numberofChunks) * 100 +
//                 percentComplete / numberofChunks
//         );
//         document.getElementById("chunk-information").innerHTML =
//             "Chunk # " +
//             chunkCounter +
//             " is " +
//             percentComplete +
//             "% uploaded. Total uploaded: " +
//             totalPercentComplete +
//             "%";
//         //	console.log (percentComplete);
//         // ...
//     } else {
//         console.log("not computable");
//         // Unable to compute progress information since the total size is unknown
//     }
// }
