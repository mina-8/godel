import axios from "axios";

const MB = 1024 * 1024;
const url = route("file-upload");
//break into 5 MB chunks fat minimum
const chunkSize = 2 * MB;
var videoId = "";
var playerUrl = "";
export async function chunkFileUploader(
    file: File,
    progress: (percent: number) => void
) {
    // //get the file name to name the file.  If we do not name the file, the upload will be called 'blob'
    const numberofChunks = Math.ceil(file.size / chunkSize);
    // // document.getElementById("video-information").innerHTML =
    // //     "There will be " + numberofChunks + " chunks uploaded.";
    let start = 0;
    for (let i = 0; i < numberofChunks; i++) {
        await createChunk(start, file);
        start += chunkSize;
        progress(Math.round((i / numberofChunks) * 100));
    }
}

async function createChunk(start: number, file: File) {
    const filename = file.name;
    const chunkEnd = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, chunkEnd);
    console.log(
        "i created a chunk of video " + start + "-" + chunkEnd + " minus 1	"
    );
    const chunkForm = new FormData();

    chunkForm.append("file", chunk, filename);
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
