<<<<<<< HEAD
import { Col, Row } from "antd";
import { ReactNode , useEffect } from "react";
import  "../../../css/teachervideo.css"

function TeacherVideos({video}:any) {
    useEffect(()=>{
        console.log
        (video)
    })

    return (
        <>
        <Row >
            {video.map((showvideo: {
                exam_video: ReactNode;
                privacy_video: ReactNode;
                description_video: ReactNode;
                title_video: ReactNode;
                path_video: string | undefined; id: any | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.Key | null | undefined; video: string | undefined;
                cover_video : string;
                price_video : number
})=>
=======
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";

import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import Resumable from "resumablejs";
import "../../../css/dropzone.css";
import axios from "axios";
import { Button } from "antd";
import Dropzone from "react-dropzone";
// import Dropzone from 'react-dropzone-uploader'
import ChunkUpload from "react-native-chunk-upload";
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54

            <Col span={24} key={showvideo.id}>
                <video className="teacher_video" src={showvideo.path_video} controls />
                <div className="container">
                    <div dir="auto"><span dir="auto">title </span>: {showvideo.title_video}</div>
                    <div dir="auto"><span dir="auto">description </span>: {showvideo.description_video}</div>
                    <div dir="auto"><span dir="auto">price </span>: {showvideo.price_video}</div>
                    <div dir="auto"><span dir="auto">privacy </span>: {showvideo.privacy_video}</div>
                    <div dir="auto"><span dir="auto">exam</span> : {showvideo.exam_video}</div>
                </div>
            </Col>

            )}

<<<<<<< HEAD
        </Row>
=======
    //         const formdata = new FormData();
    //         formdata.append("file" , chunk.size);
    //         formdata.append("name" , filedata.name)
    //         const promise = router.post(route("file-upload") ,formdata);
    //         chunkPromises.push(promise);

    //     }
    //     Promise.all(chunkPromises)

    //     // formdata to send file
    //     // const formdata = new FormData();
    //     // formdata.append("name" ,filedata);
    //     // router.post(route("store.video") , formdata)

    // }
    /******************************************** */
    // handel upload files with dropzone
    const handelUpload = async (file: File) => {
        const chunkSize = 1024 * 1024; // 1MB
        const totalChunks = Math.ceil(file.size / chunkSize);
        const chunkPromises = [];

        // handel chunk file
        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);
            const data = { file, chunk };
            const formdata = new FormData();
            // formdata.append("file" , chunk);
            formdata.append("chunk", chunk);
            console.log(data);
            const promise = router.post(route("file-upload"), formdata);

            chunkPromises.push(promise);
        }

        await Promise.all(chunkPromises);
    };
    /********************************************* */

    return (
        <>
            {/*<form onSubmit={submit} >
        <div>
            <TextInput
                id="file"
                type="file"
                name="file"
                className="mt-1"
                isFocused={true}
                onChange={(e)=>setData("file" ,  e.target.files[0])}
            />
            <PrimaryButton className="ml-14" disabled={processing}>
                upload video
            </PrimaryButton>


        </div>

  </form>*/}

            <Dropzone
                onDrop={(acceptedFiles) => handelUpload(acceptedFiles[0])}
            >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps} />
                        <p className="dropzone">
                            Drag and Drop a file here OR <br></br> click to
                            select a file
                        </p>
                    </div>
                )}
            </Dropzone>
>>>>>>> e17276eaeeadfad99fd0f13f5914e94533997c54
        </>
    );
}

export default TeacherVideos;
