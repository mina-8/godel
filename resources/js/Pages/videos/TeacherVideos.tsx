import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';

import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import Resumable from 'resumablejs';
import "../../../css/dropzone.css"
import axios from 'axios';
import { Button } from 'antd';
import Dropzone from 'react-dropzone'
// import Dropzone from 'react-dropzone-uploader'
import ChunkUpload from 'react-native-chunk-upload';


function TeacherVideos() {
    // const {data ,  setData , post  , processing} = useForm({
    //     file : null
    // })
    // const submit : FormEventHandler  = (e)=>{
    //     e.preventDefault();
    //     const filedata = data.file
    //     // chunk size file contorol
    //     const chunkSize = 1024 * 1024 ; // 1MB
    //     const totalChunks = Math.ceil(filedata.size / chunkSize);
    //     const chunkPromises = [];

    //     // handel chunk file
    //     for(let i = 0 ; i < totalChunks ; i++){
    //         const start = i * chunkSize;
    //         const end = Math.min(start + chunkSize , filedata.size);
    //         const chunk = filedata.slice(start , end);

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
    const handelUpload = async(file : File)=>{
        const chunkSize = 1024 * 1024 ; // 1MB
        const totalChunks = Math.ceil(file.size / chunkSize);
        const chunkPromises = [];

        // handel chunk file
        for(let i = 0 ; i < totalChunks; i++){
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize , file.size);
            const chunk = file.slice(start , end);
            const data = {file , chunk}
            const formdata = new FormData();
            // formdata.append("file" , chunk);
            formdata.append('chunk' , chunk)
            console.log(data);
            const promise = router.post(route("file-upload") ,formdata);


            chunkPromises.push(promise);
        }

        await Promise.all(chunkPromises);
    }
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

    onDrop={(acceptedFiles)=> handelUpload(acceptedFiles[0])}
    >
        {({getRootProps , getInputProps}) =>(
            <div {...getRootProps()} >
                <input {...getInputProps} />
                <p className='dropzone'>Drag and Drop a file here OR <br></br> click to select a file</p>
            </div>
        )}
    </Dropzone>



</>
  )
}

export default TeacherVideos